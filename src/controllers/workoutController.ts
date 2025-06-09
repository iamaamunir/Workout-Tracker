import { WorkoutExerciseService } from "../services/workoutExercise";
import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../utils/response";
import { WorkoutExerciseSchema } from "../dtos/workoutExercise.dto";

export class WorkoutController {
  static async createWorkoutExercise(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body;
      const exerciseId = req.params.exerciseId;
      const planId = req.params.planId;

      const validateData = WorkoutExerciseSchema.parse(data);

      const createdWorkoutExercise =
        await WorkoutExerciseService.createWorkoutExercise(
          validateData,
          exerciseId,
          planId,
          req
        );
      const response = new ResponseHandler(
        createdWorkoutExercise,
        "Workout exercise successfully created",
        201,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      next(error);
    }
  }
  static async getWorkoutDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const workoutId = req.params.workoutId;
      const workoutDetails = await WorkoutExerciseService.getWorkoutExercise(
        workoutId,
        req
      );

      const response = new ResponseHandler(
        workoutDetails,
        "Workout exercise details",
        200,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getWorkouts(req: Request, res: Response, next: NextFunction) {
    try {
      const workouts = await WorkoutExerciseService.getWorkouts(req);
      const response = new ResponseHandler(
        workouts,
        "Workout exercise details",
        200,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      const workoutId = req.params.workoutId;
      const payload = req.body;
      const updatedWorkout = await WorkoutExerciseService.updateWorkout(
        workoutId,
        payload,
        req
      );
      const response = new ResponseHandler(
        updatedWorkout,
        "Workout exercise details",
        204,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async deleteWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      const workoutId = req.params.workoutId;
      await WorkoutExerciseService.deleteWorkout(workoutId, req);
      const response = new ResponseHandler(
        null,
        "Workout exercise details",
        204,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      next(error);
    }
  }
}
