// @ts-nocheck
import React from 'react';
import { Intent, Alert } from '@blueprintjs/core';
import { AppToaster, FormattedMessage as T } from '@/components';
import { useDeleteTravelServiceType } from '@/hooks/query/travel-service-types/queries';
import { withAlertStoreConnect } from '@/containers/Alert/withAlertStoreConnect';
import { withAlertActions } from '@/containers/Alert/withAlertActions';
import { compose } from '@/utils';

function TravelServiceTypeDeleteAlert({
  name,
  isOpen,
  payload: { travelServiceTypeId },
  closeAlert,
}) {
  const { mutateAsync: deleteTravelServiceType, isLoading } = useDeleteTravelServiceType();

  const handleCancel = () => closeAlert(name);
  const handleConfirm = () => {
    deleteTravelServiceType(travelServiceTypeId)
      .then(() => {
        AppToaster.show({ message: 'Travel service type deleted.', intent: Intent.SUCCESS });
      })
      .catch(() => {
        AppToaster.show({ message: 'Something went wrong.', intent: Intent.DANGER });
      })
      .finally(() => closeAlert(name));
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'delete'} />}
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      loading={isLoading}
    >
      <p>Are you sure you want to delete this travel service type?</p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(TravelServiceTypeDeleteAlert);
