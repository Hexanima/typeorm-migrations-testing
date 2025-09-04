import { DataSource, EntitySchema } from "typeorm";
import path from "path";
import { cwd } from "process";

type UUID = `${string}-${string}-${string}${string}-${string}`;

interface User {
  id: UUID;
  name: string;
  work: string;
}

const UserEntity = new EntitySchema<User>({
  name: "users",
  columns: {
    id: {
      type: "text",
      primary: true,
    },
    name: {
        type: "text"
    },
    work: {
        type: "text"
    }
  },
});

const db = new DataSource({
  type: "better-sqlite3",
  database: path.join(cwd(), "data", "db.sqlite"),
  entities: [UserEntity],
  migrations: [],
});
