// @ts-nocheck
import React, { lazy } from 'react';
import styled from 'styled-components';
import { Dialog, DialogSuspense } from '@/components';
import withDialogRedux from '@/components/DialogReduxConnect';
import { compose } from '@/utils';

const PassengerDialogContent = lazy(
  () => import('./PassengerDialogContent'),
);

function PassengerFormDialog({
  dialogName,
  payload = { action: '', id: null, customerId: null, bookingId: null },
  isOpen,
}) {
  return (
    <PassengerFormDialogRoot
      name={dialogName}
      title={payload.id ? 'Edit Passenger' : 'Add Passenger'}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <PassengerDialogContent
          dialogName={dialogName}
          passengerId={payload.id}
          customerId={payload.customerId}
          bookingId={payload.bookingId}
        />
      </DialogSuspense>
    </PassengerFormDialogRoot>
  );
}

const PassengerFormDialogRoot = styled(Dialog)`
  max-width: 550px;
`;

export default compose(withDialogRedux())(PassengerFormDialog);
