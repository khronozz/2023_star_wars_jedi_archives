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

  constructor(
    //Dialog
    private dialogRef: MatDialogRef<ArchivedetailsComponent>,
    //Dialog data
    @Inject(MAT_DIALOG_DATA) public data: {
      archive: FilmDto | VehicleDto | PeopleDto | PlanetDto | SpeciesDto | StarshipDto,
      type: string
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
    if (this.type === 'Film') {
      this.data.archive = this.data.archive as FilmDto;
      this.additionalDetails.push("Director: " + this.data.archive.director);
      this.additionalDetails.push("Producer: " + this.data.archive.producer);
      this.additionalDetails.push("Release Date: " + this.data.archive.release_date);
      this.additionalDetails.push("Opening Crawl: " + this.data.archive.opening_crawl);
    } else if (this.type === 'Vehicle') {
      this.data.archive = this.data.archive as VehicleDto;
      this.additionalDetails.push("Model: " + this.data.archive.model);
      this.additionalDetails.push("Manufacturer: " + this.data.archive.manufacturer);
      this.additionalDetails.push("Cost in Credits: " + this.data.archive.cost_in_credits);
      this.additionalDetails.push("Length: " + this.data.archive.length);
      this.additionalDetails.push("Max Atmosphering Speed: " + this.data.archive.max_atmosphering_speed);
      this.additionalDetails.push("Crew: " + this.data.archive.crew);
      this.additionalDetails.push("Passengers: " + this.data.archive.passengers);
      this.additionalDetails.push("Cargo Capacity: " + this.data.archive.cargo_capacity);
    } else if (this.type === 'People') {
      this.data.archive = this.data.archive as PeopleDto;
      this.additionalDetails.push("Birth Year: " + this.data.archive.birth_year);
      this.additionalDetails.push("Eye Color: " + this.data.archive.eye_color);
      this.additionalDetails.push("Gender:" + this.data.archive.gender);
      this.additionalDetails.push("Hair Color: " + this.data.archive.hair_color);
      this.additionalDetails.push("Height: " + this.data.archive.height);
      this.additionalDetails.push("Mass: " + this.data.archive.mass);
    } else if (this.type === 'Planet') {
      this.data.archive = this.data.archive as PlanetDto;
      this.additionalDetails.push("Climate: " + this.data.archive.climate);
      this.additionalDetails.push("Diameter: " + this.data.archive.diameter);
      this.additionalDetails.push("Gravity: " + this.data.archive.gravity);
      this.additionalDetails.push("Orbital Period: " + this.data.archive.orbital_period);
      this.additionalDetails.push("Population: " + this.data.archive.population);
      this.additionalDetails.push("Rotation Period: " + this.data.archive.rotation_period);
      this.additionalDetails.push("Surface Water: " + this.data.archive.surface_water);
    } else if (this.type === 'Species') {
      this.data.archive = this.data.archive as SpeciesDto;
      this.additionalDetails.push("Average Height: " + this.data.archive.average_height);
      this.additionalDetails.push("Average Lifespan: " + this.data.archive.average_lifespan);
      this.additionalDetails.push("Classification: " + this.data.archive.classification);
      this.additionalDetails.push("Designation: " + this.data.archive.designation);
      this.additionalDetails.push("Eye Colors: " + this.data.archive.eye_colors);
    } else if (this.type === 'Starship') {
      this.data.archive = this.data.archive as StarshipDto;
      this.additionalDetails.push("Model: " + this.data.archive.model);
      this.additionalDetails.push("Manufacturer: " + this.data.archive.manufacturer);
      this.additionalDetails.push("Cost in Credits: " + this.data.archive.cost_in_credits);
      this.additionalDetails.push("Length: " + this.data.archive.length);
      this.additionalDetails.push("Max Atmosphering Speed: " + this.data.archive.max_atmosphering_speed);
    } else {
      this.additionalDetails.push("No additional details available");
    }

  }

  /**
   * Close the dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
