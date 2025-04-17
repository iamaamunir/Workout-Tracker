import "reflect-metadata";
import app from "./app";

import { AppDataSource } from "../src/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to DB 🎉");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((error) => console.error("DB connection error:", error));
