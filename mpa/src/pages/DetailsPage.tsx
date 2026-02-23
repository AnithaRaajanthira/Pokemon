import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Pokemon } from "../types/details";

export default function DetailsPage() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

  useEffect(() => {
    let cancelled = false;

    async function fetchPokemon() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const data: Pokemon = await res.json();
        if (!cancelled) setPokemon(data);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPokemon();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600 p-4">Error: {error}</div>;
  if (!pokemon) return <div>No Pokémon found.</div>;

  return (
    <div className="min-h-screen bg-cyan-100">
      <div className="p-4 flex items-center justify-between">
        <div className="font-semibold"></div>
        <Link to="/" className="btn btn-ghost">
          Back to Home
        </Link>
      </div>

      <div className="flex flex-wrap justify-center items-center">
        <div className="card bg-black shadow-sm p-5">
          <div className="text-center text-3xl text-yellow-400">{pokemon.name}</div>

          <figure>
            <img src={`${imageUrl}${pokemon.id}.png`} alt={pokemon.name} className="rounded-xl" />
          </figure>

          <div className="text-white">
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
