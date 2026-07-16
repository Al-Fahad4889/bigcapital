import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TravelServiceType } from '../models/TravelServiceType.model';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class GetTravelServiceTypes {
  constructor(
    @Inject(TravelServiceType.name)
    private readonly travelServiceTypeModel: TenantModelProxy<typeof TravelServiceType>,
  ) {}

  async list() {
    return this.travelServiceTypeModel()
      .query()
      .whereNull('deleted_at')
      .withGraphFetched('taxRate')
      .orderBy('name');
  }
}