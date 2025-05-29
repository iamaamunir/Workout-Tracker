import { z } from "zod";
import { Exercise } from "../entities/exercises";
import { WorkoutPlan } from "../services/planService";

export const WorkoutExerciseSchema = z.object({
  id: z.string().optional(),
  sets: z.number(),
  reps: z.number(),
  duration: z.number(),
  notes: z.string().optional(),
  createdAt: z.date().optional(),
  exercise: z.string().optional(),
  workoutPlans: z.string().optional(),
});



export  interface WorkoutExerciseDto{
  id?: string;
  sets: number;
  reps: number;
  duration: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  exercise?: Exercise;
  workoutPlans?: WorkoutPlan;
}
