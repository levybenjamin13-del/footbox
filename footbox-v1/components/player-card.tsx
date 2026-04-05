import Link from "next/link";

type Props = {
  player: {
    external_id: string;
    name: string;
    nationality: string | null;
    position: string | null;
    photo_url: string | null;
  };
};

export default function PlayerCard({ player }: Props) {
  return (
    <Link href={`/player/${player.external_id}`} className="rounded-3xl border border-white/10 bg-black/40 p-5 transition hover:border-green-500/40 hover:bg-black/60">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-2xl font-black text-green-400">
        {player.name?.[0]}
      </div>
      <h3 className="mt-4 text-lg font-bold">{player.name}</h3>
      <p className="mt-1 text-sm text-zinc-400">{player.position ?? "Joueur"}</p>
      <p className="text-sm text-zinc-500">{player.nationality ?? "—"}</p>
    </Link>
  );
}
