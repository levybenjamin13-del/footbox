import AuthButton from "@/components/auth-button";

export default function LoginPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="rounded-3xl border border-white/10 bg-black/50 p-8">
        <h1 className="text-4xl font-bold">Connexion Footbox</h1>
        <p className="mt-3 max-w-md text-zinc-400">
          Connecte-toi pour noter, commenter et créer ton profil football.
        </p>
        <div className="mt-6">
          <AuthButton />
        </div>
      </div>
    </main>
  );
}
