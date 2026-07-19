// @ts-nocheck
import React from 'react';
import clsx from 'classnames';

import { Card } from '@/components';

import CustomerDetailsActionsBar from './CustomerDetailsActionsBar';
import CustomerDetailsHeader from './CustomerDetailsHeader';
import PassengersSection from './PassengersSection';

import { useCustomerDetailsDrawerContext } from './CustomerDetailsDrawerProvider';

import Style from './CustomerDetailsDrawer.module.scss';

/**
 * contact detail.
 */
export default function CustomerDetails() {
  const { customerId } = useCustomerDetailsDrawerContext();

  return (
    <div className={clsx(Style.root)}>
      <CustomerDetailsActionsBar />

      <Card>
        <CustomerDetailsHeader />
      </Card>

      <PassengersSection customerId={customerId} />
    </div>
  );
}
