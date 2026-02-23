import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation error",
      issues: err.issues,
    });
  }

  // Mongo duplicate key error (unique index)
  if (err?.code === 11000) {
    return res.status(409).json({ error: "Already in roster" });
  }

  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
};
