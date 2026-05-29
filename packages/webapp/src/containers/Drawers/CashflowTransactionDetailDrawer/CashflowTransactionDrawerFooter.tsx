// @ts-nocheck
import React from 'react';
import { CommercialDocFooter, DetailsMenu, DetailItem, T } from '@/components';
import { useCashflowTransactionDrawerContext } from './CashflowTransactionDrawerProvider';
import intl from 'react-intl-universal';

export function CashflowTransactionDrawerFooter() {
  const { cashflowTransaction } = useCashflowTransactionDrawerContext();

  return (
    <CommercialDocFooter>
      <DetailsMenu direction={'horizantal'} minLabelSize={'180px'}>
        <DetailItem
          label={intl.get('cash_flow.drawer.label.statement')}
          multiline
        >
          {cashflowTransaction.description}
        </DetailItem>
      </DetailsMenu>
    </CommercialDocFooter>
  );
}
