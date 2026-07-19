import { Model } from 'objection';
import { BaseModel } from '@/models/Model';

export class TravelDocument extends BaseModel {
  id!: number;
  manifestId!: number;
  passengerId!: number;
  documentReference!: string;
  status!: string;
  createdAt?: string;
  updatedAt?: string;

  static get tableName() {
    return 'travel_documents';
  }

  get timestamps() {
    return ['createdAt', 'updatedAt'];
  }

  static get relationMappings() {
    const { Manifest } = require('../../Manifests/models/Manifest.model');
    const { Passenger } = require('../../Passengers/models/Passenger.model');

    return {
      manifest: {
        relation: Model.BelongsToOneRelation,
        modelClass: Manifest,
        join: { from: 'travel_documents.manifestId', to: 'manifests.id' },
      },
      passenger: {
        relation: Model.BelongsToOneRelation,
        modelClass: Passenger,
        join: { from: 'travel_documents.passengerId', to: 'passengers.id' },
      },
    };
  }
}
