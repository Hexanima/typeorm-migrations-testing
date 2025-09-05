import { EntitySchema } from "typeorm";

export type UUID = `${string}-${string}-${string}${string}-${string}`;

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
