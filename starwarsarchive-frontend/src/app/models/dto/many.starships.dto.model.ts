import {StarshipDto} from "./starship.dto.model";

export interface ManyStarshipsDto {
  count: number;
  next: string;
  previous: string;
  results: StarshipDto[];
}
