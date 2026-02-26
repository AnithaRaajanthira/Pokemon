import express from "express";
import cors from "cors";
import { router } from "#routes";
import { errorHandler } from "#middlewares";
import "#db";

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL, // for use with credentials, origin(s) need to be specified
    credentials: true, // sends and receives secure cookies
    exposedHeaders: ["WWW-Authenticate"], // needed to send the 'refresh trigger''
  }),
);

app.use(express.json());

app.use(router);

app.use("/*splat", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler am Ende
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
