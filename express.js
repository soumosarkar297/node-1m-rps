import express from "express";
import crypto from "crypto";
import { DB } from "./database/index.js";
import { redis } from "./database/redis.js";

const app = express();

process.title = "node-express";

app.use(express.json({ limit: "1mb" }));

app.get(`/simple`, (req, res) => {
  res.json({ message: "hi" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
