import Link from "next/link";

type Props = {
  match: {
    external_id: string;
    competition_name: string;
    home_team_name: string;
    away_team_name: string;
    utc_date: string;
    home_score: number | null;
    away_score: number | null;
  };
};

export default function MatchCard({ match }: Props) {
  return (
    <Link href={`/match/${match.external_id}`} className="rounded-3xl border border-white/10 bg-black/40 p-5 transition hover:border-green-500/40 hover:bg-black/60">
      <p className="text-sm uppercase tracking-widest text-green-400">{match.competition_name}</p>
      <h3 className="mt-2 text-xl font-bold">{match.home_team_name} vs {match.away_team_name}</h3>
      <p className="mt-3 text-3xl font-black">{match.home_score ?? "-"} - {match.away_score ?? "-"}</p>
      <p className="mt-2 text-sm text-zinc-500">{new Date(match.utc_date).toLocaleString("fr-FR")}</p>
    </Link>
  );
}
