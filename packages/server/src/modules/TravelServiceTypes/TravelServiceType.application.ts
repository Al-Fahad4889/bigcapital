import { Injectable } from '@nestjs/common';
import { CreateTravelServiceType } from './commands/CreateTravelServiceType.service';
import { EditTravelServiceType } from './commands/EditTravelServiceType.service';
import { DeleteTravelServiceType } from './commands/DeleteTravelServiceType.service';
import { GetTravelServiceType } from './queries/GetTravelServiceType.service';
import { GetTravelServiceTypes } from './queries/GetTravelServiceTypes.service';
import { CreateTravelServiceTypeDto, EditTravelServiceTypeDto } from './dtos/TravelServiceType.dto';

@Injectable()
export class TravelServiceTypeApplication {
  constructor(
    private readonly createService: CreateTravelServiceType,
    private readonly editService: EditTravelServiceType,
    private readonly deleteService: DeleteTravelServiceType,
    private readonly getService: GetTravelServiceType,
    private readonly listService: GetTravelServiceTypes,
  ) {}

  create(dto: CreateTravelServiceTypeDto) {
    return this.createService.create(dto);
  }

  edit(id: number, dto: EditTravelServiceTypeDto) {
    return this.editService.edit(id, dto);
  }

  delete(id: number) {
    return this.deleteService.delete(id);
  }

  get(id: number) {
    return this.getService.get(id);
  }

  list() {
    return this.listService.list();
  }
}