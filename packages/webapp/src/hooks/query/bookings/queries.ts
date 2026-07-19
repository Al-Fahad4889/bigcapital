// @ts-nocheck
import { useQueryClient, useMutation } from 'react-query';
import { useRequestQuery } from '../../useQueryRequest';
import useApiRequest from '../../useRequest';

const commonInvalidate = (queryClient) => {
  queryClient.invalidateQueries(['BOOKINGS']);
};

export function useBookings(query, props) {
  return useRequestQuery(
    ['BOOKINGS', query],
    { method: 'get', url: 'bookings', params: query },
    { select: (res) => res.data, defaultData: [], ...props },
  );
}

export function useBooking(id, props) {
  return useRequestQuery(
    ['BOOKINGS', id],
    { method: 'get', url: `bookings/${id}` },
    { enabled: !!id, ...props },
  );
}

export function useCreateBooking(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();
  return useMutation(
    (values) => apiRequest.post('bookings', values),
    { onSuccess: () => { commonInvalidate(queryClient); }, ...props },
  );
}

export function useAttachPassengerToBooking(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();
  return useMutation(
    ([bookingId, passengerId]) => apiRequest.post(`bookings/${bookingId}/passengers`, { passengerId }),
    { onSuccess: () => { queryClient.invalidateQueries(['BOOKINGS']); }, ...props },
  );
}