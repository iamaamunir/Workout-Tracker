import { User } from "../entities/user";
import { WorkoutExercise } from "../entities/workoutExercises";
import { WorkoutExerciseDto } from "../dtos/workoutExercise.dto";
import { AppDataSource } from "../data-source";
import { WorkoutPlans } from "../entities/workoutPlans";
import { Exercise } from "../entities/exercises";
import { AppError } from "../utils/appError";
import { ZodError } from "zod";

export class WorkoutExerciseService {
  static async createWorkoutExercise(
    payload: any,
    exerciseId: string | any,
    planId: string,
    req: any
  ): Promise<WorkoutExerciseDto | any> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const workoutRepository = AppDataSource.getRepository(WorkoutExercise);
      const planRepository = AppDataSource.getRepository(WorkoutPlans);
      const exerciseRepository = AppDataSource.getRepository(Exercise);
      const exercise = await exerciseRepository.findOneBy({ id: exerciseId });
      const plan = await planRepository.findOneBy({ id: planId });
      const isAccount = await userRepository.findOneBy({ id: req.user.id });
      if (!isAccount) {
        throw new AppError(
          "User cannot access this route",
          401,
          true,
          "Unauthorized"
        );
      }
      if (!exercise) {
        throw new AppError("Exercise not available", 400, true, "Not found");
      }
      if (!plan) {
        throw new AppError(
          "Workout plan not available",
          400,
          true,
          "Not found"
        );
      }
      const workoutData = {
        sets: payload.sets,
        reps: payload.reps,
        duration: payload.duration,
        notes: payload.notes,
        createdAt: new Date(),
        exercise: { id: exerciseId } as Exercise,
        workoutPlans: { id: planId } as WorkoutPlans,
      };
      const workout = await workoutRepository.save(workoutData);
      return workout;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Unexpected error during user registration:", error);
        throw new AppError("Internal server error", 500, false, "error");
      }
      if (error instanceof ZodError) {
        console.log(error);
        throw new AppError("Internal server error", 500, false, "error");
      }
      throw error;
    }
  }
}
