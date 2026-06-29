import React from 'react';
import { useFormikContext } from 'formik';
import { ClearingAllLinesAlert } from '@/containers/Alerts/PaymentReceived/ClearingAllLinesAlert';
import { clearAllPaymentEntries, type PaymentReceiveFormValues } from './utils';

/**
 * Payment receive form alerts.
 */
export function PaymentReceiveFormAlerts() {
  const {
    values: { entries },
    setFieldValue,
  } = useFormikContext<PaymentReceiveFormValues>();

  const handleClearingAllLines = () => {
    const newEntries = clearAllPaymentEntries(entries);
    setFieldValue('entries', newEntries);
    setFieldValue('amount', '');
  };

  return (
    <>
      <ClearingAllLinesAlert
        name={'clear-all-lines-payment-receive'}
        onConfirm={handleClearingAllLines}
      />
    </>
  );
}
