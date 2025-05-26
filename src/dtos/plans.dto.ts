import { z } from "zod";
import { Difficulty } from "../types/exercises";

export const CreatePlanRequest = z.object({
  name: z.string(),
  description: z.string(),
  goal: z.string(),
  duration_in_weeks: z.number(),
  difficulty: z.nativeEnum(Difficulty),
  is_public: z.boolean(),
  createdAt: z.date().optional(),
  user: z.string().optional(),
  workoutExercise: z.null().optional(),
});

export type CreatePlanRequestDto = z.infer<typeof CreatePlanRequest>;

export interface PlanResponseDto {
  name: string;
  description: string;
  goal: string;
  duration_in_weeks: number;
  difficulty: string;
  is_public: boolean;
  createdAt: Date;
  user: string;
  workoutExercise: undefined;
}

export const EditPlanRequest = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  goal: z.string().optional(),
  difficulty: z.nativeEnum(Difficulty).optional(),
  duration_in_weeks: z.number().optional(),
  is_public: z.boolean().optional(),
});

export interface PlanResponseDto {
  name: string;
  description: string;
  goal: string;
  duration_in_weeks: number;
  difficulty: string;
  is_public: boolean;
  createdAt: Date;
  user: string;
  workoutExercise: undefined;
}

export type EditPlanRequestDto = z.infer<typeof EditPlanRequest>;
export interface EditPlanResponseDto {
  name: string;
  description: string;
  goal: string;
  duration_in_weeks: number;
  difficulty: string;
  is_public: boolean;
  createdAt: Date;
  updatedAt: Date;
}
