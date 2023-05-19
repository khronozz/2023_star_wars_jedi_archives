import {FilmDto} from "./film.dto.model";

export interface ManyFilmsDto {
  count: number;
  next: string;
  previous: string;
  results: FilmDto[];
}
