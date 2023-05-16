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
import net.khronozz.starwarsarchivebackend.model.PeopleDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test class for {@link PeopleController}
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PeopleControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    /**
     * Test method for {@link PeopleController#getAllPeople()}
     */
    @Test
    void getAllPeople() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/people",
                HttpMethod.GET,
                null,
                String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response.getBody());
        assertThat(jsonNode.get("count").asInt()).isEqualTo(82);
        assertThat(jsonNode.get("results").isArray()).isTrue();
        assertThat(jsonNode.get("results").size()).isEqualTo(82);
    }

    /**
     * Test method for {@link PeopleController#getPeopleById(String)}
     */
    @Test
    void getPeopleById() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/people/1",
                HttpMethod.GET,
                null,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        PeopleDTO peopleDTO = objectMapper.readValue(response.getBody(), PeopleDTO.class);

        String expectedResponse = """
                {
                  	"name": "Luke Skywalker",
                  	"height": "172",
                  	"mass": "77",
                  	"hair_color": "blond",
                  	"skin_color": "fair",
                  	"eye_color": "blue",
                  	"birth_year": "19BBY",
                  	"gender": "male",
                  	"homeworld": "https://swapi.dev/api/planets/1/",
                  	"films": [
                  		"https://swapi.dev/api/films/1/",
                  		"https://swapi.dev/api/films/2/",
                  		"https://swapi.dev/api/films/3/",
                  		"https://swapi.dev/api/films/6/"
                  	],
                  	"species": [],
                  	"vehicles": [
                  		"https://swapi.dev/api/vehicles/14/",
                  		"https://swapi.dev/api/vehicles/30/"
                  	],
                  	"starships": [
                  		"https://swapi.dev/api/starships/12/",
                  		"https://swapi.dev/api/starships/22/"
                  	],
                  	"created": "2014-12-09T13:50:51.644000Z",
                  	"edited": "2014-12-20T21:17:56.891000Z",
                  	"url": "https://swapi.dev/api/people/1/"
                  }""";

        PeopleDTO expectedPeopleDTO = objectMapper.readValue(expectedResponse, PeopleDTO.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(peopleDTO).isEqualTo(expectedPeopleDTO);
    }

}