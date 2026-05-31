import React from 'react';

import { FinancialStatementDateRange } from '../FinancialStatementDateRange';
import { FinancialStatementsFilter } from '../FinancialStatementsFilter';

import { Row, Col, FFormGroup, VendorsMultiSelect } from '@/components';
import { filterVendorsOptions } from '../constants';

import {
  VendorsTransactionsGeneralPanelProvider,
  useVendorsTransactionsGeneralPanelContext,
} from './VendorsTransactionsHeaderGeneralPanelProvider';
import intl from 'react-intl-universal';

/**
 * Vendors transactions header - General panel
 */
export function VendorsTransactionsHeaderGeneralPanel() {
  return (
    <VendorsTransactionsGeneralPanelProvider>
      <VendorsTransactionsHeaderGeneralPanelContent />
    </VendorsTransactionsGeneralPanelProvider>
  );
}

/**
 * Vendors transactions header - General panel - Content.
 */
function VendorsTransactionsHeaderGeneralPanelContent() {
  const { vendors } = useVendorsTransactionsGeneralPanelContext();

  return (
    <div>
      <FinancialStatementDateRange />

      <Row>
        <Col xs={4}>
          <FinancialStatementsFilter
            items={filterVendorsOptions}
            label={intl.get('vendors.label_filter_vendors')}
            initialSelectedItem={'all-vendors'}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <FFormGroup label={intl.get('specific_vendors')} name={'vendorsIds'}>
            <VendorsMultiSelect name={'vendorsIds'} items={vendors} />
          </FFormGroup>
        </Col>
      </Row>
    </div>
  );
}
