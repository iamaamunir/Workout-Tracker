import { Request, Response, NextFunction } from "express";
import { WorkoutPlan } from "../services/planService";
import { CreatePlanRequest, EditPlanRequest } from "../dtos/plans.dto";
import { ResponseHandler } from "../utils/response";

export class WorkoutPlanController {
  static async getPlans(req: Request, res: Response, next: NextFunction) {
    try {
      const allPlans = await WorkoutPlan.getPlans(req);
      const response = new ResponseHandler(
        allPlans,
        "All plans successfully fetched",
        200,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      next(error);
    }
  }

  static async getPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const plan = await WorkoutPlan.getPlan(id, req);
      const response = new ResponseHandler(
        plan,
        "Plan successfully fetched",
        200,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      next(error);
    }
  }

  static async createPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const validateData = CreatePlanRequest.parse(req.body);
      const createdPlan = await WorkoutPlan.createPlan(validateData, req);
      const response = new ResponseHandler(
        createdPlan,
        "Workout plan successfully created",
        201,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      next(error);
    }
  }
  static async updatePlan(req: Request, res: Response, next: NextFunction) {
    try {
      const planId = req.params.id;
      const { createdAt, id, ...data } = req.body;
      const validateData = EditPlanRequest.parse(data);
      const updatedPlan = await WorkoutPlan.updatePlan(
        validateData,
        req,
        planId
      );
      const response = new ResponseHandler(
        updatedPlan,
        "Workout plan successfully updated",
        201,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      next(error);
    }
  }
  static async deletePlan(req: Request, res: Response, next: NextFunction) {
    try {
      const planId = req.params.id;
      const updatedPlan = await WorkoutPlan.deletePlan(planId, req);
      const response = new ResponseHandler(
        updatedPlan,
        "Workout plan successfully updated",
        204,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      next(error);
    }
  }

  static async addWorkoutExerciseToPlan(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const workoutExerciseId = req.params.workoutExerciseId;
      const planId = req.params.planId;
      const addWorkoutExercise = await WorkoutPlan.addWorkoutExercise(
        workoutExerciseId,
        planId,
        req
      );
      const response = new ResponseHandler(
        addWorkoutExercise,
        "Workout exercise successfully added",
        200,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      next(error)
    }
  }
}
