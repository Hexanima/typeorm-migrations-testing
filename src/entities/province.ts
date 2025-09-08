import { EntitySchema } from "typeorm";
import { UUID } from "../utils/types.js";
import { CityWithRelations } from "./city.js";
import { LocalityWithRelations } from "./locality.js";

export interface Province {
  id: UUID;
  name: string;
}

export interface ProvinceRelations {
  localities: LocalityWithRelations[];
}

export type ProvinceWithRelations = Province & ProvinceRelations;

export const ProvinceEntity = new EntitySchema<ProvinceWithRelations>({
  name: "provinces",
  columns: {
    id: { type: "text", primary: true },
    name: { type: "text" },
  },
  relations: {
    localities: {
      type: "many-to-one",
      target: "localities",
      inverseSide: "province",
    },
  },
});
