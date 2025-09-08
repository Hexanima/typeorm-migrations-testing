import { MigrationInterface, QueryRunner } from "typeorm";

export class AddsProvinceLocalityAndCityEntities1757094303613 implements MigrationInterface {
    name = 'AddsProvinceLocalityAndCityEntities1757094303613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "provinces" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "localitiesId" text)`);
        await queryRunner.query(`CREATE TABLE "localities" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "provinceId" text NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "cities" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "localityId" text NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_provinces" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "localitiesId" text, CONSTRAINT "FK_0c686cedbf74ea534a575aba16f" FOREIGN KEY ("localitiesId") REFERENCES "localities" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_provinces"("id", "name", "localitiesId") SELECT "id", "name", "localitiesId" FROM "provinces"`);
        await queryRunner.query(`DROP TABLE "provinces"`);
        await queryRunner.query(`ALTER TABLE "temporary_provinces" RENAME TO "provinces"`);
        await queryRunner.query(`CREATE TABLE "temporary_localities" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "provinceId" text NOT NULL, CONSTRAINT "FK_bae9421fc8a0a8e06b2790bb24c" FOREIGN KEY ("provinceId") REFERENCES "provinces" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_localities"("id", "name", "provinceId") SELECT "id", "name", "provinceId" FROM "localities"`);
        await queryRunner.query(`DROP TABLE "localities"`);
        await queryRunner.query(`ALTER TABLE "temporary_localities" RENAME TO "localities"`);
        await queryRunner.query(`CREATE TABLE "temporary_cities" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "localityId" text NOT NULL, CONSTRAINT "FK_77fb04122a89f0c70b1c2fbe62c" FOREIGN KEY ("localityId") REFERENCES "localities" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_cities"("id", "name", "localityId") SELECT "id", "name", "localityId" FROM "cities"`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`ALTER TABLE "temporary_cities" RENAME TO "cities"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cities" RENAME TO "temporary_cities"`);
        await queryRunner.query(`CREATE TABLE "cities" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "localityId" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "cities"("id", "name", "localityId") SELECT "id", "name", "localityId" FROM "temporary_cities"`);
        await queryRunner.query(`DROP TABLE "temporary_cities"`);
        await queryRunner.query(`ALTER TABLE "localities" RENAME TO "temporary_localities"`);
        await queryRunner.query(`CREATE TABLE "localities" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "provinceId" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "localities"("id", "name", "provinceId") SELECT "id", "name", "provinceId" FROM "temporary_localities"`);
        await queryRunner.query(`DROP TABLE "temporary_localities"`);
        await queryRunner.query(`ALTER TABLE "provinces" RENAME TO "temporary_provinces"`);
        await queryRunner.query(`CREATE TABLE "provinces" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "localitiesId" text)`);
        await queryRunner.query(`INSERT INTO "provinces"("id", "name", "localitiesId") SELECT "id", "name", "localitiesId" FROM "temporary_provinces"`);
        await queryRunner.query(`DROP TABLE "temporary_provinces"`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`DROP TABLE "localities"`);
        await queryRunner.query(`DROP TABLE "provinces"`);
    }

}
