import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

import { User } from "./entities/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  entities: [User],
  synchronize: true,
  logging: true,
});
