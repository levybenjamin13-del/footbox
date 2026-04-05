"use client";

import { useState } from "react";

type Props = {
  entityType: "match";
  entityExternalId: string;
};

export default function CommentForm({ entityType, entityExternalId }: Props) {
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Envoi...");

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity_type: entityType, entity_external_id: entityExternalId, body }),
    });

    if (!res.ok) {
      setStatus("Erreur");
      return;
    }

    setBody("");
    setStatus("Commentaire ajouté");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-black/40 p-6">
      <h3 className="text-xl font-bold">Ajouter un commentaire</h3>
      <textarea
        className="w-full rounded-2xl border border-white/10 bg-zinc-950/80 p-4 text-white outline-none"
        rows={3}
        placeholder="Écris ton avis..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button className="rounded-xl bg-white px-4 py-3 font-semibold text-black">Envoyer</button>
      {status ? <p className="text-sm text-zinc-400">{status}</p> : null}
    </form>
  );
}
