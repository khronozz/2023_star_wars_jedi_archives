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
import {FilmDto} from "../models/dto/film.dto.model";
import {PeopleDto} from "../models/dto/people.dto.model";
import {StarshipDto} from "../models/dto/starship.dto.model";
import {ManyFilmsDto} from "../models/dto/many.films.dto.model";
import {ManyPeopleDto} from "../models/dto/many.people.dto.model";
import {PlanetDto} from "../models/dto/planet.dto.model";
import {ManyPlanetsDto} from "../models/dto/many.planets.dto.model";
import {SpeciesDto} from "../models/dto/species.dto.model";
import {ManySpeciesDto} from "../models/dto/many.species.dto.model";
import {ManyStarshipsDto} from "../models/dto/many.starships.dto.model";
import {VehicleDto} from "../models/dto/vehicle.dto.model";
import {ManyVehiclesDto} from "../models/dto/many.vehicles.dto.model";

@Injectable({
  providedIn: 'root'
})
export class ArchivesService {

  // The url of the API
  private readonly url: string = 'http://localhost:8080/api/';

  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Get a film by its id
   * @param id
   */
  getFilm(id: number): Observable<FilmDto> {
    return this.http.get<FilmDto>(this.url + 'films/' + id);
  }

  /**
   * Get all the films
   */
  getAllFilms(): Observable<ManyFilmsDto> {
    return this.http.get<ManyFilmsDto>(this.url + 'films').pipe(
      map(films => {
        films.results.sort((a, b) => Number(a.episode_id) - Number(b.episode_id));
        return films;
      }));
  }

  /**
   * Get a character by its id
   * @param id
   */
  getPeople(id: number): Observable<PeopleDto> {
    return this.http.get<PeopleDto>(this.url + 'people/' + id);
  }

  /**
   * Get all the characters
   */
  getAllPeople(): Observable<ManyPeopleDto> {
    return this.http.get<ManyPeopleDto>(this.url + 'people').pipe(
      map(people => {
        people.results.sort((a, b) => a.name.localeCompare(b.name));
        return people;
      }));
  }

  /**
   * Get a planet by its id
   * @param id
   */
  getPlanet(id: number): Observable<PlanetDto> {
    return this.http.get<PlanetDto>(this.url + 'planets/' + id);
  }

  /**
   * Get all the planets
   */
  getAllPlanets(): Observable<ManyPlanetsDto> {
    return this.http.get<ManyPlanetsDto>(this.url + 'planets').pipe(
      map(planets => {
        planets.results.sort((a, b) => a.name.localeCompare(b.name));
        return planets;
      }));
  }

  /**
   * Get a species by its id
   * @param id
   */
  getSpecies(id: number): Observable<SpeciesDto> {
    return this.http.get<SpeciesDto>(this.url + 'species/' + id);
  }

  /**
   * Get all the species
   */
  getAllSpecies(): Observable<ManySpeciesDto> {
    return this.http.get<ManySpeciesDto>(this.url + 'species').pipe(
      map(species => {
        species.results.sort((a, b) => a.name.localeCompare(b.name));
        return species;
      }));
  }

  /**
   * Get a starship by its id
   * @param id
   */
  getStarship(id: number): Observable<StarshipDto> {
    return this.http.get<StarshipDto>(this.url + 'starships/' + id);
  }

  /**
   * Get all the starships
   */
  getAllStarships(): Observable<ManyStarshipsDto> {
    return this.http.get<ManyStarshipsDto>(this.url + 'starships').pipe(
      map(starships => {
        starships.results.sort((a, b) => a.name.localeCompare(b.name));
        return starships;
      }));
  }

  /**
   * Get a vehicle by its id
   * @param id
   */
  getVehicle(id: number): Observable<VehicleDto> {
    return this.http.get<VehicleDto>(this.url + 'vehicles/' + id);
  }

  /**
   * Get all the vehicles
   */
  getAllVehicles(): Observable<ManyVehiclesDto> {
    return this.http.get<ManyVehiclesDto>(this.url + 'vehicles').pipe(
      map(vehicles => {
        vehicles.results.sort((a, b) => a.name.localeCompare(b.name));
        return vehicles;
      }));
  }
}
