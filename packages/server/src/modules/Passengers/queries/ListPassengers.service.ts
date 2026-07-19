import { Injectable, Inject } from '@nestjs/common';
import { Passenger } from '../models/Passenger.model';
import { TransformerInjectable } from '@/modules/Transformer/TransformerInjectable.service';
import { PassengerTransformer } from './PassengerTransformer';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class ListPassengers {
  constructor(
    @Inject(Passenger.name)
    private readonly passengerModel: TenantModelProxy<typeof Passenger>,
    private readonly transformer: TransformerInjectable,
  ) {}

  async list(filter: { customerId?: number; active?: boolean }) {
    const query = this.passengerModel().query().withGraphFetched('identityDocument');

    if (filter.customerId) {
      query.where('customerId', filter.customerId);
    }
    if (filter.active !== undefined) {
      query.where('active', filter.active);
    }

    const passengers = await query;
    return this.transformer.transform(passengers, new PassengerTransformer());
  }
}