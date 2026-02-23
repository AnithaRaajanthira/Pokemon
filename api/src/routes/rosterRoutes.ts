import { Router } from "express";
import { requireAuth } from "#middlewares";
import { addRosterItem, getRoster, removeRosterItem } from "#controllers";

export const rosterRouter = Router();

rosterRouter.use(requireAuth);

rosterRouter.get("/", getRoster);
rosterRouter.post("/", addRosterItem);
rosterRouter.delete("/:pokemonId", removeRosterItem);
