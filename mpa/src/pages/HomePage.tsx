import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import PokCards from "../components/ui/PokCards";
import { getRoster } from "../lib/rosterApi";

type PokemonsType = {
  name: string;
  url: string;
};

//Take ID of individual Pokemon of the Pokemon URL and return it.
export function getPokemonId(url: string): number | null {
  const idStr = url.split("/").filter(Boolean).pop();
  const id = Number(idStr);
  return Number.isInteger(id) ? id : null;
}

//Load Pokemon list.
export async function loader() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if (!res.ok) throw new Error("Cannot fetch data:");
  const data = await res.json();
  return data.results as PokemonsType[];
}

export default function HomePage() {
  const results = useLoaderData<PokemonsType[]>();

  const [rosterCount, setRosterCount] = useState<number>(0);
  const [rosterError, setRosterError] = useState<string | null>(null);
  const [loadingRoster, setLoadingRoster] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoadingRoster(true);
        setRosterError(null);

        const { items } = await getRoster();
        if (cancelled) return;

        setRosterCount(items.length);
      } catch (e) {
        if (cancelled) return;
        setRosterError(
          e instanceof Error ? e.message : "Failed to load roster",
        );
      } finally {
        if (!cancelled) setLoadingRoster(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (results.length === 0) {
    return <div className="p-4 text-gray-600">No Pokemon found.</div>;
  }

  return (
    <div className="min-h-screen bg-mist-600">
      {/* <div className="p-4 flex items-center justify-between">
        <div className="font-semibold text-gray-800">
          Roster: {loadingRoster ? "…" : rosterCount}/6
        </div>
      </div>

      {rosterError && (
        <div className="px-4 pb-2">
          <div className="alert alert-warning">{rosterError}</div>
        </div>
      )} */}

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {results.map((result) => {
          const id = getPokemonId(result.url);
          if (!id) return null;

          const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          return (
            <div key={result.url}>
              <PokCards id={id} name={result.name} imageUrl={img} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
