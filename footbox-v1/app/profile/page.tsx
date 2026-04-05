import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { admin } from "@/lib/supabase/admin";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: profile }, { data: ratings }] = await Promise.all([
    admin.from("profiles").select("*").eq("id", user.id).single(),
    admin.from("ratings").select("*").eq("user_id", user.id).order("updated_at", { ascending: false }),
  ]);

  return (
    <main className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <h1 className="text-3xl font-bold">{profile?.display_name ?? "Profil"}</h1>
        <p className="mt-1 text-zinc-400">@{profile?.username}</p>
        {profile?.bio ? <p className="mt-3 text-zinc-300">{profile.bio}</p> : null}
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <p className="text-sm text-zinc-400">Nombre de notes</p>
        <p className="mt-2 text-3xl font-black text-green-400">{ratings?.length ?? 0}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Mes notes</h2>
        {ratings?.map((item) => (
          <div key={item.id} className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4">
            <p className="text-xs uppercase tracking-widest text-green-400">{item.entity_type}</p>
            <p className="mt-2 font-semibold">{item.entity_external_id}</p>
            <p className="mt-1">⭐ {item.rating}/5</p>
            {item.review ? <p className="mt-2 text-zinc-300">{item.review}</p> : null}
          </div>
        ))}
      </section>
    </main>
  );
}
