import { BattlePokemon, BattleStats } from "@/types/battle";
import { Pokemon } from "@/types/details";

export function getRandomPokemonId(): number {
  const MAX = 200;
  return Math.floor(Math.random() * MAX) + 1;
}

export async function fetchPokemonById(id: number): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon: ${res.status}`);
  return res.json();
}

export function calcDamage(attacker: BattlePokemon, defender: BattlePokemon): number {
  const levelFactor = Math.floor(attacker.level / 5);
  const base = attacker.stats.attack + levelFactor;
  const mitigated = Math.floor(base - defender.stats.defense / 3);
  return Math.max(1, Math.floor(mitigated));
}

export function hpPercent(p: BattlePokemon): number {
  return Math.max(0, Math.min(100, Math.round((p.currentHp / p.stats.hp) * 100)));
}

export function toBattlePokemon(p: Pokemon, level = 50): BattlePokemon {
  const get = (statName: string) => p.stats.find((s) => s.stat.name === statName)?.base_stat ?? 1;

  const stats: BattleStats = {
    hp: get("hp"),
    attack: get("attack"),
    defense: get("defense"),
    speed: get("speed"),
  };

  return {
    id: p.id,
    name: p.name,
    sprite: p.sprites.front_default ?? "",
    level,
    stats,
    currentHp: stats.hp,
  };
}
