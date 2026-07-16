// @ts-nocheck
import { useMutation, useQueryClient } from 'react-query';
import { useRequestQuery } from '../../useQueryRequest';
import useApiRequest from '../../useRequest';
import QUERY_TYPES from '../types';

const commonInvalidate = (queryClient) => {
  queryClient.invalidateQueries(QUERY_TYPES.TRAVEL_SERVICE_TYPES);
};

export function useTravelServiceTypes(props) {
  return useRequestQuery(
    [QUERY_TYPES.TRAVEL_SERVICE_TYPES],
    { method: 'get', url: 'travel-service-types' },
    { select: (res) => res.data, defaultData: [], ...props },
  );
}

export function useTravelServiceType(id, props) {
  return useRequestQuery(
    [QUERY_TYPES.TRAVEL_SERVICE_TYPES, id],
    { method: 'get', url: `travel-service-types/${id}` },
    { select: (res) => res.data, ...props },
  );
}

export function useCreateTravelServiceType(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();
  return useMutation(
    (values) => apiRequest.post('travel-service-types', values),
    { onSuccess: () => commonInvalidate(queryClient), ...props },
  );
}

export function useEditTravelServiceType(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();
  return useMutation(
    ([id, values]) => apiRequest.put(`travel-service-types/${id}`, values),
    { onSuccess: () => commonInvalidate(queryClient), ...props },
  );
}

export function useDeleteTravelServiceType(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();
  return useMutation(
    (id) => apiRequest.delete(`travel-service-types/${id}`),
    { onSuccess: () => commonInvalidate(queryClient), ...props },
  );
}
