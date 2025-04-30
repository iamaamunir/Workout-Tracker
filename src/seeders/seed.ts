import pkg from "pg";
const { Pool } = pkg;
import * as fs from "fs";
import * as dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const databaseUrl = process.env.DB_URL;
const pool = new Pool({
  connectionString: databaseUrl,
});

if (process.env.NODE_ENV === "development") {
  const seedQuery = fs.readFileSync(__dirname + "/exercises.seed.sql", {
    encoding: "utf8",
  });
  pool.query(seedQuery, (err: Error, res: any) => {
    console.log(err, res);
    console.log("Seeding Completed!");
    pool.end();
  });
}
