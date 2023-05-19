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
package net.khronozz.starwarsarchivebackend.service;

import net.khronozz.starwarsarchivebackend.model.ManyStarshipsDTO;
import net.khronozz.starwarsarchivebackend.model.StarshipDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * Service for Star Wars starships
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@Service
public class StarshipsService {
    private final String url = "https://swapi.dev/api/starships";
    private final String formatOption = "?format=json";
    private final RestTemplate restTemplate;

    public StarshipsService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Get all starships
     *
     * @return ManyStarshipsDTO
     */
    public ManyStarshipsDTO getAllStarships() {
        ManyStarshipsDTO manyStarshipsDTO = restTemplate.getForObject(url + formatOption, ManyStarshipsDTO.class);
        assert manyStarshipsDTO != null;
        // While the response has a next page, get the next page and add the results to the current result
        while (manyStarshipsDTO.getNext() != null) {
            ManyStarshipsDTO nextManyStarshipsDTO = restTemplate.getForObject(manyStarshipsDTO.getNext(), ManyStarshipsDTO.class);
            assert nextManyStarshipsDTO != null;
            List<StarshipDTO> starshipsDTOList = new ArrayList<>(List.of(manyStarshipsDTO.getResults()));
            starshipsDTOList.addAll(List.of(nextManyStarshipsDTO.getResults()));
            manyStarshipsDTO.setResults(starshipsDTOList.toArray(new StarshipDTO[0]));
            manyStarshipsDTO.setNext(nextManyStarshipsDTO.getNext());
        }
        return manyStarshipsDTO;
    }

    /**
     * Get a starship by id
     *
     * @param id id of the starship
     * @return StarshipDTO
     */
    public StarshipDTO getStarshipById(int id) {
        return restTemplate.getForObject(url + "/" + id + formatOption, StarshipDTO.class);
    }
}
