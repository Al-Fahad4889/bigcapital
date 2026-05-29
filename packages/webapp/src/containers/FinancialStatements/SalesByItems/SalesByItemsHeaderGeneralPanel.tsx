import React from 'react';
import {
  Row,
  Col,
  ItemsMultiSelect,
  FFormGroup,
} from '@/components';
import { FinancialStatementDateRange } from '../FinancialStatementDateRange';
import { FinancialStatementsFilter } from '../FinancialStatementsFilter';
import { filterItemsOptions } from '../constants';
import {
  SalesByItemGeneralPanelProvider,
  useSalesByItemsGeneralPanelContext,
} from './SalesByItemsHeaderGeneralPanelProvider';
import intl from 'react-intl-universal';

/**
 * Sales by items - Drawer header - General panel.
 */
export function SalesByItemsHeaderGeneralPanel() {
  return (
    <SalesByItemGeneralPanelProvider>
      <SalesByItemsHeaderGeneralPanelContent />
    </SalesByItemGeneralPanelProvider>
  );
}

/**
 * Sales by items - Drawer header - General panel - Content.
 */
function SalesByItemsHeaderGeneralPanelContent() {
  const { items } = useSalesByItemsGeneralPanelContext();

  return (
    <div>
      <FinancialStatementDateRange />

      <Row>
        <Col xs={4}>
          <FinancialStatementsFilter
            items={filterItemsOptions}
            label={intl.get('items.label_filter_items')}
            initialSelectedItem={'with-transactions'}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <FFormGroup label={intl.get('Specific items')} name={'itemsIds'}>
            <ItemsMultiSelect name={'itemsIds'} items={items} />
          </FFormGroup>
        </Col>
      </Row>
    </div>
  );
}
