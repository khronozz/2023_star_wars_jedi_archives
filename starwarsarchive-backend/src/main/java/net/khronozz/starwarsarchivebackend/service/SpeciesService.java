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

import net.khronozz.starwarsarchivebackend.model.ManySpeciesDTO;
import net.khronozz.starwarsarchivebackend.model.SpeciesDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * Service for Star Wars species
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@Service
public class SpeciesService {
    private final String url = "https://swapi.dev/api/species";
    private final String formatOption = "?format=json";
    private final RestTemplate restTemplate;

    public SpeciesService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Get all species
     *
     * @return ManySpeciesDTO
     */
    public ManySpeciesDTO getAllSpecies() {
        ManySpeciesDTO manySpeciesDTO = restTemplate.getForObject(url + formatOption, ManySpeciesDTO.class);
        assert manySpeciesDTO != null;
        // While the response has a next page, get the next page and add the results to the current result
        while (manySpeciesDTO.getNext() != null) {
            ManySpeciesDTO nextManySpeciesDTO = restTemplate.getForObject(manySpeciesDTO.getNext(), ManySpeciesDTO.class);
            assert nextManySpeciesDTO != null;
            List<SpeciesDTO> speciesDTOList = new ArrayList<>(List.of(manySpeciesDTO.getResults()));
            speciesDTOList.addAll(List.of(nextManySpeciesDTO.getResults()));
            manySpeciesDTO.setResults(speciesDTOList.toArray(new SpeciesDTO[0]));
            manySpeciesDTO.setNext(nextManySpeciesDTO.getNext());
        }
        return manySpeciesDTO;
    }

    /**
     * Get a species by id
     *
     * @param id id of the species
     * @return SpeciesDTO
     */
    public SpeciesDTO getSpeciesById(int id) {
        return restTemplate.getForObject(url + "/" + id + formatOption, SpeciesDTO.class);
    }
}
