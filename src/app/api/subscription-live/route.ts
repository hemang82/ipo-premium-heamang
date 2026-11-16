import { NextResponse } from "next/server";
import { getLiveSubscriptionList } from "@/lib/subscription-service";

export const revalidate = 10;

export async function GET() {
  try {
    const data = await getLiveSubscriptionList();
    return NextResponse.json(data, { headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59" } });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch live subscription status" },
      { status: 500 }
    );
  }
}
