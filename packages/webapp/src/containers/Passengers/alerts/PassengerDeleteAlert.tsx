// @ts-nocheck
import React from 'react';
import { Intent, Alert } from '@blueprintjs/core';
import { AppToaster, FormattedMessage as T } from '@/components';
import { useDeletePassenger } from '@/hooks/query/passengers/queries';
import { withAlertStoreConnect } from '@/containers/Alert/withAlertStoreConnect';
import { withAlertActions } from '@/containers/Alert/withAlertActions';
import { compose } from '@/utils';

function PassengerDeleteAlert({
  name,
  isOpen,
  payload: { passengerId, customerId },
  closeAlert,
}) {
  const { mutateAsync: deletePassenger, isLoading } = useDeletePassenger();

  const handleCancel = () => closeAlert(name);
  const handleConfirm = () => {
    deletePassenger([passengerId, customerId])
      .then(() => {
        AppToaster.show({
          message: 'Passenger removed successfully.',
          intent: Intent.SUCCESS,
        });
      })
      .catch(() => {
        AppToaster.show({
          message: 'Something went wrong.',
          intent: Intent.DANGER,
        });
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
      <p>Are you sure you want to remove this passenger?</p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(PassengerDeleteAlert);
