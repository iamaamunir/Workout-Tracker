import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkoutExerciseTable1745920147181
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workout_exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sets" integer NOT NULL, "reps" integer NOT NULL, "duration" integer, "notes" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "exerciseId" uuid, "workoutPlansId" uuid, CONSTRAINT "PK_9598996a913c5f5114f9e6403b6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "workout_exercise" ADD CONSTRAINT "FK_a2ac7d92eeb9bd5fc2bb9896611" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "workout_exercise" ADD CONSTRAINT "FK_8a4dad402e75fb8496cef056e60" FOREIGN KEY ("workoutPlansId") REFERENCES "workout_plans"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_exercise" DROP CONSTRAINT "FK_8a4dad402e75fb8496cef056e60"`
    );
    await queryRunner.query(
      `ALTER TABLE "workout_exercise" DROP CONSTRAINT "FK_a2ac7d92eeb9bd5fc2bb9896611"`
    );
    await queryRunner.query(`DROP TABLE "workout_exercise"`);
  }
}
