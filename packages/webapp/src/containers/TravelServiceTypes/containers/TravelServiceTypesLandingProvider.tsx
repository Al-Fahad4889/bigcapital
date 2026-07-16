// @ts-nocheck
import React from 'react';
import { isEmpty } from 'lodash';
import { DashboardInsider } from '@/components/Dashboard';
import { useTravelServiceTypes } from '@/hooks/query/travel-service-types/queries';

const TravelServiceTypesLandingContext = React.createContext();

function TravelServiceTypesLandingProvider({ ...props }) {
  const {
    data: types,
    isFetching: isTypesFetching,
    isLoading: isTypesLoading,
  } = useTravelServiceTypes();

  const isEmptyStatus = isEmpty(types) && !isTypesLoading;

  const provider = {
    types,
    isTypesFetching,
    isTypesLoading,
    isEmptyStatus,
  };

  return (
    <DashboardInsider name={'travel-service-types'}>
      <TravelServiceTypesLandingContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const useTravelServiceTypesLandingContext = () =>
  React.useContext(TravelServiceTypesLandingContext);

export { TravelServiceTypesLandingProvider, useTravelServiceTypesLandingContext };
