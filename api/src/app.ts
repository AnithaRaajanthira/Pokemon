import express from "express";
import cors from "cors";
import { router } from "#routes";
import { errorHandler } from "#middlewares";
import "#db";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? true,
    credentials: true,
  }),
);

app.use(express.json());

app.use(router);

// Error handler am Ende
app.use(errorHandler);

const port = Number(process.env.PORT ?? 3001);

// await connectDb();

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
