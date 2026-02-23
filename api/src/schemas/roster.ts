import { z } from "zod";

export const PokemonIdSchema = z.coerce.number().int().positive();

export const AddRosterSchema = z.object({
  pokemonId: PokemonIdSchema,
});

export const RemoveRosterParamsSchema = z.object({
  pokemonId: PokemonIdSchema,
});
