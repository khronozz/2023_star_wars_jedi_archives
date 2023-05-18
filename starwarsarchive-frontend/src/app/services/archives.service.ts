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

  private readonly url: string = 'http://localhost:8080/api/';

  constructor(
    private http: HttpClient,
  ) {
  }

  getFilm(id: number): Observable<FilmDto> {
    return this.http.get<FilmDto>(this.url + 'films/' + id);
  }

  getAllFilms(): Observable<ManyFilmsDto> {
    return this.http.get<ManyFilmsDto>(this.url + 'films').pipe(
      map(films => {
        films.results.sort((a, b) => Number(a.episode_id) - Number(b.episode_id));
        return films;
      }));
  }

  getPeople(id: number): Observable<PeopleDto> {
    return this.http.get<PeopleDto>(this.url + 'people/' + id);
  }

  getAllPeople(): Observable<ManyPeopleDto> {
    return this.http.get<ManyPeopleDto>(this.url + 'people').pipe(
      map(people => {
        people.results.sort((a, b) => a.name.localeCompare(b.name));
        return people;
      }));
  }

  getPlanet(id: number): Observable<PlanetDto> {
    return this.http.get<PlanetDto>(this.url + 'planets/' + id);
  }

  getAllPlanets(): Observable<ManyPlanetsDto> {
    return this.http.get<ManyPlanetsDto>(this.url + 'planets').pipe(
      map(planets => {
        planets.results.sort((a, b) => a.name.localeCompare(b.name));
        return planets;
      }));
  }

  getSpecies(id: number): Observable<SpeciesDto> {
    return this.http.get<SpeciesDto>(this.url + 'species/' + id);
  }

  getAllSpecies(): Observable<ManySpeciesDto> {
    return this.http.get<ManySpeciesDto>(this.url + 'species').pipe(
      map(species => {
        species.results.sort((a, b) => a.name.localeCompare(b.name));
        return species;
      }));
  }

  getStarship(id: number): Observable<StarshipDto> {
    return this.http.get<StarshipDto>(this.url + 'starships/' + id);
  }

  getAllStarships(): Observable<ManyStarshipsDto> {
    return this.http.get<ManyStarshipsDto>(this.url + 'starships').pipe(
      map(starships => {
        starships.results.sort((a, b) => a.name.localeCompare(b.name));
        return starships;
      }));
  }

  getVehicle(id: number): Observable<VehicleDto> {
    return this.http.get<VehicleDto>(this.url + 'vehicles/' + id);
  }

  getAllVehicles(): Observable<ManyVehiclesDto> {
    return this.http.get<ManyVehiclesDto>(this.url + 'vehicles').pipe(
      map(vehicles => {
        vehicles.results.sort((a, b) => a.name.localeCompare(b.name));
        return vehicles;
      }));
  }

  getEverything(): any[] {
    let result: any[] = [];
    this.getAllFilms().subscribe(films => {
      result.push(films.results);

      this.getAllPeople().subscribe(people => {
        result.push(people.results);

        this.getAllPlanets().subscribe(planets => {
          result.push(planets.results);

          this.getAllSpecies().subscribe(species => {
            result.push(species.results);

            this.getAllStarships().subscribe(starships => {
              result.push(starships.results);

              this.getAllVehicles().subscribe(vehicles => {
                result.push(vehicles.results);
              })
            })
          })
        })
      })
    })
    return result;
  }

}
