// @ts-nocheck
import React from 'react';
import { NavbarGroup, Button, Classes } from '@blueprintjs/core';
import {
  DashboardActionsBar,
  Can,
  Icon,
} from '@/components';
import { AbilitySubject, TravelServiceTypeAction } from '@/constants/abilityOption';
import { withDialogActions } from '@/containers/Dialog/withDialogActions';
import { DialogsName } from '@/constants/dialogs';
import { compose } from '@/utils';

function TravelServiceTypesActionsBar({
  openDialog,
}) {
  const onClickNewItem = () => {
    openDialog(DialogsName.TravelServiceTypeForm);
  };

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <Can I={TravelServiceTypeAction.Create} a={AbilitySubject.TravelServiceType}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="plus" />}
            text={'New Travel Service Type'}
            onClick={onClickNewItem}
          />
        </Can>
      </NavbarGroup>
    </DashboardActionsBar>
  );
}

export default compose(withDialogActions)(TravelServiceTypesActionsBar);
