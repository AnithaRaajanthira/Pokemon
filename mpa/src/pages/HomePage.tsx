import { useEffect, useState } from "react"; //useMemo is out, using backend now
import { useLoaderData, Link } from "react-router";
import PokCards from "../components/ui/PokCards";
import { addRoster, getRoster, removeRoster } from "../lib/rosterApi"; //Localstorage is out, API is in

type PokemonsType = {
  name: string;
  url: string;
};

//Take ID of individual Pokemon of the Pokemon URL and return it.
function getPokemonId(url: string): number | null {
  const idStr = url.split("/").filter(Boolean).pop();
  const id = Number(idStr);
  return Number.isFinite(id) ? id : null;
}

//Load Pokemon list.
export async function loader() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151"); //to see all pokemon, number needs to be changed to 1350. Could cause performance issues with lower end pcs.
  if (!res.ok) throw new Error("Cannot fetch data:");
  const data = await res.json();
  return data.results as PokemonsType[];
}

export default function HomePage() {
  const results = useLoaderData<PokemonsType[]>();

  //updated for Backend
  const [rosterIds, setRosterIds] = useState<Set<number>>(new Set());
  const [rosterError, setRosterError] = useState<string | null>(null);
  const [loadingRoster, setLoadingRoster] = useState(true);

  // load initial roster of the user from backend
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoadingRoster(true);
        setRosterError(null);

        const { items } = await getRoster(); // GET /api/roster
        if (cancelled) return;

        setRosterIds(new Set(items.map((x) => x.pokemonId)));
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

  //Count how many Pokemon are in the Roster by checking how many IDs are stored in the set
  const rosterCount = rosterIds.size;

  //If something goes wrong while loading the Pokemon API it says "No Pokemon found"
  if (results.length === 0) {
    return <div className="p-4 text-gray-600">No Pokemon found.</div>;
  }

  //This shows (currently on the homepage) how many pokemon are in your roster and how many you can have maximum (spoiler: it's 6)
  return (
    <div className="min-h-screen bg-cyan-100">
      <div className="p-4 flex items-center justify-between">
        <div className="font-semibold  text-gray-800">
          Roster: {loadingRoster ? "…" : rosterCount}/6
        </div>
      </div>

      {rosterError && (
        <div className="px-4 pb-2">
          <div className="alert alert-warning">{rosterError}</div>
        </div>
      )}

      <div className="p-6 grid grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {results.map((result) => {
          const id = getPokemonId(result.url);
          if (!id) return null;

          const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          const inRoster = rosterIds.has(id);
          const rosterFull = rosterIds.size >= 6;

          return (
            <div key={result.url}>
              <PokCards
                name={result.name}
                imageUrl={img}
                rosterBtnLabel={
                  inRoster ? "Remove from Roster" : "Add to Roster"
                }
                rosterBtnDisabled={loadingRoster || (!inRoster && rosterFull)}
                rosterBtnOnClick={async () => {
                  setRosterError(null);

                  try {
                    if (inRoster) {
                      await removeRoster(id); // DELETE /api/roster/:id
                      setRosterIds((prev) => {
                        const next = new Set(prev);
                        next.delete(id);
                        return next;
                      });
                    } else {
                      await addRoster(id); // POST /api/roster { pokemonId }
                      setRosterIds((prev) => {
                        const next = new Set(prev);
                        next.add(id);
                        return next;
                      });
                    }
                  } catch (e) {
                    setRosterError(
                      e instanceof Error ? e.message : "Roster update failed",
                    );
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
