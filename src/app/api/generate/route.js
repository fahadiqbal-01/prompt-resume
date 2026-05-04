import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    // 1. Validation
    if (!data.name || !data.experience?.length) {
      return NextResponse.json(
        { error: "Missing required resume fields" },
        { status: 400 },
      );
    }

    // 2. The Advanced Prompt
    const prompt = `
You are an expert Resume Strategist and ATS (Applicant Tracking System) Specialist.
Rewrite the provided resume data to be high-impact, professional, and optimized for hiring.

TASKS:
1. REWRITE: Use strong action verbs (Spearheaded, Optimized, Engineered). Fix all grammar and punctuation.
2. ATS OPTIMIZATION: Match keywords based on the Target Role: ${data.targetRole}.
3. ANALYSIS: Score the resume (0-100) and identify missing certifications or tools common in this industry.
4. LAYOUT: Based on content length, suggest if it should be a "minimal" or "modern" template.

Return ONLY valid JSON with this exact structure:
{
  "aiSummary": "rewritten impactful summary",
  "aiExperience": [
    {
      "company": "string",
      "role": "string",
      "duration": "string",
      "description": "Professional bullet points with quantified results"
    }
  ],
  "analysis": {
    "score": number,
    "feedback": "string (concise audit)",
    "suggestedSkills": ["skill1", "skill2"],
    "missingSections": ["section1"],
    "atsKeywords": ["keyword1", "keyword2"]
  },
  "layoutSuggestion": "minimal" | "modern"
}

Input data:
Name: ${data.name}
Role: ${data.targetRole}
Summary: ${data.summary}
Experience: ${JSON.stringify(data.experience)}
Skills: ${data.skills ? data.skills.join(", ") : ""}
`;

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Lazy Studio Resume Builder",
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

    if (!text) throw new Error("No content returned from AI");

    // 3. Clean and Parse
    text = text.replace(/<think>[\s\S]*?<\/think>/g, "");
    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Internal Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Server failed" },
      { status: 500 },
    );
  }
}
