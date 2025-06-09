import { User } from "../entities/user";
import { WorkoutExercise } from "../entities/workoutExercises";
import {
  WorkoutExerciseDto,
  GetWorkoutExerciseDto,
} from "../dtos/workoutExercise.dto";
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

  static async getWorkoutExercise(
    workoutId: string,
    req: any
  ): Promise<GetWorkoutExerciseDto | any> {
    try {
      const workoutRepo = AppDataSource.getRepository(WorkoutExercise);
      const userRepository = AppDataSource.getRepository(User);
      const planRepository = AppDataSource.getRepository(WorkoutPlans);
      const exerciseRepository = AppDataSource.getRepository(Exercise);
      const isAccount = await userRepository.findOneBy({ id: req.user.id });
      if (!isAccount) {
        throw new AppError(
          "User cannot access this route",
          401,
          true,
          "Unauthorized"
        );
      }
      const workout = await workoutRepo.findOne({
        where: { id: workoutId },
        relations: ["workoutPlans", "exercise"],
      });

      if (!workout) {
        throw new AppError("workout not available", 400, true, "Not found");
      }
      const plan = await planRepository.findOneBy({
        id: workout.workoutPlans.id,
      });

      const exercise = await exerciseRepository.findOneBy({
        id: workout.exercise.id,
      });

      const data = {
        id: workout.id,
        sets: workout.sets,
        reps: workout.reps,
        duration: workout.duration,
        notes: workout.notes,
        createdAt: workout.createdAt,
        exercise: {
          name: exercise?.name,
          category: exercise?.category,
          difficulty: exercise?.difficulty,
          media_url: exercise?.media_url,
          calorie_burned: exercise?.calorie_burned,
        },
        plan: {
          difficulty: plan?.difficulty,
          name: plan?.name,
          duration_in_weeks: plan?.duration_in_weeks,
        },
      };
      // console.log(data);
      return data;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Unexpected error during user registration:", error);
        throw new AppError("Internal server error", 500, false, "error");
      }
    }
  }
  static async getWorkouts(req: any): Promise<GetWorkoutExerciseDto[]> {
    try {
      const workoutRepo = AppDataSource.getRepository(WorkoutExercise);
      const userRepository = AppDataSource.getRepository(User);
      const isAccount = await userRepository.findOneBy({ id: req.user.id });
      if (!isAccount) {
        throw new AppError(
          "User cannot access this route",
          401,
          true,
          "Unauthorized"
        );
      }
      const workouts = await workoutRepo.find({
        relations: ["exercise", "workoutPlans"],
      });

      const data: GetWorkoutExerciseDto[] = workouts.map((workout) => ({
        id: workout.id,
        sets: workout.sets,
        reps: workout.reps,
        duration: workout.duration!,
        notes: workout.notes,
        createdAt: workout.createdAt,
        exerciseName: workout.exercise.name,
        exerciseCategory: workout.exercise.category,
        exerciseDifficulty: workout.exercise.difficulty!,
        media_url: workout.exercise.media_url!,
        calorie_burned: workout.exercise.calorie_burned!,
        planName: workout.workoutPlans.name,
        planDifficulty: workout.workoutPlans.difficulty!,
        plan_duration_in_weeks: workout.workoutPlans.duration_in_weeks!,
      }));
      return data;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Unexpected error during user registration:", error);
        throw new AppError("Internal server error", 500, false, "error");
      }
      throw error;
    }
  }
  static async updateWorkout(
    workoutId: string,
    payload: any,
    req: any
  ): Promise<any> {
    try {
      const workoutRepo = AppDataSource.getRepository(WorkoutExercise);
      const userRepository = AppDataSource.getRepository(User);
      const isAccount = await userRepository.findOneBy({ id: req.user.id });
      if (!isAccount) {
        throw new AppError(
          "User cannot access this route",
          401,
          true,
          "Unauthorized"
        );
      }
      const workout = await workoutRepo.findOne({
        where: { id: workoutId },
        relations: ["workoutPlans", "exercise"],
      });
      if (!workout) {
        throw new AppError("workout not available", 400, true, "Not found");
      }
      await workoutRepo.save({ ...workout, ...payload });
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Unexpected error during user registration:", error);
        throw new AppError("Internal server error", 500, false, "error");
      }
    }
  }
  static async deleteWorkout(workoutId: string, req: any): Promise<any> {
    try {
      const workoutRepo = AppDataSource.getRepository(WorkoutExercise);
      const userRepository = AppDataSource.getRepository(User);
      const isAccount = await userRepository.findOneBy({ id: req.user.id });
      if (!isAccount) {
        throw new AppError(
          "User cannot access this route",
          401,
          true,
          "Unauthorized"
        );
      }
      const workout = await workoutRepo.findOne({
        where: { id: workoutId },
        relations: ["workoutPlans", "exercise"],
      });
      if (!workout) {
        throw new AppError("workout not available", 400, true, "Not found");
      }
      await workoutRepo.delete({ id: workoutId });
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error("Unexpected error during user registration:", error);
        throw new AppError("Internal server error", 500, false, "error");
      }
    }
  }
}
