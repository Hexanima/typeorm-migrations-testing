import { MigrationInterface, QueryRunner } from "typeorm";

export class AddsPasswordToUserEntity1757087491027 implements MigrationInterface {
    name = 'AddsPasswordToUserEntity1757087491027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" text PRIMARY KEY NOT NULL, "fullName" text NOT NULL, "work" text NOT NULL, "password" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "fullName", "work") SELECT "id", "fullName", "work" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" text PRIMARY KEY NOT NULL, "fullName" text NOT NULL, "work" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "fullName", "work") SELECT "id", "fullName", "work" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
