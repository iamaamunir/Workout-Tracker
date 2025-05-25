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

export interface CreatePlanResponseDto {
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
