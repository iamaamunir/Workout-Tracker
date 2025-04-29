import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExerciseTable1745920148422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."exercise_difficulty_enum" AS ENUM('Beginner', 'Intermediate', 'Advanced')`
    );
    await queryRunner.query(
      `CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "difficulty" "public"."exercise_difficulty_enum" NOT NULL DEFAULT 'Beginner', "duration" integer, "calorie_burned" integer, "media_url" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "exercise"`);
    await queryRunner.query(`DROP TYPE "public"."exercise_difficulty_enum"`);
  }
}
