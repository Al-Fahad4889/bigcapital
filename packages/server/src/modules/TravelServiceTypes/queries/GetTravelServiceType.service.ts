import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TravelServiceType } from '../models/TravelServiceType.model';
import { CommandTravelServiceTypeValidator } from '../commands/CommandTravelServiceTypeValidator.service';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class GetTravelServiceType {
  constructor(
    @Inject(TravelServiceType.name)
    private readonly travelServiceTypeModel: TenantModelProxy<typeof TravelServiceType>,
    private readonly validator: CommandTravelServiceTypeValidator,
  ) {}

  async get(id: number) {
    return this.validator.validateExistOrThrowFail(id);
  }
}