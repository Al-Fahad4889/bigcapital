import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TravelServiceType } from '../models/TravelServiceType.model';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class CommandTravelServiceTypeValidator {
  constructor(
    @Inject(TravelServiceType.name)
    private readonly travelServiceTypeModel: TenantModelProxy<typeof TravelServiceType>,
  ) {}

  async validateExistOrThrowFail(id: number): Promise<TravelServiceType> {
    const type = await this.travelServiceTypeModel()
      .query()
      .findById(id)
      .whereNull('deleted_at')
      .withGraphFetched('taxRate');

    if (!type) {
      throw new NotFoundException('Travel service type not found');
    }
    return type;
  }
}