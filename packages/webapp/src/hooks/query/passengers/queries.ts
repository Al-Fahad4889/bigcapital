// @ts-nocheck
import { useQueryClient, useMutation } from 'react-query';
import { useRequestQuery } from '../../useQueryRequest';
import useApiRequest from '../../useRequest';

const commonInvalidate = (queryClient, customerId) => {
  queryClient.invalidateQueries(['PASSENGERS', customerId]);
};

export function usePassengers(customerId, props) {
  return useRequestQuery(
    ['PASSENGERS', customerId],
    { method: 'get', url: 'passengers', params: { customerId } },
    { select: (res) => res.data, defaultData: [], enabled: !!customerId, ...props },
  );
}

export function usePassenger(id, props) {
  return useRequestQuery(
    ['PASSENGERS', id],
    { method: 'get', url: `passengers/${id}` },
    { enabled: !!id, ...props },
  );
}

export function useCreatePassenger(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();
  return useMutation(
    (values) => apiRequest.post('passengers', values),
    {
      onSuccess: (res) => {
        const customerId = res?.data?.passenger?.customerId || res?.data?.customerId;
        if (customerId) queryClient.invalidateQueries(['PASSENGERS', customerId]);
        queryClient.invalidateQueries(['BOOKINGS']);
      },
      ...props,
    },
  );
}

export function useEditPassenger(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();
  return useMutation(
    ([id, values]) => apiRequest.patch(`passengers/${id}`, values),
    {
      onSuccess: (res) => {
        const customerId = res?.data?.customerId;
        if (customerId) queryClient.invalidateQueries(['PASSENGERS', customerId]);
        queryClient.invalidateQueries(['BOOKINGS']);
      },
      ...props,
    },
  );
}

export function useDeletePassenger(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();
  return useMutation(
    ([id, customerId]) => apiRequest.delete(`passengers/${id}`),
    {
      onSuccess: (data, variables) => {
        const [, customerId] = variables;
        if (customerId) queryClient.invalidateQueries(['PASSENGERS', customerId]);
        queryClient.invalidateQueries(['BOOKINGS']);
      },
      ...props,
    },
  );
}
