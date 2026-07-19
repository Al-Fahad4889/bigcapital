import { Transformer } from '@/modules/Transformer/Transformer';
import { TravelDocumentTransformer } from '../../TravelDocuments/queries/TravelDocumentTransformer';

export class ManifestTransformer extends Transformer {
  public includeAttributes = (): string[] => {
    return ['travelDocuments'];
  };

  transform = (manifest: any) => {
    return {
      id: manifest.id,
      bookingId: manifest.bookingId,
      manifestReference: manifest.manifestReference,
      status: manifest.status,
      generatedAt: manifest.generatedAt,
      createdAt: manifest.createdAt,
      updatedAt: manifest.updatedAt,
    };
  };

  async travelDocuments(manifest: any) {
    const docs = await manifest.$relatedQuery('travelDocuments');
    if (!docs || docs.length === 0) return [];
    return docs.map((doc) => this.item(doc, new TravelDocumentTransformer()));
  }
}
