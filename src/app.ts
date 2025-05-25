import express, { ErrorRequestHandler } from "express";
import authRouter from "../src/routes/authRoute";
import exerciseRouter from "./routes/exerciseRoute";
import { errorHandler } from "./middlewares/errorMiddleware";
import workoutPlanRouter from "./routes/planRoute";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome Fitness Tracker",
  });
});
app.use("/api/v1", authRouter);
app.use("/api/v1", exerciseRouter);
app.use("/api/v1", workoutPlanRouter);

app.use(errorHandler as ErrorRequestHandler);

export default app;
