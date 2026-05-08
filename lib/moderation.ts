function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

async function geminiCheck(question: string, answer: string): Promise<{ flagged: boolean; reason?: string } | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const callGemini = async () => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    "You moderate content for an interview Q&A platform. " +
                    "Flag content that contains: spam, self-promotion, violent threats, " +
                    "pornography, sexual content, hate speech, harassment, profanity, " +
                    "self-harm references, or anything inappropriate for a professional audience. " +
                    "Be thorough — err on the side of flagging.\n\n" +
                    'Reply with JSON: { "flagged": boolean, "reason": string | null }.' +
                    ' If flagged, give a short reason like "contains profanity" or "contains violent threats".',
                },
                {
                  text: `Question: ${question}\n\nAnswer: ${answer}`,
                },
              ],
            },
          ],
          generationConfig: { temperature: 0, responseMimeType: "application/json" },
        }),
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    const result = JSON.parse(text);
    return {
      flagged: result.flagged,
      reason: result.reason ?? undefined,
    };
  };

  for (let attempt = 0; attempt < 3; attempt++) {
    const result = await callGemini();
    if (result !== null) return result;
    if (attempt < 2) await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
  }

  return null;
}

export async function moderateContent(question: string, answer: string): Promise<{ flagged: boolean; reason?: string }> {
  const plainAnswer = stripHtml(answer);
  const combined = `${question} ${plainAnswer}`;

  if (combined.length < 10) {
    return { flagged: true, reason: "Content is too short" };
  }

  const aiResult = await geminiCheck(question, plainAnswer);
  if (aiResult) return aiResult;

  return { flagged: false };
}
