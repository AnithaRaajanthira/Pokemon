import { type ErrorRequestHandler } from "express";
type ErrorPayload = {
  message: string;
  code?: string;
};

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  process.env.NODE_ENV !== "production" && console.error(err.stack);
  if (err instanceof Error) {
    const payload: ErrorPayload = { message: err.message };
    if (err.cause) {
      const cause = err.cause as { status: number; code?: string };
      if (cause.code === "ACCESS_TOKEN_EXPIRED") res.setHeader("WWW-Authenticate", 'Bearer error="token_expired", error_description="The access token expired"');
      res.status(cause?.status ?? 500).json(payload);
      return;
    }
    res.status(500).json(payload);
    return;
  }
  res.status(500).json({ message: "Internal server error" });
  return;
};

export { errorHandler };
