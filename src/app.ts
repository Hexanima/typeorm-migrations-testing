import db from "./db.js";
import { User, UserEntity } from "./entities/user.js";

const entityManager = db.createEntityManager();

const result = await entityManager.find(UserEntity, {});
console.log(result)
