import "reflect-metadata";
import express from "express";
import authRouter from "../src/routes/authRoute";
const app = express();
app.use(express.json());

app.use("/api/v1", authRouter);

export default app;
