import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    // 1. Basic validation to prevent malformed prompts
    if (!data.name || !data.experience?.length) {
      return NextResponse.json(
        { error: "Missing required resume fields" },
        { status: 400 },
      );
    }

    const prompt = `
You are a professional resume writer.
Rewrite the following resume data in a polished, professional tone.
Return ONLY valid JSON, no markdown, no explanation:

{
  "aiSummary": "rewritten 2-3 sentence professional summary",
  "aiExperience": [
    {
      "company": "same company name",
      "role": "same role",
      "duration": "same duration",
      "description": "rewritten bullet-style description"
    }
  ]
}

Input data:
Name: ${data.name}
Target Role: ${data.targetRole}
Summary: ${data.summary}
Experience: ${JSON.stringify(data.experience)}
Skills: ${data.skills ? data.skills.join(", ") : ""}
`;

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OpenRouter API key is missing from environment variables" },
        { status: 500 },
      );
    }

    // 2. Direct fetch to OpenRouter API to bypass SDK validation bugs
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter
          "X-Title": "Prompt Resume Builder", // Required by OpenRouter
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          messages: [{ role: "user", content: prompt }],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "OpenRouter API error");
    }

    const json = await response.json();
    let text = json.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("No content returned from AI");
    }

    // Log usage tokens if provided (non-streaming usage)
    if (json.usage) {
      console.log("Usage:", json.usage);
    }

    // 4. Clean up any markdown "thinking" or code blocks
    text = text.replace(/<think>[\s\S]*?<\/think>/g, ""); // Remove DeepSeek thinking tags
    text = text.replace(/```json|```/g, "").trim();

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", text);
      return NextResponse.json(
        {
          error: "AI response was not valid JSON",
          raw: text.substring(0, 100),
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Internal Route Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Server failed to process the request",
        details: error.toString(),
      },
      { status: 500 },
    );
  }
}
