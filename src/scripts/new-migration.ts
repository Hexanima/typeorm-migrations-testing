import "zx/globals";
import { MIGRATIONS_DIR } from "../constants.js";

let newMigrationName: string = argv._[0] as string;

if (!newMigrationName || !Number.isNaN(Number(newMigrationName))) {
  do {
    newMigrationName = await question(
      "Enter the new migration's name (no numbers): "
    );
  } while (!newMigrationName || !Number.isNaN(Number(newMigrationName)));
}

echo("Running previous migrations...");
await $`yarn migrate`;
echo(`Creating migration ${newMigrationName}...`);
await $`yarn typeorm migration:generate ${MIGRATIONS_DIR}/${newMigrationName} -d src/db.ts`;
echo("Migration created");
echo("Running migrations...");
await $`yarn migrate`;
echo("Migrations correctly executed!");
