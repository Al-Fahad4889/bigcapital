import { Model } from 'objection';
import { BaseModel } from '@/models/Model';

export class Passenger extends BaseModel {
  id!: number;
  customerId!: number;
  visaStatus!: string;
  notes?: string;
  active!: boolean;
  createdAt?: string;
  updatedAt?: string;
  identityDocument?: any;

  static get tableName() {
    return 'passengers';
  }

  get timestamps() {
    return ['createdAt', 'updatedAt'];
  }

  static get relationMappings() {
    const { Customer } = require('../../Customers/models/Customer');
    const { IdentityDocument } = require('../../IdentityDocuments/models/IdentityDocument.model');

    return {
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Customer,
        join: { from: 'passengers.customerId', to: 'contacts.id' },
      },
      identityDocument: {
        relation: Model.HasOneRelation,
        modelClass: IdentityDocument,
        join: {
          from: 'passengers.id',
          to: 'identity_documents.ownerId',
        },
        filter: { ownerType: 'passenger' },
      },
    };
  }
}