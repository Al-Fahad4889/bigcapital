// @ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';
import { DashboardPageContent } from '@/components';
import BookingForm from './BookingForm';
import { BookingFormPageProvider } from './BookingFormPageProvider';

export default function BookingFormPage() {
  const { id } = useParams();
  const bookingId = id ? parseInt(id, 10) : null;

  return (
    <BookingFormPageProvider bookingId={bookingId}>
      <DashboardPageContent>
        <BookingForm />
      </DashboardPageContent>
    </BookingFormPageProvider>
  );
}
