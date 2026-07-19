// @ts-nocheck
import React, { createContext, useContext } from 'react';
import { DialogContent } from '@/components';
import { usePassenger } from '@/hooks/query/passengers/queries';

interface PassengerFormDialogBootContext {
  dialogName: string;
  passengerId: number;
  customerId: number;
  bookingId: number;
  passenger: any;
  isPassengerLoading: boolean;
  isNewMode: boolean;
}

const PassengerFormDialogBootContext =
  createContext<PassengerFormDialogBootContext>(
    {} as PassengerFormDialogBootContext,
  );

interface PassengerFormDialogBootProps {
  dialogName: string;
  passengerId: number;
  customerId: number;
  bookingId: number;
  children: React.ReactNode;
}

export function PassengerFormDialogBoot({
  dialogName,
  passengerId,
  customerId,
  bookingId,
  children,
}: PassengerFormDialogBootProps) {
  const isNewMode = !passengerId;

  const {
    data: passenger,
    isLoading: isPassengerLoading,
  } = usePassenger(passengerId, {
    enabled: !!passengerId,
  });

  const provider = {
    dialogName,
    passengerId,
    customerId,
    bookingId,
    passenger,
    isPassengerLoading,
    isNewMode,
  };

  return (
    <DialogContent isLoading={isPassengerLoading && !isNewMode}>
      <PassengerFormDialogBootContext.Provider value={provider}>
        {children}
      </PassengerFormDialogBootContext.Provider>
    </DialogContent>
  );
}

export function usePassengerFormDialogBoot() {
  return useContext(PassengerFormDialogBootContext);
}
