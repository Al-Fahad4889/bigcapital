import { Knex } from 'knex';
import { Inject, Injectable } from '@nestjs/common';
import { TravelServiceType } from '../TravelServiceTypes/models/TravelServiceType.model';
import { TenantModelProxy } from '../System/models/TenantBaseModel';

@Injectable()
export class SyncTravelServiceTypeTaxRateOnEditTaxRate {
  constructor(
    @Inject(TravelServiceType.name)
    private readonly travelServiceTypeModel: TenantModelProxy<typeof TravelServiceType>,
  ) {}

  public updateTravelServiceTypeTaxRate = async (
    oldTaxRateId: number,
    taxRateId: number,
    trx?: Knex.Transaction,
  ) => {
    if (oldTaxRateId === taxRateId) return;

    await this.travelServiceTypeModel()
      .query(trx)
      .where('taxRateId', oldTaxRateId)
      .update({ taxRateId });
  };
}