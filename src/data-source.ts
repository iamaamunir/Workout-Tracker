import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entities/user.ts";
dotenv.config();
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  entities: [__dirname + "/entities/*.{ts,js}"],
  // entities: [User],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
  synchronize: false,
  logging: true,
});

// await AppDataSource.query("DROP SCHEMA public CASCADE");