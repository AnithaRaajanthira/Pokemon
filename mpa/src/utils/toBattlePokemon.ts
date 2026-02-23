import { BattlePokemon, BattleStats } from "../types/battle";
import { Pokemon } from "../types/details";

function toBattlePokemon(p: Pokemon, level = 50): BattlePokemon {
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
