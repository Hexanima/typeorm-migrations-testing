import { DataSource } from "typeorm";
import path from "path";
import { cwd } from "process";
import { UserEntity } from "./entities/user.js";
import { UserEntity1757022351222 } from "./migrations/1757022351222-UserEntity.js";
import { ChangeNameToFullNameInUserEntity1757022493948 } from "./migrations/1757022493948-ChangeNameToFullNameInUserEntity.js";

export default new DataSource({
  type: "better-sqlite3",
  database: path.join(cwd(), "data", "db.sqlite"),
  enableWAL:true,
  entities: [UserEntity],
  migrations: [
    UserEntity1757022351222,
    ChangeNameToFullNameInUserEntity1757022493948,
  ],
});
