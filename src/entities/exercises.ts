import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Relation,
} from "typeorm";
import { WorkoutExercise } from "./workoutExercises.ts";
import { Difficulty } from "../types/exercises.ts";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "varchar", nullable: false })
  description!: string;

  @Column({ type: "varchar", nullable: false })
  category!: string;

  @Column({ type: "enum", enum: Difficulty, default: Difficulty.BEGINNER })
  difficulty?: Difficulty;

  @Column({ type: "int", nullable: true })
  duration?: number;

  @Column({ type: "int", nullable: true })
  calorie_burned?: number;

  @Column({ type: "varchar", nullable: true })
  media_url?: string;

  // @OneToMany(
  //   () => WorkoutExercise,
  //   (workoutExercise) => workoutExercise.exercise
  // )
  // workoutExercise?: WorkoutExercise;
  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.exercise
  )
  workoutExercise?: Relation<WorkoutExercise[]>;
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
