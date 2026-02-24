import { useState } from "react";
import type { Pokemon } from "../types/details.js";
import type { BattlePokemon } from "../types/battle.js";
import { toBattlePokemon } from "../utils/toBattlePokemon.js";

const BG =
  "https://pokemonrevolution.net/forum/uploads/monthly_2021_03/DVMT-6OXcAE2rZY.jpg.afab972f972bd7fbd4253bc7aa1cf27f.jpg";

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

function getRandomPokemonId(): number {
  const MAX = 1025;
  return Math.floor(Math.random() * MAX) + 1;
}

async function fetchPokemonById(id: number): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon: ${res.status}`);
  return res.json();
}

function calcDamage(attacker: BattlePokemon, defender: BattlePokemon): number {
  // Simple MVP formula (fun + predictable)
  const levelFactor = Math.floor(attacker.level / 5);
  const base = attacker.stats.attack + levelFactor;
  const mitigated = Math.floor(base - defender.stats.defense / 3);

  return Math.max(1, Math.floor(mitigated));
}

function hpPercent(p: BattlePokemon): number {
  return Math.max(0, Math.min(100, Math.round((p.currentHp / p.stats.hp) * 100)));
}

export default function BattlePage() {
  const [player, setPlayer] = useState<BattlePokemon | null>(null);
  const [computer, setComputer] = useState<BattlePokemon | null>(null);

  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [winner, setWinner] = useState<"player" | "computer" | null>(null);

  async function startBattle() {
    try {
      setLoading(true);
      setWinner(null);
      setLog(["Battle starting..."]);

      // For MVP: random both sides so the page works now.
      // Later, replace player random with "selected pokemon" from roster/details.
      const playerId = getRandomPokemonId();
      let computerId = getRandomPokemonId();
      while (computerId === playerId) computerId = getRandomPokemonId();

      const [p1, p2] = await Promise.all([fetchPokemonById(playerId), fetchPokemonById(computerId)]);

      const playerBP = toBattlePokemon(p1, 50);
      const computerBP = toBattlePokemon(p2, 50);

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

    let nextLog = [`${player.name.toUpperCase()} hits ${computer.name.toUpperCase()} for ${dmgToComputer}!`];

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

    nextLog.push(`${computer.name} hits ${player.name} for ${dmgToPlayer}!`);

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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BG}')` }}>
      <div className="flex flex-col items-center justify-center p-10">
        <h1 className="text-yellow-300 font-bold text-6xl text-center pt-2 pb-10 h-20">POKEMON BATTLE</h1>
        {/* Winner */}
        {winner && (
          <div className="text-center text-3xl font-bold text-red-400">
            {winner === "player" ? "You Win!" : "Computer Wins!"}
          </div>
        )}

        {/* Arena */}
        <div className="w-full max-w-5xl flex flex-row gap-10 pt-20">
          {/* Battle Log */}
          <div className="bg-black/80 rounded-xl p-4 text-white w-1/3">
            <div className="font-bold mb-2">Battle Log</div>
            <div className="space-y-1 text-sm max-h-48 overflow-auto">
              {log.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
          <div className="w-full max-w-5xl flex flex-col pl-30 pt-5">
            {/* Computer */}
            <div className="flex items-center justify-between text-white">
              <div className="w-1/2 bg-black/50 rounded-xl p-6">
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

              <div className="w-60 flex justify-end">
                {loading && <p className="text-sm">Computer is choosing...</p>}
                {computer && (
                  <img className="w-60 object-contain" src={`${artworkUrl}${computer.id}.png`} alt={computer.name} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-5xl flex flex-col gap-10 pr-100">
          {/* Player */}
          <div className="flex items-center justify-between text-white gap-10">
            <div className="w-60 flex items-center gap-6">
              {player && (
                <img className="w-100 object-contain" src={`${artworkUrl}${player.id}.png`} alt={player.name} />
              )}
              {!player && <div className="opacity-80">Waiting...</div>}
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
            <button onClick={startBattle} className="btn bg-white" disabled={loading}>
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
    </div>
  );
}
