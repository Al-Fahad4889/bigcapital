// @ts-nocheck
import React, { lazy } from 'react';
import styled from 'styled-components';
import { Dialog, DialogSuspense } from '@/components';
import withDialogRedux from '@/components/DialogReduxConnect';
import { compose } from '@/utils';

const TravelServiceTypeDialogContent = lazy(
  () => import('./TravelServiceTypeDialogContent'),
);

function TravelServiceTypeDialog({
  dialogName,
  payload = { action: '', id: null },
  isOpen,
}) {
  return (
    <TravelServiceTypeDialogRoot
      name={dialogName}
      title={payload.id ? 'Edit Travel Service Type' : 'Create Travel Service Type'}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <TravelServiceTypeDialogContent
          dialogName={dialogName}
          travelServiceTypeId={payload.id}
        />
      </DialogSuspense>
    </TravelServiceTypeDialogRoot>
  );
}

const TravelServiceTypeDialogRoot = styled(Dialog)`
  max-width: 450px;
`;

export default compose(withDialogRedux())(TravelServiceTypeDialog);
