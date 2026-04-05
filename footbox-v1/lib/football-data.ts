const BASE_URL = "https://api.football-data.org/v4";

async function footballFetch(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY! },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`football-data error ${res.status}`);
  return res.json();
}

export async function getCompetitionMatches(code: string, season?: string) {
  return footballFetch(`/competitions/${code}/matches${season ? `?season=${season}` : ""}`);
}

export async function getMatchById(id: string) {
  return footballFetch(`/matches/${id}`);
}
