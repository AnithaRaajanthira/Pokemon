import { useEffect, useMemo, useState } from "react";
import { useLoaderData, Link } from "react-router";
import PokCards from "../components/ui/PokCards";
import { addToRoster, readRoster, removeFromRoster, type RosterPokemon } from "../types/rosterStorage";

type detailsCardsProps = {
  name: string;
  imageUrl: string;
  rosterBtnLabel?: string;
  rosterBtnDisabled?: boolean;
  rosterBtnOnClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type pokemonDetailsResponse = {
  name: string;
  weight: number;
  height: number;
  types: Object;
};

export async function loader(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error("Cannot fetch data:");
  const data = await res.json();
  return data.results as pokemonDetailsResponse[];
}

export default function DetailsPage({
  name,
  imageUrl,
  rosterBtnLabel,
  rosterBtnDisabled,
  rosterBtnOnClick,
}: detailsCardsProps) {
  const [pokemon, setPokemon] = useState<pokemonDetailsResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loader(1)
      .then(setPokemon)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-cyan-100">
      <div className="p-4 flex items-center justify-between">
        <div className="font-semibold"></div>
        <Link to="/" className="btn btn-ghost">
          Back to Home
        </Link>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="card bg-black shadow-sm w-140 p-5">
          <div className="text-white text-center">name</div>

          <figure className="px-10 pt-10">
            <img src={imageUrl} alt={name} className="rounded-xl" />
          </figure>
          <div className="text-white">Type:</div>
        </div>
        {/* 

        <div className="card-body items-center text-center">
          <h2 className="card-title text-white">{name}</h2>
        </div> */}
      </div>
    </div>
  );
}
