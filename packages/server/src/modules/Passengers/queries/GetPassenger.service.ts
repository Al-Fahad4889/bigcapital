import { Injectable, Inject } from '@nestjs/common';
import { Passenger } from '../models/Passenger.model';
import { TransformerInjectable } from '@/modules/Transformer/TransformerInjectable.service';
import { PassengerTransformer } from './PassengerTransformer';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class GetPassenger {
  constructor(
    @Inject(Passenger.name)
    private readonly passengerModel: TenantModelProxy<typeof Passenger>,
    private readonly transformer: TransformerInjectable,
  ) {}

  async get(id: number) {
    const passenger = await this.passengerModel()
      .query()
      .findById(id)
      .throwIfNotFound();

    return this.transformer.transform(passenger, new PassengerTransformer());
  }
}