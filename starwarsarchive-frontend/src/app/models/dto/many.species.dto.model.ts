import {SpeciesDto} from "./species.dto.model";

export interface ManySpeciesDto {
  count: number;
  next: string;
  previous: string;
  results: SpeciesDto[];
}
