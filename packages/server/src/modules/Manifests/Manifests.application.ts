import { Injectable } from '@nestjs/common';
import { GenerateManifest } from './commands/GenerateManifest.service';
import { GetManifest } from './queries/GetManifest.service';
import { ListManifests } from './queries/ListManifests.service';

@Injectable()
export class ManifestsApplication {
  constructor(
    private readonly generateService: GenerateManifest,
    private readonly getService: GetManifest,
    private readonly listService: ListManifests,
  ) {}

  generate(bookingId: number) {
    return this.generateService.execute(bookingId);
  }

  get(id: number) {
    return this.getService.get(id);
  }

  list(filter: { bookingId?: number; status?: string }) {
    return this.listService.list(filter);
  }
}
