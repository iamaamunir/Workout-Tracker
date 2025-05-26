import { Request, Response, NextFunction } from "express";
import { WorkoutPlan } from "../services/planService";
import { CreatePlanRequest, EditPlanRequest } from "../dtos/plans.dto";
import { ResponseHandler } from "../utils/response";

export class WorkoutPlanController {
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
}
