import express from "express";
import { WorkoutController } from "../controllers/workoutController";
import { authMiddleware } from "../middlewares/authMiddleware";

const workoutRouter = express.Router();

workoutRouter.post(
  "/workout/exercise/:exerciseId/plan/:planId",
  authMiddleware,
  WorkoutController.createWorkoutExercise
);
workoutRouter.get(
  "/workout/:workoutId",
  authMiddleware,
  WorkoutController.getWorkoutDetails
);

export default workoutRouter;
