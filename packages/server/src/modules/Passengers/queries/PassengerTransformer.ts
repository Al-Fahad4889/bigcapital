import { Transformer } from '@/modules/Transformer/Transformer';
import { IdentityDocumentTransformer } from '../../IdentityDocuments/queries/IdentityDocumentTransformer';
import { Passenger } from '../models/Passenger.model';

export class PassengerTransformer extends Transformer {
  public includeAttributes = (): string[] => {
    return ['identityDocument'];
  };

  public excludeAttributes = (): string[] => {
    return [];
  };

  transform = (passenger: Passenger) => {
    return {
      id: passenger.id,
      customerId: passenger.customerId,
      visaStatus: passenger.visaStatus,
      notes: passenger.notes,
      active: passenger.active,
      createdAt: passenger.createdAt,
      updatedAt: passenger.updatedAt,
    };
  };

  async identityDocument(passenger: Passenger) {
    const identityDoc = await passenger.$relatedQuery('identityDocument');
    return identityDoc
      ? this.item(identityDoc, new IdentityDocumentTransformer())
      : null;
  }
}