// @ts-nocheck
import React from 'react';
import { NavbarGroup, Button, Classes } from '@blueprintjs/core';
import {
  DashboardActionsBar,
  Can,
  Icon,
} from '@/components';
import { AbilitySubject, BookingAction } from '@/constants/abilityOption';
import { withDialogActions } from '@/containers/Dialog/withDialogActions';
import { DialogsName } from '@/constants/dialogs';
import { compose } from '@/utils';

function BookingsLandingActionsBar({
  openDialog,
}) {
  const onClickNewItem = () => {
    openDialog(DialogsName.BookingForm);
  };

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <Can I={BookingAction.Create} a={AbilitySubject.Booking}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="plus" />}
            text={'New Booking'}
            onClick={onClickNewItem}
          />
        </Can>
      </NavbarGroup>
    </DashboardActionsBar>
  );
}

export default compose(withDialogActions)(BookingsLandingActionsBar);
