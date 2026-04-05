import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-around px-4 py-4 text-sm text-zinc-300">
        <Link href="/">Accueil</Link>
        <Link href="/rankings">Classements</Link>
        <Link href="/profile">Profil</Link>
      </div>
    </nav>
  );
}
