// @ts-nocheck
import React from 'react';
import { Drawer, DrawerSuspense } from '@/components';
import { withDrawers } from '@/containers/Drawer/withDrawers';

import { compose } from '@/utils';

const BookingDetailDrawerContent = React.lazy(() =>
  import('./BookingDetailDrawerContent'),
);

function BookingDetailDrawer({
  name,
  isOpen,
  payload: { bookingId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} size={'750px'} title={'Booking Details'}>
      <DrawerSuspense>
        <BookingDetailDrawerContent bookingId={bookingId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(BookingDetailDrawer);
