import { EntitySchema } from "typeorm";
import { UUID } from "../utils/types.js";

export interface User {
  id: UUID;
  fullName: string;
  work: string;
  hashedPassword: string;
}

export const UserEntity = new EntitySchema<User>({
  name: "users",
  columns: {
    id: {
      type: "text",
      primary: true,
    },
    fullName: {
      type: "text",
    },
    work: {
      type: "text",
    },
    hashedPassword: {
      type: "text",
    },
  },
});
