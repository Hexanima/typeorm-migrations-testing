import db from "./db.js";
import { UserEntity } from "./entities/user.js";

const queryBuilder = db.createQueryBuilder(UserEntity, "user");

const result = await queryBuilder.getOne()
