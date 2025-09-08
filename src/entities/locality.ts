import { EntitySchema } from "typeorm";
import { UUID } from "../utils/types.js";
import { ProvinceWithRelations } from "./province.js";
import { CityWithRelations } from "./city.js";

export interface Locality {
  id: UUID;
  name: string;
  provinceId: UUID;
}

export interface LocalityRelations {
  province: ProvinceWithRelations;
  cities: CityWithRelations[];
}

export type LocalityWithRelations = Locality & LocalityRelations;

export const LocalityEntity = new EntitySchema<LocalityWithRelations>({
  name: "localities",
  columns: {
    id: { type: "text", primary: true },
    name: { type: "text" },
    provinceId: { type: "text" },
  },
  relations: {
    province: {
      type: "many-to-one",
      joinColumn: {
        name: "provinceId",
      },
      target: "provinces",
      inverseSide: "localities",
    },
    cities: {
      type: "one-to-many",
      target: "cities",
      inverseSide: "locality",
    },
  },
});
