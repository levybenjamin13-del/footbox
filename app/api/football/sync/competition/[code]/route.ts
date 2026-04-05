import { NextResponse } from "next/server";
import { admin } from "@/lib/supabase/admin";
import { getCompetitionMatches } from "@/lib/football-data";

type Props = { params: Promise<{ code: string }> };

export async function POST(req: Request, { params }: Props) {
  try {
    const { code } = await params;
    const { searchParams } = new URL(req.url);
    const season = searchParams.get("season") || "2024";
    const data = await getCompetitionMatches(code, season);

    const rows = (data.matches || []).map((m: any) => ({
      external_id: String(m.id),
      competition_external_id: String(m.competition?.id ?? ""),
      competition_name: m.competition?.name ?? "",
      home_team_external_id: String(m.homeTeam?.id ?? ""),
      home_team_name: m.homeTeam?.name ?? "",
      away_team_external_id: String(m.awayTeam?.id ?? ""),
      away_team_name: m.awayTeam?.name ?? "",
      utc_date: m.utcDate,
      status: m.status,
      season: m.season?.startDate ? Number(m.season.startDate.slice(0, 4)) : null,
      stage: m.stage,
      matchday: m.matchday,
      venue: null,
      home_score: m.score?.fullTime?.home ?? null,
      away_score: m.score?.fullTime?.away ?? null,
    }));

    const { error } = await admin.from("matches").upsert(rows, { onConflict: "external_id" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, imported: rows.length });
  } catch {
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
