// @ts-nocheck
import React, { createContext } from 'react';
import { DrawerHeaderContent, DrawerLoading } from '@/components';
import { DRAWERS } from '@/constants/drawers';
import { useBooking } from '@/hooks/query/bookings/queries';

const BookingDetailDrawerContext = createContext();

function BookingDetailDrawerProvider({ bookingId, ...props }) {
  const {
    data: booking,
    isLoading: isBookingLoading,
  } = useBooking(bookingId, { enabled: !!bookingId });

  const provider = {
    bookingId,
    booking,
    isBookingLoading,
  };

  return (
    <DrawerLoading loading={isBookingLoading}>
      <DrawerHeaderContent
        name={DRAWERS.BOOKING_DETAILS}
        title={booking?.bookingReference || 'Booking'}
      />
      <BookingDetailDrawerContext.Provider value={provider} {...props} />
    </DrawerLoading>
  );
}

const useBookingDetailDrawerContext = () =>
  React.useContext(BookingDetailDrawerContext);

export { BookingDetailDrawerProvider, useBookingDetailDrawerContext };
