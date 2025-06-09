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

workoutRouter.get("/workouts", authMiddleware, WorkoutController.getWorkouts);
workoutRouter.patch(
  "/workout/:workoutId",
  authMiddleware,
  WorkoutController.updateWorkout
);

workoutRouter.delete(
  "/workout/:workoutId",
  authMiddleware,
  WorkoutController.deleteWorkout
);
export default workoutRouter;
