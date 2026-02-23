import { Router } from "express";
import { rosterRouter } from "./rosterRoutes.ts";

export const router = Router();

router.get("/health", (_req, res) => res.json({ ok: true }));

router.use("/api/roster", rosterRouter);
