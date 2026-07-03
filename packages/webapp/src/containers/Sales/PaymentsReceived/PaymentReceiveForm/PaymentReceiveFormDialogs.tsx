import React from 'react';
import { useFormikContext } from 'formik';
import { index as PaymentReceiveNumberDialog } from '@/containers/Dialogs/PaymentReceiveNumberDialog';
import { ExcessPaymentDialog } from './dialogs/ExcessPaymentDialog';
import type { PaymentReceiveFormValues } from './utils';

type PaymentNumberDialogSettings = {
  transactionNumber: string;
  incrementMode: string;
};

/**
 * Payment receive form dialogs.
 */
export function PaymentReceiveFormDialogs() {
  const { setFieldValue } = useFormikContext<PaymentReceiveFormValues>();

  const handleUpdatePaymentNumber = (settings: PaymentNumberDialogSettings) => {
    setFieldValue('paymentReceiveNo', settings.transactionNumber);
    setFieldValue('paymentReceiveNoManually', '');

    if (settings.incrementMode !== 'auto') {
      setFieldValue('paymentReceiveNoManually', settings.transactionNumber);
    }
  };

  return (
    <>
      <PaymentReceiveNumberDialog
        dialogName={'payment-receive-number-form'}
        onConfirm={handleUpdatePaymentNumber}
      />
      <ExcessPaymentDialog dialogName={'payment-received-excessed-payment'} />
    </>
  );
}
