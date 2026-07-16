// @ts-nocheck
import React from 'react';
import TravelServiceTypeDialogForm from './TravelServiceTypeDialogForm';
import { TravelServiceTypeFormDialogBoot } from './TravelServiceTypeDialogBoot';

interface TravelServiceTypeDialogContentProps {
  dialogName: string;
  travelServiceTypeId: number;
}

export default function TravelServiceTypeDialogContent({
  dialogName,
  travelServiceTypeId,
}: TravelServiceTypeDialogContentProps) {
  return (
    <TravelServiceTypeFormDialogBoot dialogName={dialogName} travelServiceTypeId={travelServiceTypeId}>
      <TravelServiceTypeDialogForm />
    </TravelServiceTypeFormDialogBoot>
  );
}
