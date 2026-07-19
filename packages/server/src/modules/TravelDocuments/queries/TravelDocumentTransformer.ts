import { Transformer } from '@/modules/Transformer/Transformer';
import { PassengerTransformer } from '../../Passengers/queries/PassengerTransformer';

export class TravelDocumentTransformer extends Transformer {
  public includeAttributes = (): string[] => {
    return ['passenger'];
  };

  transform = (doc: any) => {
    return {
      id: doc.id,
      manifestId: doc.manifestId,
      passengerId: doc.passengerId,
      documentReference: doc.documentReference,
      status: doc.status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  };

  async passenger(doc: any) {
    const passenger = await doc.$relatedQuery('passenger');
    return passenger
      ? this.item(passenger, new PassengerTransformer())
      : null;
  }
}
