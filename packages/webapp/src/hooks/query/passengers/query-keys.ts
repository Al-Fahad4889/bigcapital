// @ts-nocheck
export const passengersQueryKeys = {
  list: (customerId) => ['PASSENGERS', customerId] as const,
  detail: (id) => ['PASSENGERS', id] as const,
};