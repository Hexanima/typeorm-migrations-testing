import { MigrationInterface, QueryRunner } from "typeorm";

export class UserChangesPasswordToHashedPassword1757088950868 implements MigrationInterface {
    name = 'UserChangesPasswordToHashedPassword1757088950868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" text PRIMARY KEY NOT NULL, "fullName" text NOT NULL, "work" text NOT NULL, "hashedPassword" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "fullName", "work", "hashedPassword") SELECT "id", "fullName", "work", "password" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" text PRIMARY KEY NOT NULL, "fullName" text NOT NULL, "work" text NOT NULL, "password" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "fullName", "work", "password") SELECT "id", "fullName", "work", "hashedPassword" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
