// @ts-nocheck
import React from 'react';

import { DashboardPageContent } from '@/components';
import { BookingsLandingProvider } from '../containers/BookingsLandingProvider';
import BookingsLandingActionsBar from '../containers/BookingsLandingActionsBar';
import BookingsLandingTable from '../containers/BookingsLandingTable';

export default function BookingsList() {
  return (
    <BookingsLandingProvider>
      <BookingsLandingActionsBar />

      <DashboardPageContent>
        <BookingsLandingTable />
      </DashboardPageContent>
    </BookingsLandingProvider>
  );
}
