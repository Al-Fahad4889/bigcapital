import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TravelServiceType } from '../models/TravelServiceType.model';
import { CommandTravelServiceTypeValidator } from './CommandTravelServiceTypeValidator.service';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class DeleteTravelServiceType {
  constructor(
    @Inject(TravelServiceType.name)
    private readonly travelServiceTypeModel: TenantModelProxy<typeof TravelServiceType>,
    private readonly validator: CommandTravelServiceTypeValidator,
  ) {}

  async delete(id: number) {
    await this.validator.validateExistOrThrowFail(id);
    return this.travelServiceTypeModel().query().patchAndFetchById(id, {
      deletedAt: new Date(),
    });
  }
}