import "zx/globals";
import db from "../db.js";
import { User, UserEntity } from "../entities/user.js";

const database = db.createEntityManager();

await spinner("Starting", async () => {
  await database.save(UserEntity, {
    id: "a-a-a-a-a",
    fullName: "Pepe",
    work: "Hola",
  } satisfies User);

  return await database.findOne(UserEntity, {});
});
