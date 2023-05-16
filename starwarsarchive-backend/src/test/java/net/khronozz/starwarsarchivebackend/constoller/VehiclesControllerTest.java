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
import net.khronozz.starwarsarchivebackend.model.VehicleDTO;
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
 * Test class for {@link VehiclesController}
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class VehiclesControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    /**
     * Test method for {@link VehiclesController#getAllVehicles()}
     */
    @Test
    void getAllVehicles() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/vehicles",
                HttpMethod.GET,
                null,
                String.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response.getBody());
        assertThat(jsonNode.get("count").asInt()).isEqualTo(39);
        assertThat(jsonNode.get("results").isArray()).isTrue();
        assertThat(jsonNode.get("results").size()).isEqualTo(39);
    }

    /**
     * Test method for {@link VehiclesController#getVehiclesById(String)}
     */
    @Test
    void getVehiclesById() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/vehicles/4",
                HttpMethod.GET,
                null,
                String.class
        );
        ObjectMapper objectMapper = new ObjectMapper();
        VehicleDTO vehicleDTO = objectMapper.readValue(response.getBody(), VehicleDTO.class);
        String expectedResponse = """
                {
                	"name": "Sand Crawler",
                	"model": "Digger Crawler",
                	"manufacturer": "Corellia Mining Corporation",
                	"cost_in_credits": "150000",
                	"length": "36.8 ",
                	"max_atmosphering_speed": "30",
                	"crew": "46",
                	"passengers": "30",
                	"cargo_capacity": "50000",
                	"consumables": "2 months",
                	"vehicle_class": "wheeled",
                	"pilots": [],
                	"films": [
                		"https://swapi.dev/api/films/1/",
                		"https://swapi.dev/api/films/5/"
                	],
                	"created": "2014-12-10T15:36:25.724000Z",
                	"edited": "2014-12-20T21:30:21.661000Z",
                	"url": "https://swapi.dev/api/vehicles/4/"
                }
                """;
        VehicleDTO expectedVehicleDTO = objectMapper.readValue(expectedResponse, VehicleDTO.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertEquals(expectedVehicleDTO, vehicleDTO);
    }
}