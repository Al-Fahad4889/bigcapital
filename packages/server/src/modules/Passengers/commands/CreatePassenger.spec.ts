import { Test, TestingModule } from '@nestjs/testing';
import { CreatePassenger } from './CreatePassenger.service';
import { CreateIdentityDocument } from '../../IdentityDocuments/commands/CreateIdentityDocument.service';
import { GetBooking } from '../../Bookings/queries/GetBooking.service';
import { ListBookings } from '../../Bookings/queries/ListBookings.service';
import { Passenger } from '../models/Passenger.model';
import { VisaStatus } from '../Passengers.types';

describe('CreatePassenger', () => {
  let service: CreatePassenger;
  let mockInsertAndFetch: jest.Mock;

  const mockCreateIdentityDocument = {
    create: jest.fn(),
  };

  const mockGetBooking = {
    get: jest.fn(),
  };

  const mockListBookings = {
    upcomingByCustomer: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    mockInsertAndFetch = jest.fn();

    const queryBuilder = {
      insertAndFetch: mockInsertAndFetch,
    };

    const fakeModel = { query: jest.fn().mockReturnValue(queryBuilder) };
    const mockPassengerModel = jest.fn().mockReturnValue(fakeModel);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePassenger,
        { provide: Passenger.name, useValue: mockPassengerModel },
        { provide: CreateIdentityDocument, useValue: mockCreateIdentityDocument },
        { provide: GetBooking, useValue: mockGetBooking },
        { provide: ListBookings, useValue: mockListBookings },
      ],
    }).compile();

    service = module.get<CreatePassenger>(CreatePassenger);
    jest.clearAllMocks();
  });

  it('should create a passenger and identity document', async () => {
    const dto = {
      customerId: 1,
      documentNumber: 'AB123456',
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      expiresAt: '2030-12-31',
      visaStatus: VisaStatus.NONE,
    };

    mockInsertAndFetch.mockResolvedValue({ id: 1, customerId: 1, visaStatus: VisaStatus.NONE });
    mockCreateIdentityDocument.create.mockResolvedValue({ id: 10 });

    const result = await service.create(dto);

    expect(result.passenger).toBeDefined();
    expect(result.passenger.id).toBe(1);
    expect(mockCreateIdentityDocument.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ownerId: 1,
        ownerType: 'passenger',
        type: 'passport',
        documentNumber: 'AB123456',
      }),
    );
  });

  it('should return a warning when passport expires during travel window', async () => {
    const dto = {
      customerId: 1,
      documentNumber: 'AB123456',
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      expiresAt: '2026-07-20',
      visaStatus: VisaStatus.NONE,
      bookingId: 5,
    };

    mockInsertAndFetch.mockResolvedValue({ id: 2, customerId: 1, visaStatus: VisaStatus.NONE });
    mockCreateIdentityDocument.create.mockResolvedValue({ id: 11 });
    mockGetBooking.get.mockResolvedValue({
      id: 5,
      travelDateFrom: '2026-07-15',
      travelDateTo: '2026-07-25',
    });

    const result = await service.create(dto);

    expect(result.warnings).toContain('Passport expires during the travel window.');
  });

  it('should not warn when passport expires outside travel window', async () => {
    const dto = {
      customerId: 1,
      documentNumber: 'AB123456',
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      expiresAt: '2026-12-31',
      visaStatus: VisaStatus.NONE,
      bookingId: 5,
    };

    mockInsertAndFetch.mockResolvedValue({ id: 3, customerId: 1, visaStatus: VisaStatus.NONE });
    mockCreateIdentityDocument.create.mockResolvedValue({ id: 12 });
    mockGetBooking.get.mockResolvedValue({
      id: 5,
      travelDateFrom: '2026-07-15',
      travelDateTo: '2026-07-25',
    });

    const result = await service.create(dto);

    expect(result.warnings).toHaveLength(0);
  });

  it('should warn when standalone customer passport expires during an upcoming booking window', async () => {
    const dto = {
      customerId: 1,
      documentNumber: 'AB123456',
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      expiresAt: '2026-08-10',
      visaStatus: VisaStatus.NONE,
    };

    mockInsertAndFetch.mockResolvedValue({ id: 4, customerId: 1, visaStatus: VisaStatus.NONE });
    mockCreateIdentityDocument.create.mockResolvedValue({ id: 13 });
    mockListBookings.upcomingByCustomer.mockResolvedValue([
      { id: 5, travelDateFrom: '2026-08-01', travelDateTo: '2026-08-20' },
    ]);

    const result = await service.create(dto);

    expect(result.warnings).toContain('Passport expires during the travel window.');
  });

  it('should reject an already-expired passport', async () => {
    const dto = {
      customerId: 1,
      documentNumber: 'AB123456',
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      expiresAt: '2020-01-01',
      visaStatus: VisaStatus.NONE,
    };

    mockInsertAndFetch.mockResolvedValue({ id: 5, customerId: 1, visaStatus: VisaStatus.NONE });
    mockCreateIdentityDocument.create.mockResolvedValue({ id: 14 });

    await expect(service.create(dto)).rejects.toThrow(
      'Passport expiry date must be in the future.',
    );
  });
});
