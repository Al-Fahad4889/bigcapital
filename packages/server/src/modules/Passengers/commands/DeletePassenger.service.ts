import { Injectable, Inject } from '@nestjs/common';
import { Passenger } from '../models/Passenger.model';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class DeletePassenger {
  constructor(
    @Inject(Passenger.name)
    private readonly passengerModel: TenantModelProxy<typeof Passenger>,
  ) {}

  async delete(id: number) {
    const passenger = await this.passengerModel()
      .query()
      .findById(id)
      .throwIfNotFound();

    return this.passengerModel()
      .query()
      .patchAndFetchById(id, { active: false });
  }
}