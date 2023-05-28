/**
 * Copyright 2023 Nicolas Favre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * archives.service.ts
 * The service that will be used to get the data from the API.
 *
 * @author Nicolas Favre
 * @date 18.05.2023
 * @version 1.0.0
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ManyFilmsDto} from "../models/dto/many.films.dto.model";
import {ManyPeopleDto} from "../models/dto/many.people.dto.model";
import {ManyPlanetsDto} from "../models/dto/many.planets.dto.model";
import {ManySpeciesDto} from "../models/dto/many.species.dto.model";
import {ManyStarshipsDto} from "../models/dto/many.starships.dto.model";
import {ManyVehiclesDto} from "../models/dto/many.vehicles.dto.model";

@Injectable({
  providedIn: 'root'
})
export class ArchivesService {

  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Get all the films
   */
  getAllFilms(): Observable<ManyFilmsDto> {
    return this.http.get<ManyFilmsDto>('films').pipe(
      map(films => {
        films.results.sort((a, b) => Number(a.episode_id) - Number(b.episode_id));
        return films;
      }));
  }

  /**
   * Get all the characters
   */
  getAllPeople(): Observable<ManyPeopleDto> {
    return this.http.get<ManyPeopleDto>('people').pipe(
      map(people => {
        people.results.sort((a, b) => a.name.localeCompare(b.name));
        return people;
      }));
  }

  /**
   * Get all the planets
   */
  getAllPlanets(): Observable<ManyPlanetsDto> {
    return this.http.get<ManyPlanetsDto>('planets').pipe(
      map(planets => {
        planets.results.sort((a, b) => a.name.localeCompare(b.name));
        return planets;
      }));
  }

  /**
   * Get all the species
   */
  getAllSpecies(): Observable<ManySpeciesDto> {
    return this.http.get<ManySpeciesDto>('species').pipe(
      map(species => {
        species.results.sort((a, b) => a.name.localeCompare(b.name));
        return species;
      }));
  }

  /**
   * Get all the starships
   */
  getAllStarships(): Observable<ManyStarshipsDto> {
    return this.http.get<ManyStarshipsDto>('starships').pipe(
      map(starships => {
        starships.results.sort((a, b) => a.name.localeCompare(b.name));
        return starships;
      }));
  }

  /**
   * Get all the vehicles
   */
  getAllVehicles(): Observable<ManyVehiclesDto> {
    return this.http.get<ManyVehiclesDto>('vehicles').pipe(
      map(vehicles => {
        vehicles.results.sort((a, b) => a.name.localeCompare(b.name));
        return vehicles;
      }));
  }
}
