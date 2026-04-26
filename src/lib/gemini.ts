import { GoogleGenAI } from "@google/genai";

const model = "gemini-2.0-flash";

const createClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const askGeminiAboutElections = async (question: string) => {
  const client = createClient();

  if (!client) {
    return "Gemini is not configured yet. Set GEMINI_API_KEY in your environment to enable live AI guidance.";
  }

  const prompt = `You are an accessible civic education assistant. Explain election process questions in clear and concise language with bullet points and actionable steps. Question: ${question}`;

  const response = await client.models.generateContent({
    model,
    contents: prompt
  });

  return (
    response.text ||
    "I could not generate a response right now. Please try again in a moment."
  );
};
