import { mixin, Model, raw } from 'objection';
// import TenantModel from 'models/TenantModel';
// import ModelSearchable from './ModelSearchable';
// import SoftDeleteQueryBuilder from '@/collection/SoftDeleteQueryBuilder';
// import TaxRateMeta from './TaxRate.settings';
// import ModelSetting from './ModelSetting';
import { BaseModel } from '@/models/Model';
import { ExportableModel } from '@/modules/Export/decorators/ExportableModel.decorator';

@ExportableModel()
export class TaxRateModel extends BaseModel {
  active!: boolean;
  code!: string;
  name!: string;
  rate!: number;
  description?: string;

  /**
   * Table name
   */
  static get tableName() {
    return 'tax_rates';
  }

  /**
   * Soft delete query builder.
   */
  // static get QueryBuilder() {
  // return SoftDeleteQueryBuilder;
  // }

  /**
   * Timestamps columns.
   */
  get timestamps() {
    return ['createdAt', 'updatedAt'];
  }

  /**
   * Retrieves the tax rate meta.
   */
  // static get meta() {
  // return TaxRateMeta;
  // }

  /**
   * Virtual attributes.
   */
  static get virtualAttributes() {
    return [];
  }

  /**
   * Model modifiers.
   */
  static get modifiers() {
    return {};
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const { ItemEntry } = require('../../TransactionItemEntry/models/ItemEntry');
    const { Item } = require('../../Items/models/Item');
    const { TaxRateTransaction } = require('./TaxRateTransaction.model');
    const { AccountTransaction } = require('../../Accounts/models/AccountTransaction.model');
    const { TravelServiceType } = require('../../TravelServiceTypes/models/TravelServiceType.model');

    return {
      /**
       * Items that use this tax rate as sell tax rate.
       */
      itemsViaSellTaxRate: {
        relation: Model.HasManyRelation,
        modelClass: Item,
        join: {
          from: 'tax_rates.id',
          to: 'items.sellTaxRateId',
        },
      },

      /**
       * Items that use this tax rate as purchase tax rate.
       */
      itemsViaPurchaseTaxRate: {
        relation: Model.HasManyRelation,
        modelClass: Item,
        join: {
          from: 'tax_rates.id',
          to: 'items.purchaseTaxRateId',
        },
      },

      /**
       * Item entries referencing this tax rate.
       */
      itemEntries: {
        relation: Model.HasManyRelation,
        modelClass: ItemEntry,
        join: {
          from: 'tax_rates.id',
          to: 'items_entries.taxRateId',
        },
      },

      /**
       * Tax rate transactions.
       */
      taxRateTransactions: {
        relation: Model.HasManyRelation,
        modelClass: TaxRateTransaction,
        join: {
          from: 'tax_rates.id',
          to: 'tax_rate_transactions.taxRateId',
        },
      },

      /**
       * Account transactions referencing this tax rate.
       */
      accountTransactions: {
        relation: Model.HasManyRelation,
        modelClass: AccountTransaction,
        join: {
          from: 'tax_rates.id',
          to: 'accounts_transactions.taxRateId',
        },
      },

      /**
       * Travel service types referencing this tax rate.
       */
      travelServiceTypes: {
        relation: Model.HasManyRelation,
        modelClass: TravelServiceType,
        join: {
          from: 'tax_rates.id',
          to: 'travel_service_types.taxRateId',
        },
      },
    };
  }
}
