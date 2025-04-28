import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { WorkoutExercise } from "./workoutExercises";
import { Difficulty } from "../types/exercises";

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

  @Column({ type: "number", nullable: true })
  duration?: number;

  @Column({ type: "number", nullable: true })
  calorie_burned?: number;

  @Column({ type: "varchar", nullable: true })
  media_url?: string;

  @OneToMany(() => WorkoutExercise, (workoutExercise) => workoutExercise.exercise)
  workoutExercise?: WorkoutExercise;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
