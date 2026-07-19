// @ts-nocheck
export const travelDocumentsQueryKeys = {
  byManifest: (manifestId) => ['TRAVEL_DOCUMENTS', manifestId] as const,
  detail: (id) => ['TRAVEL_DOCUMENTS', id] as const,
};
