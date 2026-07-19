// @ts-nocheck
import React, { createContext } from 'react';
import { css } from '@emotion/css';
import { DashboardInsider } from '@/components/Dashboard';
import {
  useCustomers,
  useUsers,
  useBooking,
  useCreateBooking,
} from '@/hooks/query';
import { AppToaster } from '@/components';

const BookingFormPageContext = createContext();

function BookingFormPageProvider({ bookingId, ...props }) {
  const {
    data: customers,
    isLoading: isCustomersLoading,
  } = useCustomers();

  const {
    data: users,
    isLoading: isUsersLoading,
  } = useUsers();

  const {
    data: booking,
    isLoading: isBookingLoading,
  } = useBooking(bookingId, { enabled: !!bookingId });

  const { mutateAsync: createBookingMutate } = useCreateBooking();

  const isNewMode = !bookingId;

  const provider = {
    isNewMode,
    bookingId,
    customers,
    users,
    booking,
    isCustomersLoading,
    isUsersLoading,
    isBookingLoading,
    createBookingMutate,
  };

  return (
    <DashboardInsider
      loading={isCustomersLoading || isUsersLoading || isBookingLoading}
      name={'booking-form'}
      className={css`
        min-height: calc(100vh - var(--top-offset));
        max-height: calc(100vh - var(--top-offset));
      `}
    >
      <BookingFormPageContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const useBookingFormPageContext = () =>
  React.useContext(BookingFormPageContext);

export { BookingFormPageProvider, useBookingFormPageContext };
