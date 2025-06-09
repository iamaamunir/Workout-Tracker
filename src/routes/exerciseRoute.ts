import express from "express";
import { exerciseController } from "../controllers/exerciseController";
import { authMiddleware } from "../middlewares/authMiddleware";
const exerciseRouter = express.Router();
import { adminMiddleware } from "../middlewares/adminMiddleware";

exerciseRouter.get(
  "/exercises",
  authMiddleware,
  exerciseController.getAllExercise
);

exerciseRouter.post(
  "/exercise",
  authMiddleware,
  adminMiddleware,
  exerciseController.createExercise
);

exerciseRouter.patch(
  "/exercise/:id",
  authMiddleware,
  adminMiddleware,
  exerciseController.updateExercise
);

exerciseRouter.delete(
  "/exercise/:id",
  authMiddleware,
  adminMiddleware,
  exerciseController.deleteExercise
);

export default exerciseRouter;
