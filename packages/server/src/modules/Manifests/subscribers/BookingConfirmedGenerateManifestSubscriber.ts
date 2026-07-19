import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { events } from '@/common/events/events';
import { GenerateManifest } from '../commands/GenerateManifest.service';

@Injectable()
export class BookingConfirmedGenerateManifestSubscriber {
  constructor(
    private readonly generateManifest: GenerateManifest,
  ) {}

  @OnEvent(events.booking.onConfirmed)
  async handle(event: { booking: { id: number } }) {
    await this.generateManifest.execute(event.booking.id);
  }
}
