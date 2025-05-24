import { Response, Request, NextFunction } from "express";
import { exerciseService } from "../services/exerciseService";
import { ResponseHandler } from "../utils/response";
import {
  CreateExerciseRequest,
  UpdateExerciseRequest,
} from "../dtos/exercise.dto";

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
  static async createExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const validateData = CreateExerciseRequest.parse(body);
      const newExercise = await exerciseService.createExercise(
        validateData,
        req
      );
      const response = new ResponseHandler(
        newExercise,
        "Exercise successfully created",
        201,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      next(error);
    }
  }
  static async updateExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const exerciseId = req.params.id;
      const { createdAt, id, ...data } = req.body;
      const validateData = UpdateExerciseRequest.parse(data);
      const updatedExercise = await exerciseService.updateExercise(
        req,
        validateData,
        exerciseId
      );
      const response = new ResponseHandler(
        updatedExercise,
        "Exercise successfully updated",
        200,
        null,
        "success"
      );
      response.send(res);
    } catch (error) {
      next(error);
    }
  }
  static async deleteExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await exerciseService.deleteExercise(req, id);
      const response = new ResponseHandler(
        null,
        "Exercise successfully deleted",
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
