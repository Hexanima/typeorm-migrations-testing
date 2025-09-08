import db from "./db.js";
import { ProvinceEntity } from "./entities/province.js";
import { UserEntity } from "./entities/user.js";
await db.initialize();
const entityManager = db.createEntityManager();

const result = await entityManager.find(UserEntity, {});
console.log(result);

const typeTesting = await entityManager.find(ProvinceEntity, {
  where: {
    localities: {},
  },
});

console.log(typeTesting);
