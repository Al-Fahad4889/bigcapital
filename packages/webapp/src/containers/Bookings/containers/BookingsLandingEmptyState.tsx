// @ts-nocheck
import React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import * as R from 'ramda';
import { EmptyStatus, Can, FormattedMessage as T } from '@/components';
import { BookingAction, AbilitySubject } from '@/constants/abilityOption';
import { withDialogActions } from '@/containers/Dialog/withDialogActions';
import { DialogsName } from '@/constants/dialogs';

function BookingsLandingEmptyStateRoot({
  openDialog,
}) {
  return (
    <EmptyStatus
      title={"The organization doesn't have bookings, yet!"}
      description={
        <p>
          Setup the travel service types to start categorizing your travel-related items and services.
        </p>
      }
      action={
        <>
          <Can I={BookingAction.Create} a={AbilitySubject.Booking}>
            <Button
              intent={Intent.PRIMARY}
              large={true}
              onClick={() => {
                openDialog(DialogsName.BookingForm);
              }}
            >
              New booking
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

export const BookingsLandingEmptyState = R.compose(withDialogActions)(
  BookingsLandingEmptyStateRoot,
);
