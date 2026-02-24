const apiBase = import.meta.env.VITE_APP_API_SERVER_URL.replace(/\/$/, "");

export async function fetchRosterFromDb() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("Not signed in");

  const res = await fetch(`${apiBase}/api/roster`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error(`Failed to fetch roster: ${res.status}`);
  return res.json() as Promise<{ roster: { pokemonId: number }[] }>;
}
