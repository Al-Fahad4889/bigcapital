// @ts-nocheck
import { useQueryClient, useMutation } from 'react-query';
import { useRequestQuery } from '../../useQueryRequest';
import useApiRequest from '../../useRequest';

export function useManifests(bookingId, props) {
  return useRequestQuery(
    ['MANIFESTS', 'booking', bookingId],
    { method: 'get', url: 'manifests', params: { bookingId } },
    { select: (res) => res.data, defaultData: [], enabled: !!bookingId, ...props },
  );
}

export function useManifest(id, props) {
  return useRequestQuery(
    ['MANIFESTS', id],
    { method: 'get', url: `manifests/${id}` },
    { enabled: !!id, ...props },
  );
}

export function useGenerateManifest(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();
  return useMutation(
    (bookingId) => apiRequest.post(`manifests/generate/${bookingId}`),
    {
      onSuccess: (res, bookingId) => {
        queryClient.invalidateQueries(['MANIFESTS', 'booking', bookingId]);
        queryClient.invalidateQueries(['BOOKINGS']);
      },
      ...props,
    },
  );
}
