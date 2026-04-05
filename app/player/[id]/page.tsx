import { notFound } from "next/navigation";
import { admin } from "@/lib/supabase/admin";
import ReviewForm from "@/components/review-form";

type Props = { params: Promise<{ id: string }> };

export default async function PlayerPage({ params }: Props) {
  const { id } = await params;

  const [{ data: player }, { data: summary }] = await Promise.all([
    admin.from("players").select("*").eq("external_id", id).single(),
    admin.from("entity_rating_summary").select("*").eq("entity_type", "player").eq("entity_external_id", id).maybeSingle(),
  ]);

  if (!player) return notFound();

  return (
    <main className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-black/50 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-3xl font-black text-green-400">
            {player.name?.[0]}
          </div>
          <div>
            <h1 className="text-3xl font-black">{player.name}</h1>
            <p className="mt-1 text-zinc-400">{player.position ?? "Joueur"} · {player.nationality ?? "—"}</p>
            <p className="mt-4 text-4xl font-black text-green-400">{summary?.avg_rating ?? "—"} / 5</p>
            <p className="text-zinc-500">{summary?.ratings_count ?? 0} note(s)</p>
          </div>
        </div>
      </section>

      <ReviewForm entityType="player" entityExternalId={id} />
    </main>
  );
}
