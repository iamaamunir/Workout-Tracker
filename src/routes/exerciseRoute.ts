import express from "express";
import { exerciseController } from "../controllers/exerciseController";
import { authMiddleware } from "../middlewares/authMiddleware";
const exerciseRouter = express.Router();
import { adminMiddleware } from "../middlewares/adminMiddleware";

exerciseRouter.get(
  "/exercises",
  authMiddleware,
  adminMiddleware,
  exerciseController.getAllExercise
);

export default exerciseRouter;
