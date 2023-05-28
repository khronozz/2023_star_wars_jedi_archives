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

import net.khronozz.starwarsarchivebackend.model.ArchiveDataDTO;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * Service for Star Wars archives
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 28.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
public class ArchiveService<Y, T extends ArchiveDataDTO<Y>> {
    private final String url;
    private final RestTemplate restTemplate;
    private final Class<T> responseType;

    public ArchiveService(String url, Class<T> responseType) {
        this.url = url;
        this.responseType = responseType;
        this.restTemplate = new RestTemplate();
    }

    /**
     * Get all Star Wars archives of type T
     *
     * @return ManyFilmsDTO
     */
    public T getAll() {
        // Option to get JSON format from the API
        String formatOption = "?format=json";
        T currentArchives = restTemplate.getForObject(url + formatOption, responseType);
        assert currentArchives != null;
        // While the response has a next page, get the next page and add the results to the current result
        while (currentArchives.getNext() != null) {
            T nextArchives = restTemplate.getForObject(currentArchives.getNext(), responseType);
            assert nextArchives != null;
            List<Y> archivesDTOList = new ArrayList<>(List.of(currentArchives.getResults()));
            archivesDTOList.addAll(List.of(nextArchives.getResults()));
            currentArchives.setResults(archivesDTOList.toArray(currentArchives.createArray(0)));
            currentArchives.setNext(nextArchives.getNext());
        }
        return currentArchives;
    }
}
