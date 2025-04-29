import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from "typeorm";
import { User } from "./user.ts";
import { WorkoutExercise } from "./workoutExercises.ts";
import { Difficulty } from "../types/exercises.ts";

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

  @Column({ type: "int", nullable: true })
  duration_in_weeks?: number;

  @Column({ type: "enum", enum: Difficulty, default: Difficulty.BEGINNER })
  difficulty?: Difficulty;

  @Column({ type: "boolean", default: false, nullable: true })
  is_public?: boolean;

  @ManyToOne(() => User, (user) => user.workoutPlans)
  user?: Relation<User>;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.workoutPlans
  )
  workoutExercise?: Relation<WorkoutExercise[]>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
