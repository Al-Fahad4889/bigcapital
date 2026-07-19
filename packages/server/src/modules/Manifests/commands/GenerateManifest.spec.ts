import { Test, TestingModule } from '@nestjs/testing';
import { GenerateManifest } from './GenerateManifest.service';
import { GetBooking } from '../../Bookings/queries/GetBooking.service';
import { Manifest } from '../models/Manifest.model';
import { TravelDocument } from '../../TravelDocuments/models/TravelDocument.model';

describe('GenerateManifest', () => {
  let service: GenerateManifest;
  let mockTravelInsert: jest.Mock;

  const mockGetBooking = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    mockTravelInsert = jest.fn();

    const manifestQuery = {
      insertAndFetch: jest.fn().mockResolvedValue({
        id: 100,
        bookingId: 1,
        manifestReference: 'MFT-XXXX',
        status: 'confirmed',
        generatedAt: '2026-07-19T00:00:00.000Z',
      }),
    };

    const travelDocQuery = {
      insert: mockTravelInsert,
    };

    const mockManifestModel = jest.fn().mockReturnValue({ query: jest.fn().mockReturnValue(manifestQuery) });
    const mockTravelDocumentModel = jest.fn().mockReturnValue({ query: jest.fn().mockReturnValue(travelDocQuery) });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerateManifest,
        { provide: Manifest.name, useValue: mockManifestModel },
        { provide: TravelDocument.name, useValue: mockTravelDocumentModel },
        { provide: GetBooking, useValue: mockGetBooking },
      ],
    }).compile();

    service = module.get<GenerateManifest>(GenerateManifest);
    jest.clearAllMocks();
  });

  it('should generate manifest and travel documents for passengers', async () => {
    const mockRelatedQuery = jest.fn().mockReturnValue({
      withGraphFetched: jest.fn().mockResolvedValue([
        { id: 10, customerId: 1, identityDocument: { expiresAt: '2027-06-01' } },
        { id: 11, customerId: 1, identityDocument: { expiresAt: '2028-06-01' } },
      ]),
    });

    const mockBooking = {
      id: 1,
      travelDateFrom: '2026-08-01',
      travelDateTo: '2026-09-01',
      $relatedQuery: mockRelatedQuery,
    };

    mockGetBooking.get.mockResolvedValue(mockBooking);
    mockTravelInsert
      .mockResolvedValueOnce({ id: 200, manifestId: 100, passengerId: 10, status: 'generated' })
      .mockResolvedValueOnce({ id: 201, manifestId: 100, passengerId: 11, status: 'generated' });

    const result = await service.execute(1);

    expect(result.manifest).toBeDefined();
    expect(result.manifest.id).toBe(100);
    expect(result.travelDocuments).toHaveLength(2);
    expect(mockBooking.$relatedQuery).toHaveBeenCalledWith('passengers');
    expect(result.warnings).toHaveLength(0);
  });

  it('should warn when passport expires during the travel window', async () => {
    const mockRelatedQuery = jest.fn().mockReturnValue({
      withGraphFetched: jest.fn().mockResolvedValue([
        { id: 10, customerId: 1, identityDocument: { expiresAt: '2026-08-15' } },
      ]),
    });

    const mockBooking = {
      id: 2,
      travelDateFrom: '2026-08-01',
      travelDateTo: '2026-09-01',
      $relatedQuery: mockRelatedQuery,
    };

    mockGetBooking.get.mockResolvedValue(mockBooking);
    mockTravelInsert.mockResolvedValue({ id: 300, manifestId: 200, passengerId: 10, status: 'generated' });

    const result = await service.execute(2);

    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0]).toContain('passport expires during the travel window');
  });
});
