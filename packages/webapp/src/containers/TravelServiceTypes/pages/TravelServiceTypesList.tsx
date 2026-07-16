// @ts-nocheck
import React from 'react';

import { DashboardPageContent } from '@/components';
import { TravelServiceTypesLandingProvider } from '../containers/TravelServiceTypesLandingProvider';
import TravelServiceTypesActionsBar from '../containers/TravelServiceTypesLandingActionsBar';
import TravelServiceTypesDataTable from '../containers/TravelServiceTypesLandingTable';

export default function TravelServiceTypesList() {
  return (
    <TravelServiceTypesLandingProvider>
      <TravelServiceTypesActionsBar />

      <DashboardPageContent>
        <TravelServiceTypesDataTable />
      </DashboardPageContent>
    </TravelServiceTypesLandingProvider>
  );
}
