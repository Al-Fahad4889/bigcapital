// @ts-nocheck
import React from 'react';
import { Button, Intent, Classes } from '@blueprintjs/core';
import { FormattedMessage as T } from '@/components';
import { useBookingFormPageContext } from './BookingFormPageProvider';

export function BookingFormFooter() {
  const { isNewMode } = useBookingFormPageContext();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 8,
        padding: '0 20px',
      }}
    >
      <Button
        className={Classes.MINIMAL}
        onClick={() => window.history.back()}
        style={{ minWidth: '75px' }}
      >
        <T id={'cancel'} />
      </Button>
      <Button
        intent={Intent.PRIMARY}
        type="submit"
        style={{ minWidth: '95px' }}
      >
        <T id={'save'} />
      </Button>
    </div>
  );
}
