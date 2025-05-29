import express from "express";
import { WorkoutPlanController } from "../controllers/planController";
import { authMiddleware } from "../middlewares/authMiddleware";
const workoutPlanRouter = express.Router();

workoutPlanRouter.get("/plans", authMiddleware, WorkoutPlanController.getPlans);

workoutPlanRouter.post(
  "/plan",
  authMiddleware,
  WorkoutPlanController.createPlan
);
workoutPlanRouter.patch(
  "/plan/:id",
  authMiddleware,
  WorkoutPlanController.updatePlan
);
workoutPlanRouter.delete(
  "/plan/:id",
  authMiddleware,
  WorkoutPlanController.deletePlan
);

workoutPlanRouter.get(
  "/plan/:id",
  authMiddleware,
  WorkoutPlanController.getPlan
);
workoutPlanRouter.post(
  "/plan/:planId/workout-exercise/:workoutExerciseId",
  authMiddleware,
  WorkoutPlanController.addWorkoutExerciseToPlan
);
export default workoutPlanRouter;
