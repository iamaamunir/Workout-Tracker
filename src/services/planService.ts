import { WorkoutPlans } from "../entities/workoutPlans";
import { User } from "../entities/user";
import {
  CreatePlanRequestDto,
  PlanResponseDto,
  EditPlanRequestDto,
  EditPlanResponseDto,
} from "../dtos/plans.dto";
import { AppDataSource } from "../data-source";
import { AppError } from "../utils/appError";
import { ZodError } from "zod";

export class WorkoutPlan {
  static async createPlan(
    payload: CreatePlanRequestDto,
    req: any
  ): Promise<PlanResponseDto> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const planRepository = AppDataSource.getRepository(WorkoutPlans);
      const isAccount = await userRepository.findOneBy({ id: req.user.id });
      if (!isAccount) {
        throw new AppError(
          "User cannot access this route",
          401,
          true,
          "Unauthorized"
        );
      }
      const isAdmin = isAccount.role === "Admin";
      const planData = {
        name: payload.name,
        description: payload.description,
        goal: payload.goal,
        duration_in_weeks: payload.duration_in_weeks,
        difficulty: payload.difficulty,
        is_public: isAdmin ? true : payload.is_public ?? false,
        user: req.user.id,
        workoutExercise: undefined,
      };
      const newPlan = await planRepository.save(planData);
      return newPlan;
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
  static async updatePlan(
    payload: EditPlanRequestDto,
    req: any,
    id: string
  ): Promise<EditPlanResponseDto | any> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const planRepository = AppDataSource.getRepository(WorkoutPlans);
      const plan = await planRepository.findOneBy({ id: id });
      const isAccount = await userRepository.findOneBy({ id: req.user.id });
      if (!isAccount) {
        throw new AppError(
          "User cannot access this route",
          401,
          true,
          "Unauthorized"
        );
      }
      if (!plan) {
        throw new AppError("Plan does not exist", 404, true, "failed");
      }
      await planRepository.save({ ...plan, ...payload });
      const updatedPlan = await planRepository.findOneBy({ id: id });
      return updatedPlan;
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
