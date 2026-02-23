import { Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import type { Pokemon } from "../types/details.js";

const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.id);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Response("Invalid pokemon id", { status: 400 });
  }

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);

  if (!res.ok) {
    throw new Response("Pokemon not found", { status: res.status });
  }

  const data: Pokemon = await res.json();
  return data;
}

export default function DetailsPage() {
  const pokemon = useLoaderData() as Pokemon;
  const totalBaseStat = pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);

  return (
    <div className="min-h-screen bg-cyan-100">
      <div className="p-4 flex items-center">
        <div className="font-semibold"></div>
        <Link to="/" className="btn btn-ghost">
          Back to Home
        </Link>
      </div>

      <div className="flex flex-wrap justify-center items-center pb-10">
        <div className="card bg-black shadow-sm p-5">
          <div className="text-center text-3xl text-yellow-400 font-bold">{pokemon.name.toUpperCase()}</div>

          <figure>
            <img src={`${imageUrl}${pokemon.id}.png`} alt={pokemon.name} className="w-72 object-contain mx-auto" />{" "}
          </figure>

          <div className="flex flex-col text-white text-center justify-center items-center">
            <p>Height: {(pokemon.height / 10).toFixed(1)} m</p>
            <p>Weight: {(pokemon.weight / 10).toFixed(1)} kg</p>
            <div className="flex gap-2 mt-2">
              {pokemon.types.map((t) => (
                <span key={t.type.name} className="px-3 py-1 bg-blue-500 rounded-full text-sm capitalize">
                  {t.type.name}
                </span>
              ))}
            </div>
            <div className="mt-2">
              <h2 className="text-xl font-bold mb-2 text-yellow-300">Abilities</h2>
              {pokemon.abilities.map((a) => (
                <p key={a.ability.name} className="capitalize">
                  {a.ability.name}
                  {a.is_hidden && " (Hidden)"}
                </p>
              ))}
            </div>
            <div className="w-full mt-4">
              <h2 className="text-xl font-bold mb-2 text-yellow-300">Stats</h2>
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{s.stat.name}</span>
                    <span>{s.base_stat}</span>
                  </div>

                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div className="bg-green-400 h-2 rounded" style={{ width: `${Math.min(s.base_stat, 150)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-gray-600 pt-3 text-yellow-300">
              <div className="flex justify-between text-lg font-bold gap-2">
                <span>Total Base Stats: </span>
                <span> {totalBaseStat}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
