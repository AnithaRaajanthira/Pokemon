// import { z } from "zod";

// export type RosterPokemon = {
//   id: number;
//   name: string;
//   url: string;
//   imageUrl: string;
// };

// const RosterPokemonSchema = z.object({
//   id: z.number().int().positive(),
//   name: z.string(),
//   url: z.string(),
//   imageUrl: z.string(),
// });

// const RosterSchema = z
//   .array(RosterPokemonSchema)
//   .catch([])
//   .transform((arr) => arr.slice(0, 6));

// const KEY = "pokemon_roster";
// const MAX = 6;

// export function readRoster(): RosterPokemon[] {
//   try {
//     const raw = localStorage.getItem(KEY);
//     if (!raw) return [];
//     return RosterSchema.parse(JSON.parse(raw));
//   } catch {
//     return [];
//   }
// }

// export function writeRoster(roster: RosterPokemon[]) {
//   localStorage.setItem(KEY, JSON.stringify(roster.slice(0, MAX)));
// }

// export function isInRoster(id: number): boolean {
//   return readRoster().some((p) => p.id === id);
// }

// export function addToRoster(pokemon: RosterPokemon): { ok: true; roster: RosterPokemon[] } | { ok: false; roster: RosterPokemon[]; error: string } {
//   const roster = readRoster();

//   if (roster.some((p) => p.id === pokemon.id)) {
//     return { ok: true, roster };
//   }

//   if (roster.length >= MAX) {
//     return {
//       ok: false,
//       roster,
//       error: `Roster limit is ${MAX}. Remove one first.`,
//     };
//   }

//   const next = [...roster, pokemon];
//   writeRoster(next);
//   return { ok: true, roster: next };
// }

// export function removeFromRoster(id: number): RosterPokemon[] {
//   const roster = readRoster();
//   const next = roster.filter((p) => p.id !== id);
//   writeRoster(next);
//   return next;
// }
