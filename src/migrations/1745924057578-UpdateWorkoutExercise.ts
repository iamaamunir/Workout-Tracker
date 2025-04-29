import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWorkoutExercise1745924057578 implements MigrationInterface {
    name = 'UpdateWorkoutExercise1745924057578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "refreshToken" character varying array, "phone" character varying NOT NULL, "country" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."exercise_difficulty_enum" AS ENUM('Beginner', 'Intermediate', 'Advanced')`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "difficulty" "public"."exercise_difficulty_enum" NOT NULL DEFAULT 'Beginner', "duration" integer, "calorie_burned" integer, "media_url" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout_exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sets" integer NOT NULL, "reps" integer NOT NULL, "duration" integer, "notes" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "exerciseId" uuid, "workoutPlansId" uuid, CONSTRAINT "PK_9598996a913c5f5114f9e6403b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."workout_plans_difficulty_enum" AS ENUM('Beginner', 'Intermediate', 'Advanced')`);
        await queryRunner.query(`CREATE TABLE "workout_plans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "goal" character varying, "duration_in_weeks" integer, "difficulty" "public"."workout_plans_difficulty_enum" NOT NULL DEFAULT 'Beginner', "is_public" boolean DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_9ae1bdd02db446a7541e2e5b161" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workout_exercise" ADD CONSTRAINT "FK_a2ac7d92eeb9bd5fc2bb9896611" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_exercise" ADD CONSTRAINT "FK_8a4dad402e75fb8496cef056e60" FOREIGN KEY ("workoutPlansId") REFERENCES "workout_plans"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_plans" ADD CONSTRAINT "FK_ff2ee5d107dfa46fbafa59d316e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_plans" DROP CONSTRAINT "FK_ff2ee5d107dfa46fbafa59d316e"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise" DROP CONSTRAINT "FK_8a4dad402e75fb8496cef056e60"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise" DROP CONSTRAINT "FK_a2ac7d92eeb9bd5fc2bb9896611"`);
        await queryRunner.query(`DROP TABLE "workout_plans"`);
        await queryRunner.query(`DROP TYPE "public"."workout_plans_difficulty_enum"`);
        await queryRunner.query(`DROP TABLE "workout_exercise"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TYPE "public"."exercise_difficulty_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
