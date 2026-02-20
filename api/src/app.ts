import cors from "cors";
import express from "express";
import "#db";
import { errorHandler } from "#middlewares";
import { postRoutes } from "#routes";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/posts", postRoutes);
app.use("/*splat", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
