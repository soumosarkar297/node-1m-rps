import Fastify from "fastify";
import crypto from "crypto";
import { DB } from "./database/index.js";
import { redis } from "./database/redis.js";

const app = Fastify({ bodyLimit: 1024 * 1024 });

process.title = "node-fastify";

app.get(`/simple`, (req, res) => {
  res.send({ message: "hi" });
});

const PORT = 3002;
app.listen({ port: PORT, host: "0.0.0.0" }, () => {
  console.log(`Fastify server running at http://localhost:${PORT}`);
});
