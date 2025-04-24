import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";

import { AppDataSource } from "../src/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () =>
      console.log("Server running on port 3000")
    );
  })
  .catch((error) => console.error("DB connection error:", error));


