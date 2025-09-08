import { EntitySchema } from "typeorm";
import { UUID } from "../utils/types.js";
import { LocalityWithRelations } from "./locality.js";

export interface City {
  id: UUID;
  name: string;
  localityId: UUID;
}

export interface CityRelations {
  locality: LocalityWithRelations;
}

export type CityWithRelations = City & CityRelations;

export const CityEntity = new EntitySchema<CityWithRelations>({
  name: "cities",
  columns: {
    id: { type: "text", primary: true },
    name: { type: "text" },
    localityId: { type: "text" },
  },
  relations: {
    locality: {
      target: "localities",
      type: "many-to-one",
      inverseSide: "cities",
      joinColumn: {
        name: "localityId",
      },
    },
  },
});
