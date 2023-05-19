import {PlanetDto} from "./planet.dto.model";


export interface ManyPlanetsDto {
  count: number;
  next: string;
  previous: string;
  results: PlanetDto[];
}
