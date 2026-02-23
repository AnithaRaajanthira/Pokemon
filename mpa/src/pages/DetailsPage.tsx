import { Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import type { Pokemon } from "../types/details";

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

  return (
    <div className="min-h-screen bg-cyan-100">
      <div className="p-4 flex items-center">
        <div className="font-semibold"></div>
        <Link to="/" className="btn btn-ghost">
          Back to Home
        </Link>
      </div>

      <div className="flex flex-wrap justify-center items-center">
        <div className="card bg-black shadow-sm p-5">
          <div className="text-center text-3xl text-yellow-400">{pokemon.name.toUpperCase()}</div>

          <figure>
            <img src={`${imageUrl}${pokemon.id}.png`} alt={pokemon.name} className="rounded-xl" />
          </figure>

          <div className="flex flex-col text-white text-center justify-center items-center">
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
            <p>Abilities: {pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
