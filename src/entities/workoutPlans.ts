import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { WorkoutExercise } from "./workoutExercises";
import { Difficulty } from "../types/exercises";

@Entity()
export class WorkoutPlans {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "varchar", nullable: false })
  description!: string;

  @Column({ type: "varchar", nullable: true })
  goal?: string;

  @Column({ type: "number", nullable: true })
  duration_in_weeks?: number;

  @Column({ type: "enum", enum: Difficulty, default: Difficulty.BEGINNER })
  difficulty?: Difficulty;

  @Column({ type: "boolean", default: false, nullable: true })
  is_public?: boolean;

  @OneToOne(() => User, (user) => user.id)
  user?: User;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.workoutPlans
  )
  workoutExercise?: WorkoutExercise;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
