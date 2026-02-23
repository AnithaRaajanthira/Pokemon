export type BattleStats = {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
};

export type BattlePokemon = {
  id: number;
  name: string;
  sprite: string;
  level: number;
  stats: BattleStats; // base stats
  currentHp: number; // battle state
};
