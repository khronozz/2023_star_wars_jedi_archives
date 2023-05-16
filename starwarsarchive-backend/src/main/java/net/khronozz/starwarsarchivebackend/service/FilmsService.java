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

import net.khronozz.starwarsarchivebackend.model.FilmDTO;
import net.khronozz.starwarsarchivebackend.model.ManyFilmsDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * Service for Star Wars films
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@Service
public class FilmsService {
    private final String url = "https://swapi.dev/api/films";
    // Option to get JSON format from the API
    private final String formatOption = "?format=json";
    private final RestTemplate restTemplate;

    public FilmsService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Get all Star Wars films
     *
     * @return ManyFilmsDTO
     */
    public ManyFilmsDTO getAllFilms() {
        ManyFilmsDTO manyFilmsDTO = restTemplate.getForObject(url + formatOption, ManyFilmsDTO.class);
        assert manyFilmsDTO != null;
        // While the response has a next page, get the next page and add the results to the current result
        while (manyFilmsDTO.getNext() != null) {
            ManyFilmsDTO nextManyFilmsDTO = restTemplate.getForObject(manyFilmsDTO.getNext(), ManyFilmsDTO.class);
            assert nextManyFilmsDTO != null;
            List<FilmDTO> filmsDTOList = new ArrayList<>(List.of(manyFilmsDTO.getResults()));
            filmsDTOList.addAll(List.of(nextManyFilmsDTO.getResults()));
            manyFilmsDTO.setResults(filmsDTOList.toArray(new FilmDTO[0]));
            manyFilmsDTO.setNext(nextManyFilmsDTO.getNext());
        }
        return manyFilmsDTO;
    }

    /**
     * Get a Star Wars film by its id
     *
     * @param id id of the film
     * @return FilmDTO
     */
    public FilmDTO getFilmById(int id) {
        return restTemplate.getForObject(url + "/" + id + formatOption, FilmDTO.class);
    }
}
