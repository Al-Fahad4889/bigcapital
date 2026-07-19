// @ts-nocheck
import React from 'react';
import { Intent, Tag } from '@blueprintjs/core';
import { Card, FormattedMessage as T, DetailsBarSkeletonBase } from '@/components';
import { useBookingDetailDrawerContext } from './BookingDetailDrawerProvider';

function statusTag(status) {
  switch (status) {
    case 'confirmed':
      return <Tag round={false} intent={Intent.SUCCESS}>Confirmed</Tag>;
    case 'cancelled':
      return <Tag round={false} intent={Intent.DANGER}>Cancelled</Tag>;
    default:
      return <Tag round={false} intent={Intent.NONE}>Draft</Tag>;
  }
}

export default function BookingDetailHeader() {
  const { booking, isBookingLoading } = useBookingDetailDrawerContext();

  if (isBookingLoading) {
    return <DetailsBarSkeletonBase className={'bp3-skeleton'} />;
  }

  const travelFrom = booking?.travelDateFrom
    ? new Date(booking.travelDateFrom).toLocaleDateString()
    : '—';
  const travelTo = booking?.travelDateTo
    ? new Date(booking.travelDateTo).toLocaleDateString()
    : '—';
  const customerName =
    booking?.customer?.displayName || `Customer #${booking?.customerId}`;

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>{booking?.bookingReference}</h2>
        {statusTag(booking?.status)}
      </div>
      <div style={{ marginTop: 12, color: '#5c7080', fontSize: 13 }}>
        <div><strong><T id={'bookings.label.customer'} />:</strong> {customerName}</div>
        <div><strong><T id={'bookings.label.travel_dates'} />:</strong> {travelFrom} – {travelTo}</div>
        {booking?.notes && (
          <div><strong><T id={'bookings.label.notes'} />:</strong> {booking.notes}</div>
        )}
      </div>
    </Card>
  );
}
