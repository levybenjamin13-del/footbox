import { NextResponse } from "next/server";
import { getCompetitionMatches } from "@/lib/football-data";

type Props = { params: Promise<{ code: string }> };

export async function GET(req: Request, { params }: Props) {
  try {
    const { code } = await params;
    const { searchParams } = new URL(req.url);
    const season = searchParams.get("season") || undefined;
    const data = await getCompetitionMatches(code, season);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unable to fetch matches" }, { status: 500 });
  }
}
