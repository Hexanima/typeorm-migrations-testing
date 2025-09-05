import { cwd } from "process";
import path from "path"

export const DB_PATH = path.join(cwd(), "data", "db.sqlite");
export const MIGRATIONS_DIR = path.join(cwd(), "src","migrations");
