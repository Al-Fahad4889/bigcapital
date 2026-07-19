import { Injectable, Inject } from '@nestjs/common';
import { Manifest } from '../models/Manifest.model';
import { TransformerInjectable } from '@/modules/Transformer/TransformerInjectable.service';
import { ManifestTransformer } from './ManifestTransformer';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class ListManifests {
  constructor(
    @Inject(Manifest.name)
    private readonly manifestModel: TenantModelProxy<typeof Manifest>,
    private readonly transformer: TransformerInjectable,
  ) {}

  async list(filter: { bookingId?: number; status?: string }) {
    const query = this.manifestModel().query();

    if (filter.bookingId) {
      query.where('bookingId', filter.bookingId);
    }
    if (filter.status) {
      query.where('status', filter.status);
    }

    const manifests = await query;
    return this.transformer.transform(manifests, new ManifestTransformer());
  }
}
