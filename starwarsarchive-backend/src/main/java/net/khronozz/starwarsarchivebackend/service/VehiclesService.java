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

import net.khronozz.starwarsarchivebackend.model.ManyVehiclesDTO;
import net.khronozz.starwarsarchivebackend.model.VehicleDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * Service for Star Wars vehicles
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@Service
public class VehiclesService {
    private final String url = "https://swapi.dev/api/vehicles";
    private final String formatOption = "?format=json";
    private final RestTemplate restTemplate;

    public VehiclesService() {
        this.restTemplate = new RestTemplate();
    }

    public ManyVehiclesDTO getAllVehicles() {
        ManyVehiclesDTO manyVehiclesDTO = restTemplate.getForObject(url + formatOption, ManyVehiclesDTO.class);
        assert manyVehiclesDTO != null;
        while (manyVehiclesDTO.getNext() != null) {
            ManyVehiclesDTO nextManyVehiclesDTO = restTemplate.getForObject(manyVehiclesDTO.getNext(), ManyVehiclesDTO.class);
            assert nextManyVehiclesDTO != null;
            List<VehicleDTO> vehiclesDTOList = new ArrayList<>(List.of(manyVehiclesDTO.getResults()));
            vehiclesDTOList.addAll(List.of(nextManyVehiclesDTO.getResults()));
            manyVehiclesDTO.setResults(vehiclesDTOList.toArray(new VehicleDTO[0]));
            manyVehiclesDTO.setNext(nextManyVehiclesDTO.getNext());
        }
        return manyVehiclesDTO;
    }

    public VehicleDTO getVehicleById(int id) {
        return restTemplate.getForObject(url + "/" + id + formatOption, VehicleDTO.class);
    }
}
