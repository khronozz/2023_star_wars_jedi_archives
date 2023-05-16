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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.khronozz.starwarsarchivebackend.model.FilmDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for {@link FilmsController}
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class FilmsControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    /**
     * Test method for {@link FilmsController#getAllFilms()}
     */
    @Test
    void getAllFilms() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/films",
                HttpMethod.GET,
                null,
                String.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response.getBody());
        assertThat(jsonNode.get("count").asInt()).isEqualTo(6);
        assertThat(jsonNode.get("results").isArray()).isTrue();
        assertThat(jsonNode.get("results").size()).isEqualTo(6);
    }

    /**
     * Test method for {@link FilmsController#getFilmById(String)}
     */
    @Test
    void getFilmById() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/films/1",
                HttpMethod.GET,
                null,
                String.class
        );
        ObjectMapper objectMapper = new ObjectMapper();
        FilmDTO filmDTO = objectMapper.readValue(response.getBody(), FilmDTO.class);
        String expectedResponse = """
                        {
                        	"title": "A New Hope",
                        	"episode_id": 4,
                        	"opening_crawl": "It is a period of civil war.\\r\\nRebel spaceships, striking\\r\\nfrom a hidden base, have won\\r\\ntheir first victory against\\r\\nthe evil Galactic Empire.\\r\\n\\r\\nDuring the battle, Rebel\\r\\nspies managed to steal secret\\r\\nplans to the Empire's\\r\\nultimate weapon, the DEATH\\r\\nSTAR, an armored space\\r\\nstation with enough power\\r\\nto destroy an entire planet.\\r\\n\\r\\nPursued by the Empire's\\r\\nsinister agents, Princess\\r\\nLeia races home aboard her\\r\\nstarship, custodian of the\\r\\nstolen plans that can save her\\r\\npeople and restore\\r\\nfreedom to the galaxy....",
                        	"director": "George Lucas",
                        	"producer": "Gary Kurtz, Rick McCallum",
                        	"release_date": "1977-05-25",
                        	"characters": [
                        		"https://swapi.dev/api/people/1/",
                        		"https://swapi.dev/api/people/2/",
                        		"https://swapi.dev/api/people/3/",
                        		"https://swapi.dev/api/people/4/",
                        		"https://swapi.dev/api/people/5/",
                        		"https://swapi.dev/api/people/6/",
                        		"https://swapi.dev/api/people/7/",
                        		"https://swapi.dev/api/people/8/",
                        		"https://swapi.dev/api/people/9/",
                        		"https://swapi.dev/api/people/10/",
                        		"https://swapi.dev/api/people/12/",
                        		"https://swapi.dev/api/people/13/",
                        		"https://swapi.dev/api/people/14/",
                        		"https://swapi.dev/api/people/15/",
                        		"https://swapi.dev/api/people/16/",
                        		"https://swapi.dev/api/people/18/",
                        		"https://swapi.dev/api/people/19/",
                        		"https://swapi.dev/api/people/81/"
                        	],
                        	"planets": [
                        		"https://swapi.dev/api/planets/1/",
                        		"https://swapi.dev/api/planets/2/",
                        		"https://swapi.dev/api/planets/3/"
                        	],
                        	"starships": [
                        		"https://swapi.dev/api/starships/2/",
                        		"https://swapi.dev/api/starships/3/",
                        		"https://swapi.dev/api/starships/5/",
                        		"https://swapi.dev/api/starships/9/",
                        		"https://swapi.dev/api/starships/10/",
                        		"https://swapi.dev/api/starships/11/",
                        		"https://swapi.dev/api/starships/12/",
                        		"https://swapi.dev/api/starships/13/"
                        	],
                        	"vehicles": [
                        		"https://swapi.dev/api/vehicles/4/",
                        		"https://swapi.dev/api/vehicles/6/",
                        		"https://swapi.dev/api/vehicles/7/",
                        		"https://swapi.dev/api/vehicles/8/"
                        	],
                        	"species": [
                        		"https://swapi.dev/api/species/1/",
                        		"https://swapi.dev/api/species/2/",
                        		"https://swapi.dev/api/species/3/",
                        		"https://swapi.dev/api/species/4/",
                        		"https://swapi.dev/api/species/5/"
                        	],
                        	"created": "2014-12-10T14:23:31.880000Z",
                        	"edited": "2014-12-20T19:49:45.256000Z",
                        	"url": "https://swapi.dev/api/films/1/"
                        }
                """;

        FilmDTO expectedFilmDTO = objectMapper.readValue(expectedResponse, FilmDTO.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(filmDTO).isEqualTo(expectedFilmDTO);
    }
}