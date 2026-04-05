"use client";

import { createClient } from "@/lib/supabase/client";

export default function AuthButton() {
  const supabase = createClient();

  async function signIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback` },
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div className="flex gap-2">
      <button onClick={signIn} className="rounded-xl bg-green-500 px-4 py-3 font-semibold text-black">
        Connexion
      </button>
      <button onClick={signOut} className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 font-semibold text-white">
        Déconnexion
      </button>
    </div>
  );
}
