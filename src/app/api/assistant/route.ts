import { askGeminiAboutElections } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  question: z.string().min(4).max(1000)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please provide a clear question (4-1000 characters)." },
        { status: 400 }
      );
    }

    const answer = await askGeminiAboutElections(parsed.data.question);
    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json(
      {
        error:
          "Unable to process the request. Please retry shortly or check Gemini configuration."
      },
      { status: 500 }
    );
  }
}
