import { Injectable, Inject } from '@nestjs/common';
import { TravelDocument } from '../models/TravelDocument.model';
import { TransformerInjectable } from '@/modules/Transformer/TransformerInjectable.service';
import { TravelDocumentTransformer } from './TravelDocumentTransformer';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class GetTravelDocument {
  constructor(
    @Inject(TravelDocument.name)
    private readonly travelDocumentModel: TenantModelProxy<typeof TravelDocument>,
    private readonly transformer: TransformerInjectable,
  ) {}

  async get(id: number) {
    const doc = await this.travelDocumentModel()
      .query()
      .findById(id)
      .throwIfNotFound();

    return this.transformer.transform(doc, new TravelDocumentTransformer());
  }

  async listByManifest(manifestId: number) {
    const docs = await this.travelDocumentModel()
      .query()
      .where('manifestId', manifestId);

    return this.transformer.transform(docs, new TravelDocumentTransformer());
  }
}
