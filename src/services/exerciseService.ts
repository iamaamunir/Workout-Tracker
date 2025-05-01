//TODO: GET REQUEST FOR ALL EXERCISE
//1 FIND IF THE USER IS AUTHORIZED BY COMPARING THE INCOMING ID FROM THE TOKEN

//2. IF THE USER IS AUTHORIZED, READ THE EXERCISE TABLE AND RETURN THE USER RELEVANT INFORMATION

//3. IF THE USER IS NOT AUTHORIZED, RETURN AN ERROR

import { jwtTokens } from "../utils/jwt";
import { User } from "../entities/user";
import { Exercise, ExerciseResponseDto } from "../entities/exercises";
import { AppDataSource } from "../data-source";
import { AppError } from "../utils/appError";

export class exerciseService {
  static async getAllExercise(
    req: any,
    next: any
  ): Promise<ExerciseResponseDto[]> {
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
      next(error);
    }
  }
}
