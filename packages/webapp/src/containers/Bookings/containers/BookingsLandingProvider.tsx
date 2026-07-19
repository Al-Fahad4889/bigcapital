// @ts-nocheck
import React from 'react';
import { isEmpty } from 'lodash';
import { DashboardInsider } from '@/components/Dashboard';
import { useBookings } from '@/hooks/query/bookings/queries';

const BookingsLandingContext = React.createContext();

function BookingsLandingProvider({ ...props }) {
  const {
    data: types,
    isFetching: isTypesFetching,
    isLoading: isTypesLoading,
  } = useBookings();

  const isEmptyStatus = isEmpty(types) && !isTypesLoading;

  const provider = {
    types,
    isTypesFetching,
    isTypesLoading,
    isEmptyStatus,
  };

  return (
    <DashboardInsider name={'bookings'}>
      <BookingsLandingContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const useBookingsLandingContext = () =>
  React.useContext(BookingsLandingContext);

export { BookingsLandingProvider, useBookingsLandingContext };
