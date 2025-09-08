import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user.js";
import { DB_PATH, MIGRATIONS_DIR } from "./constants.js";
import { readdir } from "fs/promises";
import path from "path";
import { ProvinceEntity } from "./entities/province.js";
import { LocalityEntity } from "./entities/locality.js";
import { CityEntity } from "./entities/city.js";

const migrationsFolder = (await readdir(MIGRATIONS_DIR)).filter((file) =>
  file.endsWith(".ts")
);

const migrations: Function[] = [];

for (const migrationFile of migrationsFolder) {
  const migrationModule = await import(
    `file://${path.join(MIGRATIONS_DIR, migrationFile)}`
  );
  const migrationClass: Function | undefined =
    migrationModule.default ||
    Object.values(migrationModule).find((v) => typeof v === "function");
  if (migrationClass) migrations.push(migrationClass);
}

const db = new DataSource({
  type: "better-sqlite3",
  database: DB_PATH,
  entities: [UserEntity, ProvinceEntity, LocalityEntity, CityEntity],
  migrations,
});

export default db;
