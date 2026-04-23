import pkg from "pg";
import keys from "./keys.js";

// Read PG_CONNECT env variable to see whether or not to connect to PostgreSQL
// If PG_CONNECT is set to "false", we skip the connection (useful for testing without a DB)
const shouldConnect = process.env.PG_CONNECT !== "false";

export const pool = shouldConnect
  ? new pkg.Pool({
      user: keys.dbUser,
      host: keys.dbHost,
      database: keys.dbDatabase,
      password: keys.dbPassword,
      port: keys.dbPort,
      ssl:
        process.env.NODE_ENV === "production"
          ? {
              rejectUnauthorized: false,
            }
          : false,
    })
  : null;

async function initDB() {
  while (true) {
    try {
      await pool.query("SELECT NOW()");
      console.log("[postgres] connected successfully to " + keys.dbDatabase);
      break;
    } catch (err) {
      console.error("[postgres] connection failed. Retrying...");
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

if (shouldConnect) {
  await initDB();
}

// For any general query
const query = (query, values) => {
  if (!shouldConnect) {
    console.warn("[postgres] Query attempted but DB connection is disabled.");
    return Promise.resolve([]);
  }

  return new Promise(function (resolve, reject) {
    pool.query(query, values, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    });
  });
};

export const DB = {
  query,
};
