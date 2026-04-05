"use client";

import { useState } from "react";
import RatingStars from "./rating-stars";

type Props = {
  entityType: "match" | "player";
  entityExternalId: string;
};

export default function ReviewForm({ entityType, entityExternalId }: Props) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Enregistrement...");

    const res = await fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity_type: entityType, entity_external_id: entityExternalId, rating, review }),
    });

    if (!res.ok) {
      setStatus("Erreur");
      return;
    }

    setStatus("Avis enregistré");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-black/40 p-6">
      <h3 className="text-xl font-bold">Noter</h3>
      <RatingStars value={rating} onChange={setRating} />
      <textarea
        className="w-full rounded-2xl border border-white/10 bg-zinc-950/80 p-4 text-white outline-none"
        rows={4}
        placeholder="Ton commentaire..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button className="rounded-xl bg-green-500 px-4 py-3 font-semibold text-black">Publier</button>
      {status ? <p className="text-sm text-zinc-400">{status}</p> : null}
    </form>
  );
}
