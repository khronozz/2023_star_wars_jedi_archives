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
 * Component used to display an overview of the Star Wars Archive
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
  // Every archive in one array
  allArchives: any[] = [];
  // Archive to display
  selectedArchive: any | null = null;
  selectedArchiveName: string = '';
  loadingArchives: boolean = true;
  totalArchives: number = 0;
  selectedFilter: string = 'all';
  searchQuery: string = '';

  // Archive types to display on the archive card
  archiveTypes: { [key: string]: string } = {
    'films': 'Film',
    'vehicles': 'Vehicle',
    'people': 'People',
    'planets': 'Planet',
    'species': 'Species',
    'starships': 'Starship'
  };

  // Archive filter
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

    // Load all archives
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

      // Mix all archives to display them randomly
      this.allArchives.sort(() => Math.random() - 0.5);

      this.selectedArchive = this.allArchives;
      this.selectedArchiveName = 'all';
      this.loadingArchives = false;
      this.totalArchives = this.selectedArchive.length;
    });
  }

  /**
   * Filter the archives to display
   */
  filterArchives() {
    this.loadingArchives = true; // Set loading flag to true
    this.totalArchives = 0; // Reset total archives count
    setTimeout(() => {
      this.archiveFilter[this.selectedFilter](); // Filter archives
      this.totalArchives = this.selectedArchive.length;
      this.loadingArchives = false; // Set loading flag to false after a small delay
    }, 300);
  }

  /**
   * Select the films archive
   */
  loadFilms() {
    this.selectedArchive = this.allFilms;
    this.selectedArchiveName = 'films';
  }

  /**
   * Select the vehicles archive
   */
  loadVehicles() {
    this.selectedArchive = this.allVehicles;
    this.selectedArchiveName = 'vehicles';
  }

  /**
   * Select the people archive
   */
  loadPeople() {
    this.selectedArchive = this.allPeople;
    this.selectedArchiveName = 'people';
  }

  /**
   * Select the planets archive
   */
  loadPlanets() {
    this.selectedArchive = this.allPlanets;
    this.selectedArchiveName = 'planets';
  }

  /**
   * Select the species archive
   */
  loadSpecies() {
    this.selectedArchive = this.allSpecies;
    this.selectedArchiveName = 'species';
  }

  /**
   * Select the starships archive
   */
  loadStarships() {
    this.selectedArchive = this.allStarships;
    this.selectedArchiveName = 'starships';
  }

  /**
   * Select all archives
   */
  loadAll() {
    this.selectedArchive = this.allArchives;
    this.selectedArchiveName = 'all';
  }

  /**
   * Interpret the archive type
   * @param archive
   */
  getArchiveType(archive: FilmDto | VehicleDto | PeopleDto | PlanetDto | SpeciesDto | StarshipDto): string {
    for (const type in this.archiveTypes) {
      if (archive.url.includes(type)) {
        return this.archiveTypes[type];
      }
    }
    return 'Unknown';
  }

  /**
   * Open the archive details modal
   * @param archive
   */
  onShowMore(archive: FilmDto | VehicleDto | PeopleDto | PlanetDto | SpeciesDto | StarshipDto) {
    this.dialog.open(ArchivedetailsComponent, {
      width: "80%",
      height: "95%",
      data: {
        archive: archive,
        type: this.getArchiveType(archive),
        allFilms: this.allFilms,
        allVehicles: this.allVehicles,
        allPeople: this.allPeople,
        allPlanets: this.allPlanets,
        allSpecies: this.allSpecies,
        allStarships: this.allStarships
      }
    })
  }

  /**
   * Search for archive names that match the search query
   */
  searchArchives() {
    // If the search query is empty, load back the selected archive
    if (this.searchQuery === '') {
      this.loadingArchives = true;
      this.totalArchives = 0;
      setTimeout(() => {
        this.archiveFilter[this.selectedArchiveName]();
        this.totalArchives = this.selectedArchive.length;
        this.loadingArchives = false;
      }, 300);
      return;
    }
    this.archiveFilter[this.selectedArchiveName]();
    this.loadingArchives = true;
    this.totalArchives = 0;
    setTimeout(() => {
      this.selectedArchive = this.selectedArchive.filter((archive: FilmDto | VehicleDto | PeopleDto | PlanetDto | SpeciesDto | StarshipDto) => {
        // Check if the archive has a title (film) or a name (vehicle, people, planet, species, starship)
        if ("title" in archive) {
          return archive.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        } else if ("name" in archive) {
          return archive.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        } else {
          return false
        }
      });
      this.totalArchives = this.selectedArchive.length;
      this.loadingArchives = false;
    }, 300);
  }

  /**
   * Clear the search input
   */
  clearSearch() {
    this.searchQuery = ''
    this.searchArchives()
  }
}
