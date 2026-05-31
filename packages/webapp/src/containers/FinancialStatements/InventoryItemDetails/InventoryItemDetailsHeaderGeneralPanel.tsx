import React from 'react';
import { ItemsMultiSelect, Row, Col, FFormGroup } from '@/components';
import { FinancialStatementDateRange } from '../FinancialStatementDateRange';

import {
  InventoryItemDetailsHeaderGeneralProvider,
  useInventoryItemDetailsHeaderGeneralContext,
} from './InventoryItemDetailsHeaderGeneralProvider';
import intl from 'react-intl-universal';

/**
 * Inventory item details header - General panel.
 */
export function InventoryItemDetailsHeaderGeneralPanel() {
  return (
    <InventoryItemDetailsHeaderGeneralProvider>
      <InventoryItemDetailsHeaderGeneralPanelContent />
    </InventoryItemDetailsHeaderGeneralProvider>
  );
}

/**
 * Inventory item details header - General panel - Content.
 */
function InventoryItemDetailsHeaderGeneralPanelContent() {
  const { items } = useInventoryItemDetailsHeaderGeneralContext();

  return (
    <div>
      <FinancialStatementDateRange />

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
