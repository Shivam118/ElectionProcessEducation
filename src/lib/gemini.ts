const model = "gemini-2.0-flash";

export const askGeminiAboutElections = async (question: string) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return "Gemini is not configured yet. Set GEMINI_API_KEY in your environment to enable live AI guidance.";
  }

  const prompt = `You are an accessible civic education assistant. Explain election process questions in clear and concise language with bullet points and actionable steps. Question: ${question}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
      cache: "no-store"
    }
  );

  if (!response.ok) {
    return "I could not generate a response right now. Please try again in a moment.";
  }

  const payload = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  return (
    payload.candidates?.[0]?.content?.parts?.[0]?.text ??
    "I could not generate a response right now. Please try again in a moment."
  );
};
