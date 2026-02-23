import { Link, useLoaderData } from "react-router";
import { useState } from "react";
import PokCards from "../components/ui/PokCards";
import { getRoster, removeRoster, type RosterItem } from "../lib/rosterApi"; //use API instead of Localstorage now

//Load roster from Backend before page is shown.
export async function rosterLoader() {
  const { items } = await getRoster(); // GET /api/roster
  return items;
}

// Get the Roster from the loader and allow it to be modified or removed.
export default function RosterPage() {
  const initial = useLoaderData<RosterItem[]>();
  const [items, setItems] = useState<RosterItem[]>(initial);

  return (
    <div className="min-h-screen bg-cyan-100">
      <div className="p-4 flex items-center justify-between">
        <div className="font-semibold  text-gray-800">Your Roster ({items.length}/6)</div>
      </div>

      {items.length === 0 ? (
        <div className="p-6 text-gray-600">No Pokémon in roster yet.</div>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {items.map((item) => {
            const id = item.pokemonId;
            const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return (
              <div key={id}>
                <PokCards
                  name={`#${id}`}
                  imageUrl={img}
                  rosterBtnLabel="Remove from Roster"
                  rosterBtnOnClick={async () => {
                    await removeRoster(id); // DELETE /api/roster/:id
                    setItems((prev) => prev.filter((x) => x.pokemonId !== id));
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
