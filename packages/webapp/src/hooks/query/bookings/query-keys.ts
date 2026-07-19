// @ts-nocheck
export const bookingsQueryKeys = {
  list: ['BOOKINGS'] as const,
  detail: (id: string) => ['BOOKINGS', id] as const,
};