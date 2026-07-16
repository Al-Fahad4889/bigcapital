import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TravelServiceType } from '../models/TravelServiceType.model';
import { EditTravelServiceTypeDto } from '../dtos/TravelServiceType.dto';
import { CommandTravelServiceTypeValidator } from './CommandTravelServiceTypeValidator.service';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class EditTravelServiceType {
  constructor(
    @Inject(TravelServiceType.name)
    private readonly travelServiceTypeModel: TenantModelProxy<typeof TravelServiceType>,
    private readonly validator: CommandTravelServiceTypeValidator,
  ) {}

  async edit(id: number, dto: EditTravelServiceTypeDto) {
    const type = await this.validator.validateExistOrThrowFail(id);

    return this.travelServiceTypeModel()
      .query()
      .patchAndFetchById(id, {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.description !== undefined ? { description: dto.description } : {}),
        ...(dto.taxRateId !== undefined ? { taxRateId: dto.taxRateId } : {}),
        ...(dto.active !== undefined ? { active: dto.active } : {}),
      });
  }
}