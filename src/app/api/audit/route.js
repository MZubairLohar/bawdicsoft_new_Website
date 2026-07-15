import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, website } = await req.json();

    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        attributes: { "WEBSITE": website }
      }),
    });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 700,
        messages: [{ 
            role: "user", 
            content: `Provide a professional 3-point AI audit for: ${website}. 
            
            IMPORTANT: Return the report in plain text format only. 
            Do not use bold, italics, hashtags, or any Markdown formatting.
            Structure it clearly with these headings:
            1. AI Cost Cutting
            2. Revenue Growth
            3. Action Plan
            
            Focus on practical, actionable advice.` 
        }],
      }),
    });

    const data = await response.json();

    if (!data.content || !data.content[0]) {
      throw new Error("Claude ne valid data nahi bheja");
    }

    return NextResponse.json({ report: data.content[0].text });

  } catch (error) {
    console.error("Backend Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}