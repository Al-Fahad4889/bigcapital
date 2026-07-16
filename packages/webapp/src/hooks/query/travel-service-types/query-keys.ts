import QUERY_TYPES from '../types'

export const travelServiceTypesQueryKeys = {
  list: [QUERY_TYPES.TRAVEL_SERVICE_TYPES] as const,
  detail: (id: string) =>
    [QUERY_TYPES.TRAVEL_SERVICE_TYPES, id] as const,
}