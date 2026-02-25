import { Router } from "express";
import { authenticate } from "#middlewares";
import { addRosterItem, getRoster, removeRosterItem } from "#controllers";

export const rosterRouter = Router();

rosterRouter.use(authenticate);

rosterRouter.get("/", getRoster);
rosterRouter.post("/", addRosterItem);
rosterRouter.delete("/:pokemonId", removeRosterItem);
