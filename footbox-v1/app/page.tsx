import AuthButton from "@/components/auth-button";
import MatchCard from "@/components/match-card";
import PlayerCard from "@/components/player-card";
import { admin } from "@/lib/supabase/admin";

export default async function HomePage() {
  const [{ data: matches }, { data: players }] = await Promise.all([
    admin
      .from("matches")
      .select("external_id, competition_name, home_team_name, away_team_name, utc_date, home_score, away_score")
      .order("utc_date", { ascending: false })
      .limit(10),
    admin
      .from("players")
      .select("external_id, name, nationality, position, photo_url")
      .limit(8),
  ]);

  return (
    <main className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-green-400">Footbox</p>
            <h1 className="mt-2 text-4xl font-black md:text-5xl">La mémoire collective du football</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              Note les matchs, les joueurs et construis ton identité footballistique.
            </p>
          </div>
          <AuthButton />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Matchs à noter</h2>
          <a href="/rankings" className="text-sm text-green-400">Voir les classements</a>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {matches?.map((match) => (
            <MatchCard key={match.external_id} match={match} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Joueurs légendaires</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {players?.map((player) => (
            <PlayerCard key={player.external_id} player={player} />
          ))}
        </div>
      </section>
    </main>
  );
}
