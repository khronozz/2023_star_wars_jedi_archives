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

import net.khronozz.starwarsarchivebackend.model.ManyVehiclesDTO;
import net.khronozz.starwarsarchivebackend.model.VehicleDTO;
import net.khronozz.starwarsarchivebackend.service.VehiclesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for the Star Wars vehicles
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@RestController
@RequestMapping("/api/vehicles")
public class VehiclesController {

    private final VehiclesService vehiclesService;

    public VehiclesController(VehiclesService vehiclesService) {
        this.vehiclesService = vehiclesService;
    }

    /**
     * Get all the vehicles
     *
     * @return ManyVehiclesDTO
     */
    @GetMapping("")
    public ManyVehiclesDTO getAllVehicles() {
        return vehiclesService.getAllVehicles();
    }

    /**
     * Get a vehicle by its id
     *
     * @param id the id of the vehicle
     * @return VehicleDTO
     */
    @GetMapping("/{id}")
    public VehicleDTO getVehiclesById(@PathVariable String id) {
        return vehiclesService.getVehicleById(Integer.parseInt(id));
    }
}
