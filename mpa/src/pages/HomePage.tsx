import { useEffect, useMemo, useState } from "react";
import { useLoaderData, Link } from "react-router";
import PokCards from "../components/ui/PokCards";
import { addToRoster, readRoster, removeFromRoster, type RosterPokemon } from "../types/rosterStorage";

type PokemonsType = {
  name: string;
  url: string;
};

function getPokemonId(url: string): number | null {
  const idStr = url.split("/").filter(Boolean).pop();
  const id = Number(idStr);
  return Number.isFinite(id) ? id : null;
}

export async function loader() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if (!res.ok) throw new Error("Cannot fetch data:");
  const data = await res.json();
  return data.results as PokemonsType[];
}

export default function HomePage() {
  const results = useLoaderData<PokemonsType[]>();

  const [roster, setRoster] = useState<RosterPokemon[]>([]);
  const [rosterError, setRosterError] = useState<string | null>(null);

  useEffect(() => {
    setRoster(readRoster());
  }, []);

  const rosterIds = useMemo(() => new Set(roster.map((p) => p.id)), [roster]);

  if (results.length === 0) {
    return <div className="p-4 text-gray-600">No Pokemon found.</div>;
  }

  return (
    <div className="min-h-screen bg-cyan-100">
      <div className="p-4 flex items-center justify-between">
        <div className="font-semibold">Roster: {roster.length}/6</div>

        <Link to="/roster" className="btn btn-ghost">
          Go to Roster
        </Link>
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
          const rosterFull = roster.length >= 6;

          return (
            <div key={result.url}>
              <PokCards
                name={result.name}
                imageUrl={img}
                rosterBtnLabel={inRoster ? "Remove from Roster" : "Add to Roster"}
                rosterBtnDisabled={!inRoster && rosterFull}
                rosterBtnOnClick={() => {
                  setRosterError(null);

                  if (inRoster) {
                    const next = removeFromRoster(id);
                    setRoster(next);
                    return;
                  }

                  const toSave: RosterPokemon = {
                    id,
                    name: result.name,
                    url: result.url,
                    imageUrl: img,
                  };

                  const res = addToRoster(toSave);
                  setRoster(res.roster);
                  if (!res.ok) setRosterError(res.error);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
