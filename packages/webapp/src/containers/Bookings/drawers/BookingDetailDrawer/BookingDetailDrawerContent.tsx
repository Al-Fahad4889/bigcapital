// @ts-nocheck
import React from 'react';
import { DrawerBody } from '@/components';
import {
  BookingDetailDrawerProvider,
} from './BookingDetailDrawerProvider';
import BookingDetailHeader from './BookingDetailHeader';
import BookingDetailPassengers from './BookingDetailPassengers';
import BookingDetailManifest from './BookingDetailManifest';
import BookingDetailActionsBar from './BookingDetailActionsBar';

export default function BookingDetailDrawerContent({ bookingId }) {
  return (
    <BookingDetailDrawerProvider bookingId={bookingId}>
      <DrawerBody>
        <BookingDetailHeader />
        <BookingDetailPassengers />
        <BookingDetailManifest />
        <BookingDetailActionsBar />
      </DrawerBody>
    </BookingDetailDrawerProvider>
  );
}
