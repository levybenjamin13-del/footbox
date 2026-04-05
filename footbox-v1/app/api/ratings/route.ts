import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const { data, error } = await supabase
    .from("ratings")
    .upsert({
      user_id: user.id,
      entity_type: body.entity_type,
      entity_external_id: body.entity_external_id,
      rating: body.rating,
      review: body.review ?? null,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: "user_id,entity_type,entity_external_id",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
