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

import net.khronozz.starwarsarchivebackend.model.ManyPeopleDTO;
import net.khronozz.starwarsarchivebackend.model.PeopleDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * Service for Star Wars characters
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@Service
public class PeopleService {
    private final String url = "https://swapi.dev/api/people";
    private final String formatOption = "?format=json";
    private final RestTemplate restTemplate;

    public PeopleService() {
        this.restTemplate = new RestTemplate();
    }

    public ManyPeopleDTO getAllPeople() {
        ManyPeopleDTO manyPeopleDTO = restTemplate.getForObject(url + formatOption, ManyPeopleDTO.class);
        assert manyPeopleDTO != null;
        // While the response has a next page, get the next page and add the results to the current result
        while (manyPeopleDTO.getNext() != null) {
            ManyPeopleDTO nextManyPeopleDTO = restTemplate.getForObject(manyPeopleDTO.getNext(), ManyPeopleDTO.class);
            assert nextManyPeopleDTO != null;
            List<PeopleDTO> peopleDTOList = new ArrayList<>(List.of(manyPeopleDTO.getResults()));
            peopleDTOList.addAll(List.of(nextManyPeopleDTO.getResults()));
            manyPeopleDTO.setResults(peopleDTOList.toArray(new PeopleDTO[0]));
            manyPeopleDTO.setNext(nextManyPeopleDTO.getNext());
        }
        return manyPeopleDTO;
    }

    public PeopleDTO getPeopleById(int id) {
        return restTemplate.getForObject(url + "/" + id + formatOption, PeopleDTO.class);
    }
}
