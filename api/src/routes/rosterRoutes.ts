import { Router } from "express";
import { requireAuth } from "#middlewares";
import { addRosterItem, getRoster, removeRosterItem } from "#controllers";
import authenticate from "#middlewares/authentication";

const rosterRouter = Router();

rosterRouter.use(requireAuth);

rosterRouter.get("/", getRoster);
rosterRouter.post("/", authenticate, addRosterItem);
rosterRouter.delete("/:pokemonId", authenticate, removeRosterItem);
