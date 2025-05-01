import { Response, Request, NextFunction } from "express";
import { exerciseService } from "../services/exerciseService";
import { ResponseHandler } from "../utils/response";

export class exerciseController {
  static async getAllExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const allExercises = await exerciseService.getAllExercise(req, next);
      const response = new ResponseHandler(
        allExercises,
        "All exercise successfully fetched",
        200,
        null, //TODO: PAGINATE THIS IN THE FUTURE WHEN DATA GROWS
        "success"
      );
      response.send(res);
    } catch (error) {
      next(error);
    }
  }
}
