import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNameToFullNameInUserEntity1757022493948 implements MigrationInterface {
    name = 'ChangeNameToFullNameInUserEntity1757022493948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" text PRIMARY KEY NOT NULL, "fullName" text NOT NULL, "work" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "fullName", "work") SELECT "id", "name", "work" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "work" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "work") SELECT "id", "fullName", "work" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
