import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1757022351222 implements MigrationInterface {
    name = 'UserEntity1757022351222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "work" text NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
