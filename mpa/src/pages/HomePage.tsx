import { useLoaderData, Link } from "react-router";
import PokCards from "../components/ui/PokCards";

type PokemonsType = {
  name: string;
  url: string;
};

export async function loader() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if (!res.ok) throw new Error("Cannot fetch data:");
  const data = await res.json();
  const pokemons = data.results;
  console.log(pokemons);
  return pokemons;
}

export default function HomePage() {
  const results = useLoaderData<PokemonsType[]>(); //-------------------------Type declaration
  if (results.length === 0) {
    return <div className="p-4 text-gray-600">No Pokemon found.</div>;
  }

  return (
    <div className="p-6 grid grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center bg-cyan-100 min-h-screen">
      {results.map((result) => {
        const url = result.url;
        const id = url.split("/").filter(Boolean).pop();
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        return (
          <div key={result.url}>
            <PokCards name={result.name} imageUrl={img}></PokCards>
          </div>
        );
      })}
    </div>
  );
}
