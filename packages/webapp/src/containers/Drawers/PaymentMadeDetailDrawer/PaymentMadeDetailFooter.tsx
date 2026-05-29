// @ts-nocheck
import React from 'react';

import {
  T,
  CommercialDocFooter,
  DetailsMenu,
  If,
  DetailItem,
} from '@/components';
import { usePaymentMadeDetailContext } from './PaymentMadeDetailProvider';
import intl from 'react-intl-universal';

/**
 * Payment made - Details panel - Footer.
 */
export function PaymentMadeDetailFooter() {
  const { paymentMade } = usePaymentMadeDetailContext();

  return (
    <CommercialDocFooter>
      <DetailsMenu direction={'horizantal'} minLabelSize={'180px'}>
        <If condition={paymentMade.statement}>
          <DetailItem
            label={intl.get('payment_made.details.statement')}
            multiline
          >
            {paymentMade.statement}
          </DetailItem>
        </If>
      </DetailsMenu>
    </CommercialDocFooter>
  );
}
