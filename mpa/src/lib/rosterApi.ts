const API_BASE = "http://localhost:3001";

function authHeaders() {
  // Placeholder bis echter Authserver da ist
  return { "x-user-id": "dev-user-1" };
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      accept: "application/json",
      ...(init?.headers ?? {}),
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  // bei 204 kein json
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export type RosterItem = {
  userId: string;
  pokemonId: number;
  createdAt: string;
  updatedAt: string;
};

export async function getRoster() {
  return fetchJson<{ items: RosterItem[] }>(`${API_BASE}/api/roster`);
}

export async function addRoster(pokemonId: number) {
  return fetchJson<{ item: RosterItem }>(`${API_BASE}/api/roster`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ pokemonId }),
  });
}

export async function removeRoster(pokemonId: number) {
  return fetchJson<void>(`${API_BASE}/api/roster/${pokemonId}`, {
    method: "DELETE",
  });
}
