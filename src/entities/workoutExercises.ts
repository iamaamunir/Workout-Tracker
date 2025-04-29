import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
} from "typeorm";
import { Exercise } from "./exercises.ts";
import { WorkoutPlans } from "./workoutPlans.ts";

@Entity()
export class WorkoutExercise {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column({ type: "int" })
  sets!: number;

  @Column({ type: "int" })
  reps!: number;

  @Column({ type: "int", nullable: true })
  duration?: number;

  @Column({ type: "varchar", nullable: true })
  notes?: string;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutExercise, {
    onDelete: "CASCADE",
  })
  exercise!: Relation<Exercise>;

  @ManyToOne(
    () => WorkoutPlans,
    (workoutPlans) => workoutPlans.workoutExercise,
    {
      onDelete: "CASCADE",
    }
  )
  workoutPlans!: Relation<WorkoutPlans>;
}
