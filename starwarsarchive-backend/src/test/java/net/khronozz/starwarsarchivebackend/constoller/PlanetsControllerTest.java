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
import net.khronozz.starwarsarchivebackend.model.PlanetDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test class for {@link PlanetsController}
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PlanetsControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    /**
     * Test method for {@link PlanetsController#getAllPlanets()}
     */
    @Test
    void getAllPlanets() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/planets",
                HttpMethod.GET,
                null,
                String.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response.getBody());
        assertThat(jsonNode.get("count").asInt()).isEqualTo(60);
        assertThat(jsonNode.get("results").isArray()).isTrue();
        assertThat(jsonNode.get("results").size()).isEqualTo(60);
    }

    /**
     * Test method for {@link PlanetsController#getPlanetById(String)}
     */
    @Test
    void getPlanetById() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/planets/1",
                HttpMethod.GET,
                null,
                String.class
        );
        ObjectMapper objectMapper = new ObjectMapper();
        PlanetDTO planetDTO = objectMapper.readValue(response.getBody(), PlanetDTO.class);
        String expectedResponse = """
                {
                	"name": "Tatooine",
                	"rotation_period": "23",
                	"orbital_period": "304",
                	"diameter": "10465",
                	"climate": "arid",
                	"gravity": "1 standard",
                	"terrain": "desert",
                	"surface_water": "1",
                	"population": "200000",
                	"residents": [
                		"https://swapi.dev/api/people/1/",
                		"https://swapi.dev/api/people/2/",
                		"https://swapi.dev/api/people/4/",
                		"https://swapi.dev/api/people/6/",
                		"https://swapi.dev/api/people/7/",
                		"https://swapi.dev/api/people/8/",
                		"https://swapi.dev/api/people/9/",
                		"https://swapi.dev/api/people/11/",
                		"https://swapi.dev/api/people/43/",
                		"https://swapi.dev/api/people/62/"
                	],
                	"films": [
                		"https://swapi.dev/api/films/1/",
                		"https://swapi.dev/api/films/3/",
                		"https://swapi.dev/api/films/4/",
                		"https://swapi.dev/api/films/5/",
                		"https://swapi.dev/api/films/6/"
                	],
                	"created": "2014-12-09T13:50:49.641000Z",
                	"edited": "2014-12-20T20:58:18.411000Z",
                	"url": "https://swapi.dev/api/planets/1/"
                }
                """;
        PlanetDTO expectedPlanetDTO = objectMapper.readValue(expectedResponse, PlanetDTO.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(planetDTO).isEqualTo(expectedPlanetDTO);
    }
}