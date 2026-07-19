// @ts-nocheck
import React from 'react';
import PassengerDialogForm from './PassengerDialogForm';
import { PassengerFormDialogBoot } from './PassengerDialogBoot';

interface PassengerDialogContentProps {
  dialogName: string;
  passengerId: number;
  customerId: number;
  bookingId: number;
}

export default function PassengerDialogContent({
  dialogName,
  passengerId,
  customerId,
  bookingId,
}: PassengerDialogContentProps) {
  return (
    <PassengerFormDialogBoot dialogName={dialogName} passengerId={passengerId} customerId={customerId} bookingId={bookingId}>
      <PassengerDialogForm />
    </PassengerFormDialogBoot>
  );
}
