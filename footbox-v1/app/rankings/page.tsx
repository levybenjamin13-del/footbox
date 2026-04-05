import { admin } from "@/lib/supabase/admin";

export default async function RankingsPage() {
  const [{ data: matchRatings }, { data: playerRatings }] = await Promise.all([
    admin.from("entity_rating_summary").select("*").eq("entity_type", "match").order("avg_rating", { ascending: false }).limit(25),
    admin.from("entity_rating_summary").select("*").eq("entity_type", "player").order("avg_rating", { ascending: false }).limit(25),
  ]);

  return (
    <main className="space-y-8">
      <section>
        <h1 className="text-3xl font-black">Classements globaux</h1>
        <p className="mt-2 text-zinc-400">Les catégories les mieux notées par la communauté.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Top matchs</h2>
        {matchRatings?.map((item, index) => (
          <div key={item.entity_external_id} className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-sm text-zinc-500">#{index + 1}</p>
            <p className="font-semibold">{item.entity_external_id}</p>
            <p className="text-zinc-300">{item.avg_rating}/5 · {item.ratings_count} note(s)</p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Top joueurs</h2>
        {playerRatings?.map((item, index) => (
          <div key={item.entity_external_id} className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-sm text-zinc-500">#{index + 1}</p>
            <p className="font-semibold">{item.entity_external_id}</p>
            <p className="text-zinc-300">{item.avg_rating}/5 · {item.ratings_count} note(s)</p>
          </div>
        ))}
      </section>
    </main>
  );
}
