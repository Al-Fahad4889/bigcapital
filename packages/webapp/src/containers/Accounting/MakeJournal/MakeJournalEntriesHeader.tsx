// @ts-nocheck
import React from 'react';
import {
  Group,
  PageForm,
  PageFormBigNumber,

} from '@/components';
import MakeJournalEntriesHeaderFields from './MakeJournalEntriesHeaderFields';
import { useManualJournalTotalFormatted } from './utils';
import intl from 'react-intl-universal';

export default function MakeJournalEntriesHeader() {
  return (
    <PageForm.Header>
      <MakeJournalEntriesHeaderFields />
      <MakeJournalHeaderBigNumber />
    </PageForm.Header>
  );
}

/**
 * Big total number of make journal header.
 * @returns {React.ReactNode}
 */
function MakeJournalHeaderBigNumber() {
  const totalFormatted = useManualJournalTotalFormatted();

  return (
    <PageFormBigNumber label={intl.get('amount')} amount={totalFormatted} />
  );
}
