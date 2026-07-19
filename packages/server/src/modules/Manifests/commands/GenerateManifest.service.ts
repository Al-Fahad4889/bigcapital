import { Injectable, Inject, Logger } from '@nestjs/common';
import { Manifest } from '../models/Manifest.model';
import { TravelDocument } from '../../TravelDocuments/models/TravelDocument.model';
import { Booking } from '../../Bookings/models/Booking.model';
import { GetBooking } from '../../Bookings/queries/GetBooking.service';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

function generateReference(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MFT-${ts}-${rand}`;
}

function generateDocReference(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TDC-${ts}-${rand}`;
}

@Injectable()
export class GenerateManifest {
  private readonly logger = new Logger(GenerateManifest.name);

  constructor(
    @Inject(Manifest.name)
    private readonly manifestModel: TenantModelProxy<typeof Manifest>,
    @Inject(TravelDocument.name)
    private readonly travelDocumentModel: TenantModelProxy<typeof TravelDocument>,
    private readonly getBooking: GetBooking,
  ) {}

  async execute(bookingId: number) {
    const warnings: string[] = [];
    const booking: any = await this.getBooking.get(bookingId);

    const manifest = await this.manifestModel()
      .query()
      .insertAndFetch({
        bookingId,
        manifestReference: generateReference(),
        status: 'confirmed',
        generatedAt: new Date().toISOString(),
      });

    const passengers = await booking.$relatedQuery('passengers').withGraphFetched('identityDocument');

    const travelDocs = await Promise.all(
      passengers.map((passenger: any) => {
        // Warn if passport expires during the travel window
        if (booking.travelDateFrom && booking.travelDateTo && passenger.identityDocument?.expiresAt) {
          const expiry = new Date(passenger.identityDocument.expiresAt);
          const windowStart = new Date(booking.travelDateFrom);
          const windowEnd = new Date(booking.travelDateTo);
          if (expiry >= windowStart && expiry <= windowEnd) {
            const msg = `Passenger #${passenger.id}: passport expires during the travel window.`;
            warnings.push(msg);
            this.logger.warn(msg);
          }
        }

        return this.travelDocumentModel()
          .query()
          .insert({
            manifestId: manifest.id,
            passengerId: passenger.id,
            documentReference: generateDocReference(),
            status: 'generated',
          });
      }),
    );

    return { manifest, travelDocuments: travelDocs, warnings };
  }
}
