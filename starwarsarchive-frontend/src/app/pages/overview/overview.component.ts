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
 * overview.component.ts
 * Component used to display the overview of the Star Wars Archive
 *
 * @author Nicolas Favre
 * @date 18.05.2023
 * @version 1.0.0
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */

import {Component, OnInit} from '@angular/core';
import {ArchivesService} from "../../services/archives.service";
import {FilmDto} from "../../models/dto/film.dto.model";
import {VehicleDto} from "../../models/dto/vehicle.dto.model";
import {PeopleDto} from "../../models/dto/people.dto.model";
import {PlanetDto} from "../../models/dto/planet.dto.model";
import {SpeciesDto} from "../../models/dto/species.dto.model";
import {StarshipDto} from "../../models/dto/starship.dto.model";
import {forkJoin} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ArchivedetailsComponent} from "./modal/archivedetails/archivedetails.component";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  username: string | null = null;
  allFilms: FilmDto[] = [];
  allVehicles: VehicleDto[] = [];
  allPeople: PeopleDto[] = [];
  allPlanets: PlanetDto[] = [];
  allSpecies: SpeciesDto[] = [];
  allStarships: StarshipDto[] = [];
  allArchives: any[] = [];
  selectedArchive: any | null = null;
  loadingArchives: boolean = true;
  totalArchives: number = 0;
  selectedFilter: string = 'all';

  archiveTypes: { [key: string]: string } = {
    'films': 'Film',
    'vehicles': 'Vehicle',
    'people': 'People',
    'planets': 'Planet',
    'species': 'Species',
    'starships': 'Starship'
  };

  archiveFilter: { [key: string]: () => void } = {
    'films': () => this.loadFilms(),
    'vehicles': () => this.loadVehicles(),
    'people': () => this.loadPeople(),
    'planets': () => this.loadPlanets(),
    'species': () => this.loadSpecies(),
    'starships': () => this.loadStarships(),
    'all': () => this.loadAll()
  };

  constructor(
    private archiveService: ArchivesService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('USER');

    forkJoin([
      this.archiveService.getAllFilms(),
      this.archiveService.getAllVehicles(),
      this.archiveService.getAllPeople(),
      this.archiveService.getAllPlanets(),
      this.archiveService.getAllSpecies(),
      this.archiveService.getAllStarships()
    ]).subscribe(([films, vehicles, people, planets, species, starships]) => {
      this.allFilms = films.results;
      this.allVehicles = vehicles.results;
      this.allPeople = people.results;
      this.allPlanets = planets.results;
      this.allSpecies = species.results;
      this.allStarships = starships.results;

      this.allArchives = [
        ...this.allFilms,
        ...this.allVehicles,
        ...this.allPeople,
        ...this.allPlanets,
        ...this.allSpecies,
        ...this.allStarships
      ];

      // Mix all archives
      this.allArchives.sort(() => Math.random() - 0.5);

      this.selectedArchive = this.allArchives;
      this.loadingArchives = false;
      this.totalArchives = this.selectedArchive.length;
    });
  }

  filterArchives() {
    this.loadingArchives = true; // Set loading flag to true
    this.totalArchives = 0; // Reset total archives count
    setTimeout(() => {
      this.archiveFilter[this.selectedFilter]();
      this.totalArchives = this.selectedArchive.length;
      this.loadingArchives = false; // Set loading flag to false after a small delay
    }, 500); // Adjust the delay time as needed
  }

  loadFilms() {
    this.selectedArchive = this.allFilms;
  }

  loadVehicles() {
    this.selectedArchive = this.allVehicles;
  }

  loadPeople() {
    this.selectedArchive = this.allPeople;
  }

  loadPlanets() {
    this.selectedArchive = this.allPlanets;
  }

  loadSpecies() {
    this.selectedArchive = this.allSpecies;
  }

  loadStarships() {
    this.selectedArchive = this.allStarships;
  }

  loadAll() {
    this.selectedArchive = this.allArchives;
  }

  getArchiveType(archive: FilmDto | VehicleDto | PeopleDto | PlanetDto | SpeciesDto | StarshipDto): string {
    for (const type in this.archiveTypes) {
      if (archive.url.includes(type)) {
        return this.archiveTypes[type];
      }
    }
    return 'Unknown';
  }

  onShowMore(archive: FilmDto | VehicleDto | PeopleDto | PlanetDto | SpeciesDto | StarshipDto) {
    this.dialog.open(ArchivedetailsComponent, {
      width: "50%",
      height: "60%",
      data: {
        archive: archive,
        type: this.getArchiveType(archive)
      }
    })
  }
}
