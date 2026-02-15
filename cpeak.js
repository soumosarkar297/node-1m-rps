import cpeak, { parseJSON } from "cpeak";
import crypto from "crypto";
import { DB } from "./database/index.js";
import { redis } from "./database/redis.js";

const app = cpeak();

process.title = "node-cpeak";

app.beforeEach(parseJSON({ limit: 1024 * 1024 }));

app.route("get", `/simple`, (req, res) => {
  res.json({ message: "hi" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Cpeak server running at http://localhost:${PORT}`);
});
