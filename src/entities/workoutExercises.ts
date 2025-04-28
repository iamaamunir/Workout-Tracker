import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Exercise } from "./exercises";
import { WorkoutPlans } from "./workoutPlans";
import { number } from "zod";

@Entity()
export class WorkoutExercise {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "number", nullable: false })
  sets!: number;

  @Column({ type: "number", nullable: false })
  reps!: number;

  @Column({ type: "number", nullable: true })
  duration?: number;

  @Column({ type: "varchar", nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToMany(() => Exercise, (exercise) => exercise.workoutExercise, {
    onDelete: "CASCADE",
  })
  exercise?: Exercise;

  @ManyToOne(
    () => WorkoutPlans,
    (workoutPlans) => workoutPlans.workoutExercise,
    { onDelete: "CASCADE" }
  )
  workoutPlans?: WorkoutPlans;
}
