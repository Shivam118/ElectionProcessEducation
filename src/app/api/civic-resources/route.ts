import { getCivicResourcesByQuery } from "@/lib/google-services";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  query: z.string().min(2).max(80)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Please provide a valid topic (2-80 characters)." }, { status: 400 });
    }

    const resources = await getCivicResourcesByQuery(parsed.data.query);
    return NextResponse.json({ resources });
  } catch {
    return NextResponse.json(
      { error: "Unable to load civic resources right now. Please retry shortly." },
      { status: 500 }
    );
  }
}
