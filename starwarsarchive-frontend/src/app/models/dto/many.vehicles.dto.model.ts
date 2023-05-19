import {VehicleDto} from './vehicle.dto.model';

export interface ManyVehiclesDto {
  count: number;
  next: string;
  previous: string;
  results: VehicleDto[];
}
