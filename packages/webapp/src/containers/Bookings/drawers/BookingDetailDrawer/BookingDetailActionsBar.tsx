// @ts-nocheck
import React from 'react';
import { Intent, Button } from '@blueprintjs/core';
import { Can, FormattedMessage as T, AppToaster } from '@/components';
import {
  AbilitySubject,
  BookingAction,
  ManifestAction,
} from '@/constants/abilityOption';
import { useAttachPassengerToBooking } from '@/hooks/query/bookings/queries';
import { useBookingDetailDrawerContext } from './BookingDetailDrawerProvider';

export default function BookingDetailActionsBar() {
  const { bookingId, booking } = useBookingDetailDrawerContext();
  const { mutateAsync: attachPassenger } = useAttachPassengerToBooking();

  const handleAttach = () => {
    const input = window.prompt('Enter passenger ID to attach to this booking:');
    if (!input) return;
    const passengerId = parseInt(input, 10);
    if (isNaN(passengerId)) {
      AppToaster.show({ message: 'Invalid passenger ID.', intent: Intent.DANGER });
      return;
    }
    attachPassenger([bookingId, passengerId])
      .then((res) => {
        AppToaster.show({
          message: 'The passenger has been attached to the booking.',
          intent: Intent.SUCCESS,
        });
        const warnings = res?.data?.warnings || [];
        warnings.forEach((w) => {
          AppToaster.show({ message: w, intent: Intent.WARNING });
        });
      })
      .catch(() => {
        AppToaster.show({
          message: 'Something went wrong while attaching the passenger.',
          intent: Intent.DANGER,
        });
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        padding: '12px 0',
        justifyContent: 'flex-end',
      }}
    >
      <Can I={BookingAction.Edit} a={AbilitySubject.Booking}>
        <Button onClick={handleAttach}>
          <T id={'bookings.label.attach_passenger'} />
        </Button>
      </Can>
    </div>
  );
}
