import React from 'react';
import { FinancialStatementDateRange } from '../FinancialStatementDateRange';
import { FinancialStatementsFilter } from '../FinancialStatementsFilter';
import { Row, Col, CustomersMultiSelect, FFormGroup } from '@/components';
import { filterCustomersOptions } from '../constants';

import {
  CustomersTransactionsGeneralPanelProvider,
  useCustomersTransactionsGeneralPanelContext,
} from './CustomersTransactionsHeaderGeneralPanelProvider';
import intl from 'react-intl-universal';

/**
 * Customers transactions header - General panel.
 */
export function CustomersTransactionsHeaderGeneralPanel() {
  return (
    <CustomersTransactionsGeneralPanelProvider>
      <CustomersTransactionsHeaderGeneralPanelContent />
    </CustomersTransactionsGeneralPanelProvider>
  );
}

/**
 * Customers transactions header - General panel - Content.
 */
function CustomersTransactionsHeaderGeneralPanelContent() {
  const { customers } = useCustomersTransactionsGeneralPanelContext();

  return (
    <div>
      <FinancialStatementDateRange />

      <Row>
        <Col xs={4}>
          <FinancialStatementsFilter
            items={filterCustomersOptions}
            label={intl.get('customers.label_filter_customers')}
            initialSelectedItem={'with-transactions'}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <FFormGroup
            label={intl.get('specific_customers')}
            name={'customersIds'}
          >
            <CustomersMultiSelect name={'customersIds'} items={customers} />
          </FFormGroup>
        </Col>
      </Row>
    </div>
  );
}
