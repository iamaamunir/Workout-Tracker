import express from 'express'
import { exerciseController } from '../controllers/exerciseController'
import { authMiddleware } from '../middlewares/authMiddleware'
const exerciseRouter = express.Router()

exerciseRouter.get("/exercises", authMiddleware, exerciseController.getAllExercise)

export default exerciseRouter