import { z } from "zod";
import { Difficulty } from "../types/exercises.ts";

export const CreateExerciseRequest = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  difficulty: z.nativeEnum(Difficulty),
  media_url: z.string(),
  createdAt: z.date().optional(),
  duration: z.number(),
  calorie_burned: z.number(),
});

export const UpdateExerciseRequest = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  difficulty: z.nativeEnum(Difficulty).optional(),
  media_url: z.string().optional(),
  duration: z.number().optional(),
  calorie_burned: z.number().optional(),
});

export interface ExerciseResponseDto {
  id: string;
  name: string;
  difficulty?: Difficulty;
  duration?: number;
  calorie_burned?: number;
  media_url?: string;
  createdAt: Date;
  updatedAt?: Date;
}
// export interface ExerciseListResponseDto {
//   exercises: ExerciseResponseDto[];
// }

export interface ExerciseRequestDto {
  name: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  calorie_burned: number;
  media_url: string;
  createdAt?: Date;
  duration: number;
}

export interface UpdateExerciseResponseDto {
  id: string;
  name: string;
  difficulty?: Difficulty;
  duration?: number;
  calorie_burned?: number;
  media_url?: string;
  createdAt: Date;
  updatedAt?: Date;
  UpdateResult: any;
}

export type UpdateExerciseRequestDto = z.infer<typeof UpdateExerciseRequest>;
