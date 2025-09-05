import "zx/globals";
import db from "../db.js";

echo("Running migrations...");
await db.initialize();
await db.showMigrations();
await db.runMigrations();
echo("Migrations executed successfully!");
