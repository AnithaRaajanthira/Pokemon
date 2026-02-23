import type { RequestHandler } from "express";

export const requireAuth: RequestHandler = (req, res, next) => {
  // Placeholder: später ersetzen
  const headerUserId = req.header("x-user-id");
  const devUserId = process.env.DEV_USER_ID;

  const userId = headerUserId ?? devUserId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized (missing x-user-id)" });
  }

  req.user = { id: userId };
  next();
};
