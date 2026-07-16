import { Model } from 'objection';
import { BaseModel } from '@/models/Model';

export class TravelServiceType extends BaseModel {
  id!: number;
  name!: string;
  description?: string;
  taxRateId?: number;
  active!: boolean;
  deletedAt?: Date;

  static get tableName() {
    return 'travel_service_types';
  }

  get timestamps() {
    return ['createdAt', 'updatedAt'];
  }

  static get modifiers() {
    const TABLE_NAME = TravelServiceType.tableName;

    return {
      inactiveMode(query, active = false) {
        query.where(`${TABLE_NAME}.active`, !active);
      },
    };
  }

  static get relationMappings() {
    const { TaxRateModel } = require('../../TaxRates/models/TaxRate.model');

    return {
      taxRate: {
        relation: Model.BelongsToOneRelation,
        modelClass: TaxRateModel,
        join: {
          from: 'travel_service_types.taxRateId',
          to: 'tax_rates.id',
        },
      },
    };
  }
}