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
import net.khronozz.starwarsarchivebackend.model.SpeciesDTO;
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
 * Test class for {@link SpeciesController}
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SpeciesControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    /**
     * Test method for {@link SpeciesController#getAllSpecies()}
     */
    @Test
    void getAllSpecies() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/species",
                HttpMethod.GET,
                null,
                String.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response.getBody());
        assertThat(jsonNode.get("count").asInt()).isEqualTo(37);
        assertThat(jsonNode.get("results").isArray()).isTrue();
        assertThat(jsonNode.get("results").size()).isEqualTo(37);
    }

    /**
     * Test method for {@link SpeciesController#getSpeciesById(String)}
     */
    @Test
    void getSpeciesById() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/species/1",
                HttpMethod.GET,
                null,
                String.class
        );
        ObjectMapper objectMapper = new ObjectMapper();
        SpeciesDTO speciesDTO = objectMapper.readValue(response.getBody(), SpeciesDTO.class);
        String expectedResponse = """
                {
                	"name": "Human",
                	"classification": "mammal",
                	"designation": "sentient",
                	"average_height": "180",
                	"skin_colors": "caucasian, black, asian, hispanic",
                	"hair_colors": "blonde, brown, black, red",
                	"eye_colors": "brown, blue, green, hazel, grey, amber",
                	"average_lifespan": "120",
                	"homeworld": "https://swapi.dev/api/planets/9/",
                	"language": "Galactic Basic",
                	"people": [
                		"https://swapi.dev/api/people/66/",
                		"https://swapi.dev/api/people/67/",
                		"https://swapi.dev/api/people/68/",
                		"https://swapi.dev/api/people/74/"
                	],
                	"films": [
                		"https://swapi.dev/api/films/1/",
                		"https://swapi.dev/api/films/2/",
                		"https://swapi.dev/api/films/3/",
                		"https://swapi.dev/api/films/4/",
                		"https://swapi.dev/api/films/5/",
                		"https://swapi.dev/api/films/6/"
                	],
                	"created": "2014-12-10T13:52:11.567000Z",
                	"edited": "2014-12-20T21:36:42.136000Z",
                	"url": "https://swapi.dev/api/species/1/"
                }
                """;
        SpeciesDTO expectedSpeciesDTO = objectMapper.readValue(expectedResponse, SpeciesDTO.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(speciesDTO).isEqualTo(expectedSpeciesDTO);
    }
}