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
import net.khronozz.starwarsarchivebackend.model.StarshipDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test class for {@link StarshipsController}
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class StarshipsControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    /**
     * Test method for {@link StarshipsController#getAllStarships()}
     */
    @Test
    void getAllStarships() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/starships",
                HttpMethod.GET,
                null,
                String.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response.getBody());
        assertThat(jsonNode.get("count").asInt()).isEqualTo(36);
        assertThat(jsonNode.get("results").isArray()).isTrue();
        assertThat(jsonNode.get("results").size()).isEqualTo(36);
    }

    /**
     * Test method for {@link StarshipsController#getStarshipById(String)}
     */
    @Test
    void getStarshipById() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/starships/2",
                HttpMethod.GET,
                null,
                String.class
        );
        ObjectMapper objectMapper = new ObjectMapper();
        StarshipDTO starshipDTO = objectMapper.readValue(response.getBody(), StarshipDTO.class);
        String expectedResponse = """
                {
                	"name": "CR90 corvette",
                	"model": "CR90 corvette",
                	"manufacturer": "Corellian Engineering Corporation",
                	"cost_in_credits": "3500000",
                	"length": "150",
                	"max_atmosphering_speed": "950",
                	"crew": "30-165",
                	"passengers": "600",
                	"cargo_capacity": "3000000",
                	"consumables": "1 year",
                	"hyperdrive_rating": "2.0",
                	"MGLT": "60",
                	"starship_class": "corvette",
                	"pilots": [],
                	"films": [
                		"https://swapi.dev/api/films/1/",
                		"https://swapi.dev/api/films/3/",
                		"https://swapi.dev/api/films/6/"
                	],
                	"created": "2014-12-10T14:20:33.369000Z",
                	"edited": "2014-12-20T21:23:49.867000Z",
                	"url": "https://swapi.dev/api/starships/2/"
                }
                """;
        StarshipDTO expectedStarshipDTO = objectMapper.readValue(expectedResponse, StarshipDTO.class);
        assertThat(starshipDTO).isEqualTo(expectedStarshipDTO);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}