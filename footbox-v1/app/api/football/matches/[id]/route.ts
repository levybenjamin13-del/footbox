import { NextResponse } from "next/server";
import { getMatchById } from "@/lib/football-data";

type Props = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Props) {
  try {
    const { id } = await params;
    const data = await getMatchById(id);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unable to fetch match" }, { status: 500 });
  }
}
