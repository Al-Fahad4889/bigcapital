import { Test, TestingModule } from '@nestjs/testing';
import { AttachPassengerToBooking } from './AttachPassengerToBooking.service';
import { GetBooking } from '../queries/GetBooking.service';
import { BookingPassenger } from '../models/BookingPassenger.model';
import { Passenger } from '../../Passengers/models/Passenger.model';

describe('AttachPassengerToBooking', () => {
  let service: AttachPassengerToBooking;
  let mockInsert: jest.Mock;
  let mockFirst: jest.Mock;
  let mockWithGraphFetched: jest.Mock;

  const mockGetBooking = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    mockInsert = jest.fn();
    mockFirst = jest.fn();
    mockWithGraphFetched = jest.fn();

    const bookingPassengerQuery = {
      where: jest.fn().mockReturnThis(),
      first: mockFirst,
      insert: mockInsert,
    };

    const passengerQuery = {
      findById: jest.fn().mockReturnThis(),
      withGraphFetched: mockWithGraphFetched,
    };

    const mockPassengerModel = jest.fn().mockReturnValue({ query: jest.fn().mockReturnValue(passengerQuery) });
    const mockBookingPassengerModel = jest.fn().mockReturnValue({ query: jest.fn().mockReturnValue(bookingPassengerQuery) });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttachPassengerToBooking,
        { provide: GetBooking, useValue: mockGetBooking },
        { provide: Passenger.name, useValue: mockPassengerModel },
        { provide: BookingPassenger.name, useValue: mockBookingPassengerModel },
      ],
    }).compile();

    service = module.get<AttachPassengerToBooking>(AttachPassengerToBooking);
    jest.clearAllMocks();
  });

  it('should attach passenger and warn on travel-window expiry', async () => {
    mockGetBooking.get.mockResolvedValue({
      id: 1,
      travelDateFrom: '2026-07-15',
      travelDateTo: '2026-07-25',
    });
    mockFirst.mockResolvedValue(null);
    mockInsert.mockResolvedValue({});
    mockWithGraphFetched.mockResolvedValue({
      id: 10,
      identityDocument: { expiresAt: '2026-07-20' },
    });

    const result = await service.execute(1, 10);

    expect(result.warnings).toContain('Passport expires during the travel window.');
  });

  it('should attach passenger without warning when expiry outside travel window', async () => {
    mockGetBooking.get.mockResolvedValue({
      id: 1,
      travelDateFrom: '2026-07-15',
      travelDateTo: '2026-07-25',
    });
    mockFirst.mockResolvedValue(null);
    mockInsert.mockResolvedValue({});
    mockWithGraphFetched.mockResolvedValue({
      id: 10,
      identityDocument: { expiresAt: '2026-12-31' },
    });

    const result = await service.execute(1, 10);

    expect(result.warnings).toHaveLength(0);
  });
});
