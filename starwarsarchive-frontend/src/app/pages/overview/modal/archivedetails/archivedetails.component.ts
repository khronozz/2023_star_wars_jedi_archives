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
 * archivedetails.component.ts
 * Modal to display the details of an archive
 *
 * @author Nicolas Favre
 * @date 18.05.2023
 * @version 1.0.0
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FilmDto} from "../../../../models/dto/film.dto.model";
import {VehicleDto} from "../../../../models/dto/vehicle.dto.model";
import {PeopleDto} from "../../../../models/dto/people.dto.model";
import {PlanetDto} from "../../../../models/dto/planet.dto.model";
import {SpeciesDto} from "../../../../models/dto/species.dto.model";
import {StarshipDto} from "../../../../models/dto/starship.dto.model";

@Component({
  selector: 'app-archivedetails',
  templateUrl: './archivedetails.component.html',
  styleUrls: ['./archivedetails.component.scss']
})
export class ArchivedetailsComponent {

  name: string | null = null;
  type: string | null = null;
  additionalDetails: string[] = [];

  typeComputeMap: any = {
    Film: this.computeFilmDetails,
    Vehicle: this.computeVehicleDetails,
    People: this.computePeopleDetails,
    Planet: this.computePlanetDetails,
    Species: this.computeSpeciesDetails,
    Starship: this.computeStarshipDetails
  };


  constructor(
    //Dialog
    private dialogRef: MatDialogRef<ArchivedetailsComponent>,
    //Dialog data
    @Inject(MAT_DIALOG_DATA) public data: {
      archive: FilmDto | VehicleDto | PeopleDto | PlanetDto | SpeciesDto | StarshipDto,
      type: string,
      allFilms: FilmDto[],
      allVehicles: VehicleDto[],
      allPeople: PeopleDto[],
      allPlanets: PlanetDto[],
      allSpecies: SpeciesDto[],
      allStarships: StarshipDto[]
    }
  ) {
    if ("title" in this.data.archive) {
      this.name = this.data.archive.title;
    } else if ("name" in this.data.archive) {
      this.name = this.data.archive.name;
    }
    this.type = this.data.type;
    this.computeAdditionalDetails();
  }

  /**
   * Compute the additional details to display
   */
  computeAdditionalDetails() {

    if (this.type == null) {
      this.additionalDetails.push("No additional details available");
    } else {
      this.typeComputeMap[this.type]?.call(this);
    }
  }

  /**
   * Add additional details for a film
   */
  computeFilmDetails(): void {
    this.data.archive = this.data.archive as FilmDto;
    this.additionalDetails.push("Episode: " + this.data.archive.episode_id);
    this.additionalDetails.push("Director: " + this.data.archive.director);
    this.additionalDetails.push("Producer: " + this.data.archive.producer);
    this.additionalDetails.push("Release Date: " + this.data.archive.release_date);
    this.additionalDetails.push("Opening Crawl: " + this.data.archive.opening_crawl);
    this.additionalDetails.push("Characters: " + this.searchForItems(this.data.allPeople, this.data.archive.characters));
    this.additionalDetails.push("Planets: " + this.searchForItems(this.data.allPlanets, this.data.archive.planets));
    this.additionalDetails.push("Starships: " + this.searchForItems(this.data.allStarships, this.data.archive.starships));
    this.additionalDetails.push("Vehicles: " + this.searchForItems(this.data.allVehicles, this.data.archive.vehicles));
    this.additionalDetails.push("Species: " + this.searchForItems(this.data.allSpecies, this.data.archive.species));
  }

  /**
   * Add additional details for a vehicle
   */
  computeVehicleDetails(): void {
    this.data.archive = this.data.archive as VehicleDto;
    this.additionalDetails.push("Model: " + this.data.archive.model);
    this.additionalDetails.push("Manufacturer: " + this.data.archive.manufacturer);
    this.additionalDetails.push("Cost in Credits: " + this.data.archive.cost_in_credits);
    this.additionalDetails.push("Length: " + this.data.archive.length);
    this.additionalDetails.push("Max Atmosphering Speed: " + this.data.archive.max_atmosphering_speed);
    this.additionalDetails.push("Crew: " + this.data.archive.crew);
    this.additionalDetails.push("Passengers: " + this.data.archive.passengers);
    this.additionalDetails.push("Cargo Capacity: " + this.data.archive.cargo_capacity);
    this.additionalDetails.push("Consumables: " + this.data.archive.consumables);
    this.additionalDetails.push("Vehicle Class: " + this.data.archive.vehicle_class);
    this.additionalDetails.push("Pilots: " + this.searchForItems(this.data.allPeople, this.data.archive.pilots));
    this.additionalDetails.push("Films: " + this.searchForItems(this.data.allFilms, this.data.archive.films));
  }

  /**
   * Add additional details for a planet
   */
  computePeopleDetails(): void {
    this.data.archive = this.data.archive as PeopleDto;
    this.additionalDetails.push("Birth Year: " + this.data.archive.birth_year);
    this.additionalDetails.push("Eye Color: " + this.data.archive.eye_color);
    this.additionalDetails.push("Gender: " + this.data.archive.gender);
    this.additionalDetails.push("Hair Color: " + this.data.archive.hair_color);
    this.additionalDetails.push("Height: " + this.data.archive.height);
    this.additionalDetails.push("Mass: " + this.data.archive.mass);
    this.additionalDetails.push("Skin color: " + this.data.archive.skin_color);
    this.additionalDetails.push("Homeworld: " + this.searchForItems(this.data.allPlanets, [this.data.archive.homeworld]));
    this.additionalDetails.push("Films: " + this.searchForItems(this.data.allFilms, this.data.archive.films));
    this.additionalDetails.push("Species: " + this.searchForItems(this.data.allSpecies, this.data.archive.species));
    this.additionalDetails.push("Vehicles: " + this.searchForItems(this.data.allVehicles, this.data.archive.vehicles));
    this.additionalDetails.push("Starships: " + this.searchForItems(this.data.allStarships, this.data.archive.starships));
  }

  /**
   * Add additional details for a planet
   */
  computePlanetDetails(): void {
    this.data.archive = this.data.archive as PlanetDto;
    this.additionalDetails.push("Climate: " + this.data.archive.climate);
    this.additionalDetails.push("Diameter: " + this.data.archive.diameter);
    this.additionalDetails.push("Gravity: " + this.data.archive.gravity);
    this.additionalDetails.push("Orbital Period: " + this.data.archive.orbital_period);
    this.additionalDetails.push("Population: " + this.data.archive.population);
    this.additionalDetails.push("Rotation Period: " + this.data.archive.rotation_period);
    this.additionalDetails.push("Surface Water: " + this.data.archive.surface_water);
    this.additionalDetails.push("Terrain: " + this.data.archive.terrain);
    this.additionalDetails.push("Residents: " + this.searchForItems(this.data.allPeople, this.data.archive.residents));
    this.additionalDetails.push("Films: " + this.searchForItems(this.data.allFilms, this.data.archive.films));
  }

  /**
   * Add additional details for a starship
   */
  computeSpeciesDetails(): void {
    this.data.archive = this.data.archive as SpeciesDto;
    this.additionalDetails.push("Average Height: " + this.data.archive.average_height);
    this.additionalDetails.push("Average Lifespan: " + this.data.archive.average_lifespan);
    this.additionalDetails.push("Classification: " + this.data.archive.classification);
    this.additionalDetails.push("Designation: " + this.data.archive.designation);
    this.additionalDetails.push("Eye Colors: " + this.data.archive.eye_colors);
    this.additionalDetails.push("Hair Colors: " + this.data.archive.hair_colors);
    this.additionalDetails.push("Skin colors" + this.data.archive.skin_colors);
    this.additionalDetails.push("Language: " + this.data.archive.language);
    this.additionalDetails.push("Homeworld: " + this.searchForItems(this.data.allPlanets, [this.data.archive.homeworld]));
    this.additionalDetails.push("People: " + this.searchForItems(this.data.allPeople, this.data.archive.people));
    this.additionalDetails.push("Films: " + this.searchForItems(this.data.allFilms, this.data.archive.films));
  }

  /**
   * Add additional details for a starship
   */
  computeStarshipDetails(): void {
    this.data.archive = this.data.archive as StarshipDto;
    this.additionalDetails.push("Model: " + this.data.archive.model);
    this.additionalDetails.push("Max Atmosphering Speed: " + this.data.archive.max_atmosphering_speed);
    this.additionalDetails.push("Manufacturer: " + this.data.archive.manufacturer);
    this.additionalDetails.push("Cost in Credits: " + this.data.archive.cost_in_credits);
    this.additionalDetails.push("Length: " + this.data.archive.length);
    this.additionalDetails.push("Crew: " + this.data.archive.crew);
    this.additionalDetails.push("Passengers: " + this.data.archive.passengers);
    this.additionalDetails.push("Cargo Capacity: " + this.data.archive.cargo_capacity);
    this.additionalDetails.push("Consumables: " + this.data.archive.consumables);
    this.additionalDetails.push("Hyperdrive Rating: " + this.data.archive.hyperdrive_rating);
    this.additionalDetails.push("MGLT: " + this.data.archive.MGLT);
    this.additionalDetails.push("Starship Class: " + this.data.archive.starship_class);
    this.additionalDetails.push("Pilots: " + this.searchForItems(this.data.allPeople, this.data.archive.pilots));
    this.additionalDetails.push("Films: " + this.searchForItems(this.data.allFilms, this.data.archive.films));
  }

  /**
   * Close the dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Search for archive names given a list of urls
   * @param items: list of archive items
   * @param urls: list of urls to search for
   */
  searchForItems(items: any[], urls: string[]): string {
    let result = '';
    items.forEach(item => {
      if (urls.includes(item.url)) {
        result += `${item.name || item.title}, `; // Either add the name of the archive or the title for films
      }
    });
    if (result === '') {
      return 'NA';
    }
    return result.substring(0, result.length - 2);
  }
}
