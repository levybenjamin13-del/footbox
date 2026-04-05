import { notFound } from "next/navigation";
import ReviewForm from "@/components/review-form";
import CommentForm from "@/components/comment-form";
import { admin } from "@/lib/supabase/admin";

type Props = { params: Promise<{ id: string }> };

export default async function MatchPage({ params }: Props) {
  const { id } = await params;

  const [{ data: match }, { data: summary }, { data: comments }] = await Promise.all([
    admin.from("matches").select("*").eq("external_id", id).single(),
    admin.from("entity_rating_summary").select("*").eq("entity_type", "match").eq("entity_external_id", id).maybeSingle(),
    admin.from("comments").select("id, body, created_at").eq("entity_type", "match").eq("entity_external_id", id).order("created_at", { ascending: false }),
  ]);

  if (!match) return notFound();

  return (
    <main className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-black/50 p-6">
        <p className="text-sm uppercase tracking-widest text-green-400">{match.competition_name}</p>
        <h1 className="mt-2 text-3xl font-black">
          {match.home_team_name} vs {match.away_team_name}
        </h1>
        <p className="mt-4 text-5xl font-black text-white">
          {match.home_score ?? "-"} - {match.away_score ?? "-"}
        </p>
        <p className="mt-3 text-zinc-400">{new Date(match.utc_date).toLocaleString("fr-FR")}</p>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <p className="text-sm text-zinc-400">Note globale</p>
        <p className="mt-2 text-4xl font-black text-green-400">{summary?.avg_rating ?? "—"} / 5</p>
        <p className="text-zinc-500">{summary?.ratings_count ?? 0} note(s)</p>
      </section>

      <ReviewForm entityType="match" entityExternalId={id} />
      <CommentForm entityType="match" entityExternalId={id} />

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Commentaires</h2>
        {comments?.map((comment) => (
          <div key={comment.id} className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4">
            <p>{comment.body}</p>
            <p className="mt-2 text-xs text-zinc-500">{new Date(comment.created_at).toLocaleString("fr-FR")}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
