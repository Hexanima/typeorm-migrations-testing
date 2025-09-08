import "zx/globals";
import db from "../db.js";

echo("Running migrations...");
await db.initialize();
await db.runMigrations();
echo("Migrations executed successfully!");
