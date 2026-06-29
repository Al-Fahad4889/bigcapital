import React from 'react';
import { BaseCurrency, BaseCurrencyRoot } from '@/components';
import {
  useEstimateIsForeignCustomer,
  type PaymentReceiveFormValues,
} from './utils';
import { useFormikContext } from 'formik';

/**
 * Payment receive form currency tag — renders the customer's currency badge
 * when the customer uses a foreign currency.
 */
export function PaymentReceiveFormCurrencyTag() {
  const isForeignCustomer = useEstimateIsForeignCustomer();
  const { values } = useFormikContext<PaymentReceiveFormValues>();

  if (!isForeignCustomer) {
    return null;
  }

  return (
    <BaseCurrencyRoot>
      <BaseCurrency currency={values.currencyCode} />
    </BaseCurrencyRoot>
  );
}
