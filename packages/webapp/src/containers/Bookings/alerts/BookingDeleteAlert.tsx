// @ts-nocheck
import React from 'react';
import { Intent, Alert } from '@blueprintjs/core';
import { AppToaster, FormattedMessage as T } from '@/components';
import useApiRequest from '@/hooks/useRequest';
import { withAlertStoreConnect } from '@/containers/Alert/withAlertStoreConnect';
import { withAlertActions } from '@/containers/Alert/withAlertActions';
import { compose } from '@/utils';

function BookingDeleteAlert({
  name,
  isOpen,
  payload: { bookingId },
  closeAlert,
}) {
  const apiRequest = useApiRequest();
  const [isLoading, setLoading] = React.useState(false);

  const handleCancel = () => closeAlert(name);
  const handleConfirm = () => {
    setLoading(true);
    apiRequest
      .delete(`bookings/${bookingId}`)
      .then(() => {
        AppToaster.show({ message: 'Booking deleted.', intent: Intent.SUCCESS });
      })
      .catch(() => {
        AppToaster.show({ message: 'Something went wrong.', intent: Intent.DANGER });
      })
      .finally(() => {
        setLoading(false);
        closeAlert(name);
      });
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
      <p>Are you sure you want to delete this booking?</p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(BookingDeleteAlert);
