// @ts-nocheck
import React, { createContext, useContext } from 'react';
import { DialogContent } from '@/components';
import { useTravelServiceType } from '@/hooks/query/travel-service-types/queries';
import { useTaxRates } from '@/hooks/query/taxRates';

interface TravelServiceTypeFormDialogBootContext {
  dialogName: string;
  travelServiceTypeId: number;
  travelServiceType: any;
  isTravelServiceTypeLoading: boolean;
  taxRates: any[];
  isTaxRatesLoading: boolean;
  isNewMode: boolean;
}

const TravelServiceTypeFormDialogBootContext =
  createContext<TravelServiceTypeFormDialogBootContext>(
    {} as TravelServiceTypeFormDialogBootContext,
  );

interface TravelServiceTypeFormDialogBootProps {
  dialogName: string;
  travelServiceTypeId: number;
  children: React.ReactNode;
}

export function TravelServiceTypeFormDialogBoot({
  dialogName,
  travelServiceTypeId,
  children,
}: TravelServiceTypeFormDialogBootProps) {
  const isNewMode = !travelServiceTypeId;

  const { data: taxRates, isLoading: isTaxRatesLoading } = useTaxRates();

  const {
    data: travelServiceType,
    isLoading: isTravelServiceTypeLoading,
  } = useTravelServiceType(travelServiceTypeId, {
    enabled: !!travelServiceTypeId,
  });

  const provider = {
    dialogName,
    travelServiceTypeId,
    travelServiceType,
    isTravelServiceTypeLoading,
    taxRates,
    isTaxRatesLoading,
    isNewMode,
  };

  return (
    <DialogContent isLoading={isTravelServiceTypeLoading && !isNewMode}>
      <TravelServiceTypeFormDialogBootContext.Provider value={provider}>
        {children}
      </TravelServiceTypeFormDialogBootContext.Provider>
    </DialogContent>
  );
}

export function useTravelServiceTypeFormDialogBoot() {
  return useContext(TravelServiceTypeFormDialogBootContext);
}
