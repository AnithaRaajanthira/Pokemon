import { useState } from "react";
import type { BattlePokemon } from "../types/battle.js";
import { calcDamage, fetchPokemonById, getRandomPokemonId, hpPercent, toBattlePokemon } from "@/utils/battles.js";
import { fetchRosterFromDb } from "@/utils/fetchRoster.js";
import { LoaderFunctionArgs } from "react-router";
import { Pokemon } from "@/types/details.js";

const BG =
  "https://pokemonrevolution.net/forum/uploads/monthly_2021_03/DVMT-6OXcAE2rZY.jpg.afab972f972bd7fbd4253bc7aa1cf27f.jpg";

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

export async function battleLoader(_args: LoaderFunctionArgs) {
  const { roster } = await fetchRosterFromDb();
  return { roster };
}

// set up the default 6 Pokemon
export async function loader() {
  return {
    roster: [
      { pokemonId: 151 },
      { pokemonId: 4 },
      { pokemonId: 89 },
      { pokemonId: 60 },
      { pokemonId: 153 },
      { pokemonId: 99 },
    ],
  };
}
const [p1, p2, p3, p4, p5, p6] = await Promise.all([
  fetchPokemonById(151),
  fetchPokemonById(5),
  fetchPokemonById(89),
  fetchPokemonById(245),
  fetchPokemonById(45),
  fetchPokemonById(67),
  fetchPokemonById(99),
]);
const roster: Pokemon[] = [p1, p2, p3, p4, p5, p6];

export default function BattlePage() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [player, setPlayer] = useState<BattlePokemon | null>(null);
  const [computer, setComputer] = useState<BattlePokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [winner, setWinner] = useState<"player" | "computer" | null>(null);
  // const [score, setScore] = useState(null);

  async function startBattle() {
    if (!selectedPokemon) {
      alert("Select a Pokémon first!");
      return;
    }
    try {
      setLoading(true);
      setWinner(null);
      setLog(["Battle starting..."]);

      // Later, replace player with "selected pokemon" from roster/details.
      let computerId = getRandomPokemonId();
      const computerP = await fetchPokemonById(computerId);
      const playerBP = toBattlePokemon(selectedPokemon, 50);
      const computerBP = toBattlePokemon(computerP, 50);

      setPlayer(playerBP);
      setComputer(computerBP);

      setLog((prev) => [...prev, `You got ${playerBP.name}.`, `Computer got ${computerBP.name}.`]);
    } catch (e) {
      console.error(e);
      setLog(["Failed to start battle. Try again."]);
    } finally {
      setLoading(false);
    }
  }

  function attack() {
    if (!player || !computer) return;
    if (winner) return;

    // Player attacks first (MVP).
    const dmgToComputer = calcDamage(player, computer);
    const nextComputer: BattlePokemon = {
      ...computer,
      currentHp: Math.max(0, computer.currentHp - dmgToComputer),
    };

    let nextLog = [`${player.name.toUpperCase()} hits ${computer.name.toUpperCase()} for -${dmgToComputer}`];

    if (nextComputer.currentHp === 0) {
      setComputer(nextComputer);
      setWinner("player");
      setLog((prev) => [...prev, ...nextLog, `${computer.name} fainted. You win!`]);
      return;
    }

    // Computer counter-attacks
    const dmgToPlayer = calcDamage(nextComputer, player);
    const nextPlayer: BattlePokemon = {
      ...player,
      currentHp: Math.max(0, player.currentHp - dmgToPlayer),
    };

    nextLog.push(`${computer.name.toUpperCase()} hits ${player.name.toUpperCase()} for -${dmgToPlayer}`);

    if (nextPlayer.currentHp === 0) {
      setPlayer(nextPlayer);
      setComputer(nextComputer);
      setWinner("computer");
      setLog((prev) => [...prev, ...nextLog, `${player.name} fainted. Computer wins.`]);
      return;
    }

    setPlayer(nextPlayer);
    setComputer(nextComputer);
    setLog((prev) => [...prev, ...nextLog]);
  }

  return (
    <div className="min-h-screen bg-battle-bg bg-cover bg-center" style={{ backgroundImage: `url('${BG}')` }}>
      <div className="flex flex-col items-center justify-center p-10">
        <h1 className="text-yellow-300 font-bold text-6xl text-center pt-2 h-20">POKEMON BATTLE</h1>
        {/* Winner */}
        {winner && (
          <div className="text-center text-3xl font-bold text-red-500">
            {winner === "player" ? "You Win!" : "Computer Wins!"}
          </div>
        )}

        {/* Arena */}
        <div className="w-full max-w-5xl flex flex-row gap-10 pt-20">
          {/* Battle Log */}
          <div className="bg-black/80 rounded-xl p-4 text-white w-1/2">
            <div className="font-bold mb-2">Battle Log</div>
            <div className="space-y-1 text-sm max-h-48 overflow-auto">
              {log.map((line, idx) => (
                <div key={idx}>
                  {line}
                  <br />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full max-w-5xl flex flex-col pl-30 gap-10">
            {/* Computer */}
            <div className="flex items-center justify-between text-white gap-10">
              <div className="w-80 bg-black/50 rounded-xl p-6">
                <div className="text-xl font-bold text-yellow-200">Computer</div>
                {computer ? (
                  <>
                    <div className="capitalize text-2xl">{computer.name}</div>
                    <div className="text-sm">
                      HP: {computer.currentHp} / {computer.stats.hp}
                    </div>
                    <div className="w-full bg-white/20 h-3 rounded mt-2">
                      <div className="bg-green-400 h-3 rounded" style={{ width: `${hpPercent(computer)}%` }} />
                    </div>
                  </>
                ) : (
                  <div className="opacity-80">Waiting...</div>
                )}
              </div>

              <div className="flex justify-end">
                {computer && (
                  <img className="w-60 object-contain" src={`${artworkUrl}${computer.id}.png`} alt={computer.name} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-5xl flex flex-col gap-10 pr-100 pt-5">
          {/* Player */}
          <div className="flex items-center justify-between text-white gap-10">
            <div className="w-60 flex items-center gap-6">
              {player && (
                <img className="w-100 object-contain" src={`${artworkUrl}${player.id}.png`} alt={player.name} />
              )}
            </div>

            <div className="w-1/2 text-right bg-black/50 rounded-xl p-6">
              <div className="text-xl font-bold text-yellow-200">You</div>
              {player ? (
                <>
                  <div className="capitalize text-2xl">{player.name}</div>
                  <div className="text-sm">
                    HP: {player.currentHp} / {player.stats.hp}
                  </div>
                  <div className="w-full bg-white/20 h-3 rounded mt-2 ml-auto">
                    <div className="bg-green-400 h-3 rounded" style={{ width: `${hpPercent(player)}%` }} />
                  </div>
                </>
              ) : (
                <div className="opacity-80">Pick a Pokémon.</div>
              )}
            </div>
          </div>
        </div>
        <div>
          {/* Buttons */}
          <div className="flex gap-5 justify-center">
            <button onClick={startBattle} className="btn bg-white" disabled={!selectedPokemon}>
              Start Battle
            </button>

            <button
              onClick={attack}
              className="btn bg-red-500 text-white"
              disabled={!player || !computer || loading || !!winner}
            >
              Attack
            </button>
          </div>
        </div>
        <div className="text-left">
          <section className="flex p-5 text-white justify-around gap-10">
            {roster.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPokemon(p)}
                className={[
                  "rounded-xl p-2 transition",
                  "hover:scale-105",
                  selectedPokemon?.id === p.id ? "ring-4 ring-yellow-400 bg-white/10" : "ring-2 ring-white/20",
                ].join(" ")}
                aria-label={`Select ${p.name} for battle`}
              >
                <img className="w-20 object-contain" src={p.sprites.front_default ?? ""} alt={p.name} />
                <div className="mt-2 text-center capitalize text-sm">{p.name}</div>
              </button>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
