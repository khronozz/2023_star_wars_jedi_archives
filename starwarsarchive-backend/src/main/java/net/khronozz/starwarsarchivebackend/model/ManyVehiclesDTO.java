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
package net.khronozz.starwarsarchivebackend.model;

import lombok.*;

/**
 * DTO for many Star Wars vehicles
 *
 * @author Nicolas Favre
 * @version 1.0.0
 * @date 16.05.2023
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ManyVehiclesDTO extends ArchiveDataDTO<VehicleDTO> {
    private String count;
    private String next;
    private String previous;
    private VehicleDTO[] results;

    @Override
    public VehicleDTO[] createArray(int size) {
        return new VehicleDTO[0];
    }
}
