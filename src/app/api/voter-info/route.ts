import { getVoterInfoByAddress } from "@/lib/google-services";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  address: z.string().min(5).max(200)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please provide a valid address (5-200 characters)." },
        { status: 400 }
      );
    }

    const voterInfo = await getVoterInfoByAddress(parsed.data.address);
    return NextResponse.json(voterInfo);
  } catch {
    return NextResponse.json(
      {
        error: "Unable to fetch voter info right now. Please retry shortly."
      },
      { status: 500 }
    );
  }
}
