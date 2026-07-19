// @ts-nocheck
import React from 'react';
import { Card, FormattedMessage as T } from '@/components';
import { useBookingDetailDrawerContext } from './BookingDetailDrawerProvider';

function maskDocumentNumber(number) {
  if (!number) return '—';
  if (number.length <= 4) return number;
  return `${number.slice(0, 4)}${'*'.repeat(number.length - 4)}`;
}

export default function BookingDetailPassengers() {
  const { booking } = useBookingDetailDrawerContext();
  const passengers = booking?.passengers || [];

  return (
    <Card>
      <Card.Header>
        <T id={'bookings.label.passengers'} />
      </Card.Header>
      {passengers.length === 0 ? (
        <p style={{ color: '#5c7080' }}>
          <T id={'passenger.label.no_passengers'} />
        </p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#5c7080', fontSize: 12 }}>
              <th><T id={'passenger.label.full_name'} /></th>
              <th><T id={'passenger.label.passport_number'} /></th>
              <th><T id={'passenger.label.visa_status'} /></th>
              <th><T id={'passenger.label.expiry_date'} /></th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((p) => (
              <tr key={p.id} style={{ borderTop: '1px solid #e1e8ed', fontSize: 13 }}>
                <td>{p.identityDocument?.fullName || '—'}</td>
                <td>{maskDocumentNumber(p.identityDocument?.documentNumber)}</td>
                <td>{p.visaStatus || 'none'}</td>
                <td>
                  {p.identityDocument?.expiresAt
                    ? new Date(p.identityDocument.expiresAt).toLocaleDateString()
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}
