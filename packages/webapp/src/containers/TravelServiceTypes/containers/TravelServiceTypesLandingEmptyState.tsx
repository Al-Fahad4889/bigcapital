// @ts-nocheck
import React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import * as R from 'ramda';
import { EmptyStatus, Can, FormattedMessage as T } from '@/components';
import { TravelServiceTypeAction, AbilitySubject } from '@/constants/abilityOption';
import { withDialogActions } from '@/containers/Dialog/withDialogActions';
import { DialogsName } from '@/constants/dialogs';

function TravelServiceTypesLandingEmptyStateRoot({
  openDialog,
}) {
  return (
    <EmptyStatus
      title={"The organization doesn't have travel service types, yet!"}
      description={
        <p>
          Setup the travel service types to start categorizing your travel-related items and services.
        </p>
      }
      action={
        <>
          <Can I={TravelServiceTypeAction.Create} a={AbilitySubject.TravelServiceType}>
            <Button
              intent={Intent.PRIMARY}
              large={true}
              onClick={() => {
                openDialog(DialogsName.TravelServiceTypeForm);
              }}
            >
              New travel service type
            </Button>
            <Button intent={Intent.NONE} large={true}>
              <T id={'learn_more'} />
            </Button>
          </Can>
        </>
      }
    />
  );
}

export const TravelServiceTypesLandingEmptyState = R.compose(withDialogActions)(
  TravelServiceTypesLandingEmptyStateRoot,
);
