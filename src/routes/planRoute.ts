import express from "express";
import { WorkoutPlanController } from "../controllers/planController";
import { authMiddleware } from "../middlewares/authMiddleware";
const workoutPlanRouter = express.Router();
workoutPlanRouter.post(
  "/plan",
  authMiddleware,
  WorkoutPlanController.createPlan
);
export default workoutPlanRouter;
