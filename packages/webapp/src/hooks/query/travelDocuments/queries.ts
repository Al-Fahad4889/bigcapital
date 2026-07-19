// @ts-nocheck
import { useRequestQuery } from '../../useQueryRequest';

export function useTravelDocuments(manifestId, props) {
  return useRequestQuery(
    ['TRAVEL_DOCUMENTS', manifestId],
    { method: 'get', url: 'travel-documents', params: { manifestId } },
    { select: (res) => res.data, defaultData: [], enabled: !!manifestId, ...props },
  );
}

export function useTravelDocument(id, props) {
  return useRequestQuery(
    ['TRAVEL_DOCUMENTS', id],
    { method: 'get', url: `travel-documents/${id}` },
    { enabled: !!id, ...props },
  );
}
