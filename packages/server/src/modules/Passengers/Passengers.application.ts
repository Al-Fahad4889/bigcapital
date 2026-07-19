import { Injectable } from '@nestjs/common';
import { CreatePassenger } from './commands/CreatePassenger.service';
import { EditPassenger } from './commands/EditPassenger.service';
import { DeletePassenger } from './commands/DeletePassenger.service';
import { GetPassenger } from './queries/GetPassenger.service';
import { ListPassengers } from './queries/ListPassengers.service';
import { CreatePassengerDto } from './dtos/CreatePassenger.dto';
import { EditPassengerDto } from './dtos/EditPassenger.dto';

@Injectable()
export class PassengersApplication {
  constructor(
    private readonly createService: CreatePassenger,
    private readonly editService: EditPassenger,
    private readonly deleteService: DeletePassenger,
    private readonly getService: GetPassenger,
    private readonly listService: ListPassengers,
  ) {}

  create(dto: CreatePassengerDto) {
    return this.createService.create(dto);
  }

  edit(id: number, dto: EditPassengerDto) {
    return this.editService.edit(id, dto);
  }

  delete(id: number) {
    return this.deleteService.delete(id);
  }

  get(id: number) {
    return this.getService.get(id);
  }

  list(filter: { customerId?: number; active?: boolean }) {
    return this.listService.list(filter);
  }
}