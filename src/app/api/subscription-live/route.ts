import { NextResponse } from "next/server";
import { getLiveSubscriptionList } from "@/lib/subscription-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getLiveSubscriptionList();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch live subscription status" },
      { status: 500 }
    );
  }
}
