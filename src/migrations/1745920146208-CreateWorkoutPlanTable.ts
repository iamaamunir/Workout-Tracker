import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkoutPlanTable1745920146208 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."workout_plans_difficulty_enum" AS ENUM('Beginner', 'Intermediate', 'Advanced')`
    );
    await queryRunner.query(
      `CREATE TABLE "workout_plans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "goal" character varying, "duration_in_weeks" integer, "difficulty" "public"."workout_plans_difficulty_enum" NOT NULL DEFAULT 'Beginner', "is_public" boolean DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_9ae1bdd02db446a7541e2e5b161" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "workout_plans" ADD CONSTRAINT "FK_ff2ee5d107dfa46fbafa59d316e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_plans" DROP CONSTRAINT "FK_ff2ee5d107dfa46fbafa59d316e"`
    );
    await queryRunner.query(`DROP TABLE "workout_plans"`);
    await queryRunner.query(
      `DROP TYPE "public"."workout_plans_difficulty_enum"`
    );
  }
}
