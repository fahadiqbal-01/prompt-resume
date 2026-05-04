import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    if (!data.name || !data.experience?.length) {
      return NextResponse.json(
        { error: "Missing required resume fields" },
        { status: 400 },
      );
    }

    const prompt = `
You are an expert Resume Strategist and ATS (Applicant Tracking System) Specialist.
Rewrite the provided resume data to be high-impact, professional, and optimized for hiring.

TASKS:
1. REWRITE: Use strong action verbs (Spearheaded, Optimized, Engineered). Fix all grammar and punctuation.
2. SKILLS POLISHING: Clean up and properly capitalize all skills (e.g., "html" to "HTML", "react" to "React", "css" to "CSS").
3. ATS OPTIMIZATION: Match keywords based on the Target Role: ${data.targetRole}.
4. ANALYSIS: Score the resume (0-100) and identify missing certifications or tools common in this industry.
5. LAYOUT: Based on content length, suggest if it should be a "minimal" or "modern" template.
6. CERTIFICATIONS: Clean up the titles of awards and certifications to be professionally formatted.

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
  "aiSkills": ["HTML", "CSS", "JavaScript"],
  "aiCertifications": ["Professionally formatted certification 1", "Award 2"],
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
Skills: ${data.skills ? data.skills.join(", ") : "None"}
Certifications: ${data.certifications ? data.certifications.join(", ") : "None"}
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
