import { Injectable, Inject } from '@nestjs/common';
import { Manifest } from '../models/Manifest.model';
import { TransformerInjectable } from '@/modules/Transformer/TransformerInjectable.service';
import { ManifestTransformer } from './ManifestTransformer';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class GetManifest {
  constructor(
    @Inject(Manifest.name)
    private readonly manifestModel: TenantModelProxy<typeof Manifest>,
    private readonly transformer: TransformerInjectable,
  ) {}

  async get(id: number) {
    const manifest = await this.manifestModel()
      .query()
      .findById(id)
      .withGraphFetched('travelDocuments.[passenger.[identityDocument, customer]]')
      .throwIfNotFound();

    return this.transformer.transform(manifest, new ManifestTransformer());
  }
}
