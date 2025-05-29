//TODO: GET REQUEST FOR ALL EXERCISE
//1 FIND IF THE USER IS AUTHORIZED BY COMPARING THE INCOMING ID FROM THE TOKEN

//2. IF THE USER IS AUTHORIZED, READ THE EXERCISE TABLE AND RETURN THE USER RELEVANT INFORMATION

//3. IF THE USER IS NOT AUTHORIZED, RETURN AN ERROR

import { jwtTokens } from "../utils/jwt";
import { User } from "../entities/user";
import { Exercise } from "../entities/exercises";
import {
  ExerciseResponseDto,
  ExerciseRequestDto,
  UpdateExerciseRequestDto,
  UpdateExerciseResponseDto,
} from "../dtos/exercise.dto";
import { AppDataSource } from "../data-source";
import { AppError } from "../utils/appError";
import { Difficulty } from "../types/exercises";

export class exerciseService {
  static async getAllExercise(
    req: any,
    next: any
  ): Promise<ExerciseResponseDto[] | undefined> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const exerciseRepository = AppDataSource.getRepository(Exercise);
      const isAuthorized = await userRepository.findOneBy({ id: req.user.id });
      if (!isAuthorized) {
        throw new AppError(
          "User cannot access this route",
          401,
          true,
          "Unauthorized"
        );
      }
      const allExercises = await exerciseRepository.find();
      return allExercises;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Unexpected error during user registration:", error);
        throw new AppError("Internal server error", 500, false, "error");
      }
      throw error;
    }
  }

  static async createExercise(
    payload: ExerciseRequestDto,
    req: any
  ): Promise<ExerciseResponseDto | undefined> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const exerciseRepository = AppDataSource.getRepository(Exercise);
      const isAuthorized = await userRepository.findOneBy({ id: req.user.id });
      if (!isAuthorized) {
        throw new AppError(
          "User cannot access this route",
          401,
          true,
          "Unauthorized"
        );
      }
      const exerciseData = {
        name: payload.name,
        description: payload.description,
        category: payload.category,
        Difficulty: payload.difficulty,
        duration: payload.duration,
        calorie_burned: payload.calorie_burned,
        media_url: payload.media_url,
        createdAt: new Date(),
      };
      const newExercise = await exerciseRepository.save(exerciseData);
      return newExercise;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Unexpected error during user registration:", error);
        throw new AppError("Internal server error", 500, false, "error");
      }
      throw error;
    }
  }
  static async updateExercise(
    req: any,
    payload: UpdateExerciseRequestDto,
    id: string
  ): Promise<UpdateExerciseResponseDto | any> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const exerciseRepository = AppDataSource.getRepository(Exercise);
      const isAuthorized = await userRepository.findOneBy({ id: req.user.id });
      const exercise = await exerciseRepository.findOneBy({
        id: id,
      });
      if (!isAuthorized) {
        throw new AppError(
          "User cannot access this route",
          401,
          true,
          "Unauthorized"
        );
      }
      if (!exercise) {
        throw new AppError("Exercise does not exist", 404, true, "Not found");
      }

      await exerciseRepository.save({ ...exercise, ...payload });
      const updatedData = await exerciseRepository.findOneBy({
        id: id,
      });
      return updatedData;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Unexpected error during user registration:", error);
        throw new AppError("Internal server error", 500, false, "error");
      }
      throw error;
    }
  }
  static async deleteExercise(req: any, id: string): Promise<any> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const exerciseRepository = AppDataSource.getRepository(Exercise);
      const isAuthorized = await userRepository.findOneBy({ id: req.user.id });
      const exercise = await exerciseRepository.findOneBy({
        id: id,
      });
      if (!isAuthorized) {
        throw new AppError(
          "User cannot access this route",
          401,
          true,
          "Unauthorized"
        );
      }
      if (!exercise) {
        throw new AppError("Exercise does not exist", 404, true, "Not found");
      }
      await exerciseRepository.delete({ id: id });
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Unexpected error during user registration:", error);
        throw new AppError("Internal server error", 500, false, "error");
      }
      throw error;
    }
  }
}
