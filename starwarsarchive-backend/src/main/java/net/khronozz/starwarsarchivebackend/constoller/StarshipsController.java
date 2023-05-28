// Copyright 2023 Nicolas Favre
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package net.khronozz.starwarsarchivebackend.constoller;

import net.khronozz.starwarsarchivebackend.model.ManyStarshipsDTO;
import net.khronozz.starwarsarchivebackend.model.StarshipDTO;
import net.khronozz.starwarsarchivebackend.service.ArchiveService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for the Star Wars starships
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@RestController
@RequestMapping("/api/starships")
public class StarshipsController {

    private final ArchiveService<StarshipDTO, ManyStarshipsDTO> archiveService;

    public StarshipsController() {
        this.archiveService = new ArchiveService<>("https://swapi.dev/api/starships/", ManyStarshipsDTO.class);
    }

    /**
     * Get all the starships
     *
     * @return ManyStarshipsDTO
     */
    @GetMapping("")
    public Object getAllStarships() {
        return archiveService.getAll();
    }
}
