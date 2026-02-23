import type { RequestHandler } from "express";
import { RosterItem } from "#models";
import { AddRosterSchema, RemoveRosterParamsSchema } from "#schemas";

const MAX_ROSTER = 6;

export const getRoster: RequestHandler = async (req, res) => {
  const userId = req.user!.id;

  const items = await RosterItem.find({ userId }).sort({ createdAt: 1 }).lean();

  res.json({ items });
};

export const addRosterItem: RequestHandler = async (req, res) => {
  const userId = req.user!.id;
  const { pokemonId } = AddRosterSchema.parse(req.body);

  const count = await RosterItem.countDocuments({ userId });
  if (count >= MAX_ROSTER) {
    return res.status(409).json({ error: `Roster limit is ${MAX_ROSTER}` });
  }

  const created = await RosterItem.create({ userId, pokemonId });
  res.status(201).json({ item: created });
};

export const removeRosterItem: RequestHandler = async (req, res) => {
  const userId = req.user!.id;
  const { pokemonId } = RemoveRosterParamsSchema.parse(req.params);

  await RosterItem.deleteOne({ userId, pokemonId });
  res.status(204).send();
};
