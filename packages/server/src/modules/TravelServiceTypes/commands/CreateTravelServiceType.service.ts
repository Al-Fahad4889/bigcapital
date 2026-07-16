import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TravelServiceType } from '../models/TravelServiceType.model';
import { CreateTravelServiceTypeDto } from '../dtos/TravelServiceType.dto';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class CreateTravelServiceType {
  constructor(
    @Inject(TravelServiceType.name)
    private readonly travelServiceTypeModel: TenantModelProxy<typeof TravelServiceType>,
  ) {}

  async create(dto: CreateTravelServiceTypeDto) {
    return this.travelServiceTypeModel()
      .query()
      .insertAndFetch({
        name: dto.name,
        description: dto.description,
        taxRateId: dto.taxRateId,
        active: dto.active ?? true,
      });
  }
}