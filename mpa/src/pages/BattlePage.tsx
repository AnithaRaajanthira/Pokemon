import { useState } from "react";
import { Pokemon } from "../types/details";

const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

export default function BattlePage() {
  // get the random Pokemon for battle
  function getRandomPokemonId(): number {
    const maxPokemon = 1025;
    return Math.floor(Math.random() * maxPokemon) + 1;
  }
  async function fetchRandomPokemon(): Promise<Pokemon> {
    const randomId = getRandomPokemonId();

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`);

    if (!res.ok) {
      throw new Error("Failed to fetch Pokémon");
    }

    const data: Pokemon = await res.json();
    return data;
  }

  const [computerPokemon, setComputerPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  async function generateComputerPokemon() {
    try {
      setLoading(true);
      const pokemon = await fetchRandomPokemon();
      setComputerPokemon(pokemon);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function attack() {}

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://pokemonrevolution.net/forum/uploads/monthly_2021_03/DVMT-6OXcAE2rZY.jpg.afab972f972bd7fbd4253bc7aa1cf27f.jpg')",
        }}
      >
        <div className="flex flex-col items-center justify-center p-10">
          <section className="text-yellow-300 font-bold text-6xl text-center pt-2 pb-40 h-20">POKEMON BATTLE</section>
          <section className="flex flex-row pl-110 pt-20 text-white items-center justify-around gap-10 h-50 w-200">
            <div>
              {loading && <p className="text-center text-xl">Computer is choosing...</p>}
              {computerPokemon && (
                <div>
                  {/* <h2 className="text-center text-2xl">{computerPokemon.name}</h2> */}
                  <img src={`${imageUrl}${computerPokemon.id}.png`} alt={computerPokemon.name} />
                </div>
              )}
            </div>
          </section>
          <section className="flex flex-row pr-150 pt-20 text-white items-center justify-around gap-10 h-50 w-200">
            <div className="text-center text-2xl">Selected</div>
          </section>
          <div className="flex pt-5 gap-5">
            <button onClick={generateComputerPokemon} className="btn bg-white">
              Start Battle
            </button>
            <button onClick={attack} className="btn bg-red-500 text-white">
              Attack
            </button>
          </div>
        </div>

        <div className="text-left">
          <section className="flex flex-row p-5 text-white justify-around gap-10">
            <div>pokemon1</div>
            <div>pokemon2</div>
            <div>pokemon3</div>
            <div>pokemon4</div>
            <div>pokemon5</div>
            <div>pokemon6</div>
          </section>
        </div>
      </div>
    </>
  );
}
