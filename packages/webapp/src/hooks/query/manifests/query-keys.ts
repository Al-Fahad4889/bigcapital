// @ts-nocheck
export const manifestsQueryKeys = {
  list: ['MANIFESTS'] as const,
  byBooking: (bookingId) => ['MANIFESTS', 'booking', bookingId] as const,
  detail: (id) => ['MANIFESTS', id] as const,
};
