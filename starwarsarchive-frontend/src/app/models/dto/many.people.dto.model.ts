import {PeopleDto} from "./people.dto.model";

export interface ManyPeopleDto {
  count: number;
  next: string;
  previous: string;
  results: PeopleDto[];
}
