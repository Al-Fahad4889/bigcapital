// @ts-nocheck
import React from 'react';
import { Intent, Tag, Classes } from '@blueprintjs/core';
import { Align } from '@/constants';
import clsx from 'classnames';
import { BookingActionsCell } from './_components';

const bookingReferenceAccessor = (booking) => {
  return <span>{booking.bookingReference}</span>;
};

const customerAccessor = (booking) => {
  return <span>{booking.customer?.displayName || `Customer #${booking.customerId}`}</span>;
};

const statusAccessor = (booking) => {
  switch (booking.status) {
    case 'confirmed':
      return <Tag round={false} intent={Intent.SUCCESS}>Confirmed</Tag>;
    case 'cancelled':
      return <Tag round={false} intent={Intent.DANGER}>Cancelled</Tag>;
    default:
      return <Tag round={false} intent={Intent.NONE}>Draft</Tag>;
  }
};

const travelDatesAccessor = (booking) => {
  if (!booking.travelDateFrom && !booking.travelDateTo) return <span className={clsx(Classes.TEXT_MUTED)}>—</span>;
  const from = booking.travelDateFrom ? new Date(booking.travelDateFrom).toLocaleDateString() : '?';
  const to = booking.travelDateTo ? new Date(booking.travelDateTo).toLocaleDateString() : '?';
  return <span>{from} – {to}</span>;
};

const passengersAccessor = (booking) => {
  const count = booking.passengers?.length ?? 0;
  return <Tag round={false} intent={Intent.NONE} minimal>{count}</Tag>;
};

export const useBookingsTableColumns = () => {
  return React.useMemo(
    () => [
      {
        id: 'bookingReference',
        Header: 'Reference',
        accessor: bookingReferenceAccessor,
        width: 40,
      },
      {
        id: 'customer',
        Header: 'Customer',
        accessor: customerAccessor,
        width: 60,
      },
      {
        id: 'travelDates',
        Header: 'Travel Dates',
        accessor: travelDatesAccessor,
        width: 80,
      },
      {
        id: 'passengers',
        Header: 'Passengers',
        accessor: passengersAccessor,
        width: 30,
        align: Align.Right,
      },
      {
        id: 'status',
        Header: 'Status',
        accessor: statusAccessor,
        width: 30,
        align: Align.Right,
      },
      {
        id: 'actions',
        Header: 'Actions',
        Cell: BookingActionsCell,
        width: 20,
        disableSortBy: true,
        align: Align.Center,
      },
    ],
    [],
  );
};
