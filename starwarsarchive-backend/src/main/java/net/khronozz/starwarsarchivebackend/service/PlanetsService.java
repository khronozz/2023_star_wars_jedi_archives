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

import net.khronozz.starwarsarchivebackend.model.ManyPlanetsDTO;
import net.khronozz.starwarsarchivebackend.model.PlanetDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * Service for Star Wars planets
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@Service
public class PlanetsService {
    private final String url = "https://swapi.dev/api/planets";
    private final String formatOption = "?format=json";
    private final RestTemplate restTemplate;

    public PlanetsService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Get all planets
     *
     * @return ManyPlanetsDTO
     */
    public ManyPlanetsDTO getAllPlanets() {
        ManyPlanetsDTO manyPlanetsDTO = restTemplate.getForObject(url + formatOption, ManyPlanetsDTO.class);
        assert manyPlanetsDTO != null;
        // While the response has a next page, get the next page and add the results to the current result
        while (manyPlanetsDTO.getNext() != null) {
            ManyPlanetsDTO nextManyPlanetsDTO = restTemplate.getForObject(manyPlanetsDTO.getNext(), ManyPlanetsDTO.class);
            assert nextManyPlanetsDTO != null;
            List<PlanetDTO> planetDTOList = new ArrayList<>(List.of(manyPlanetsDTO.getResults()));
            planetDTOList.addAll(List.of(nextManyPlanetsDTO.getResults()));
            manyPlanetsDTO.setResults(planetDTOList.toArray(new PlanetDTO[0]));
            manyPlanetsDTO.setNext(nextManyPlanetsDTO.getNext());
        }
        return manyPlanetsDTO;
    }

    /**
     * Get a planet by its id
     *
     * @param id int
     * @return PlanetDTO
     */
    public PlanetDTO getPlanetById(int id) {
        return restTemplate.getForObject(url + "/" + id + formatOption, PlanetDTO.class);
    }
}
