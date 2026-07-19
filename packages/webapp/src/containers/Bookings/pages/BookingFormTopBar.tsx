// @ts-nocheck
import React from 'react';
import { Alignment, NavbarGroup, Classes } from '@blueprintjs/core';
import { FormTopbar, DetailsBarSkeletonBase } from '@/components';

export function BookingFormTopBar() {
  return (
    <FormTopbar>
      <NavbarGroup align={Alignment.LEFT}>
        <span className={Classes.TEXT_MUTED}>Booking</span>
      </NavbarGroup>
    </FormTopbar>
  );
}
