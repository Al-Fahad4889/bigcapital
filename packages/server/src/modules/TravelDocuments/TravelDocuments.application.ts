import { Injectable } from '@nestjs/common';
import { GetTravelDocument } from './queries/GetTravelDocument.service';

@Injectable()
export class TravelDocumentsApplication {
  constructor(
    private readonly getService: GetTravelDocument,
  ) {}

  get(id: number) {
    return this.getService.get(id);
  }

  listByManifest(manifestId: number) {
    return this.getService.listByManifest(manifestId);
  }
}
