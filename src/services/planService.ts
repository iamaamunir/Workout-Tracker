import { WorkoutPlans } from "../entities/workoutPlans";
import { User } from "../entities/user";
import { CreatePlanRequestDto, CreatePlanResponseDto } from "../dtos/plans.dto";
import { AppDataSource } from "../data-source";
import { AppError } from "../utils/appError";
import { ZodError } from "zod";

export class WorkoutPlan {
  static async createPlan(
    payload: CreatePlanRequestDto,
    req: any
  ): Promise<CreatePlanResponseDto> {
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
        console.log(error)
        throw new AppError("Internal server error", 500, false, "error");
      }
      throw error;
    }
  }
}
