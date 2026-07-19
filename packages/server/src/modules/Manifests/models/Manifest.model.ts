import { Model } from 'objection';
import { BaseModel } from '@/models/Model';

export class Manifest extends BaseModel {
  id!: number;
  bookingId!: number;
  manifestReference!: string;
  status!: string;
  generatedAt?: string;
  createdAt?: string;
  updatedAt?: string;

  static get tableName() {
    return 'manifests';
  }

  get timestamps() {
    return ['createdAt', 'updatedAt'];
  }

  static get relationMappings() {
    const { Booking } = require('../../Bookings/models/Booking.model');
    const { TravelDocument } = require('../../TravelDocuments/models/TravelDocument.model');

    return {
      booking: {
        relation: Model.BelongsToOneRelation,
        modelClass: Booking,
        join: { from: 'manifests.bookingId', to: 'bookings.id' },
      },
      travelDocuments: {
        relation: Model.HasManyRelation,
        modelClass: TravelDocument,
        join: { from: 'manifests.id', to: 'travel_documents.manifestId' },
      },
    };
  }
}
