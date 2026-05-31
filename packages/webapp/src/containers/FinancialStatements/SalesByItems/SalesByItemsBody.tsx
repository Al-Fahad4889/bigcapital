import React from 'react';
import * as R from 'ramda';
import { FinancialReportBody } from '../FinancialReportPage';
import { FinancialSheetSkeleton } from '@/components/FinancialSheet';
import { useSalesByItemsContext } from './SalesByItemProvider';
import { SalesByItemsTable } from './SalesByItemsTable';
import {
  withCurrentOrganization,
  WithCurrentOrganizationProps,
} from '@/containers/Organization/withCurrentOrganization';

interface SalesByItemsBodyJSXProps {
  organizationName: WithCurrentOrganizationProps['organization']['name'];
}

/**
 * Sales by items body.
 */
function SalesByItemsBodyJSX({ organizationName }: SalesByItemsBodyJSXProps) {
  const { isLoading } = useSalesByItemsContext();

  return (
    <FinancialReportBody>
      {isLoading ? (
        <FinancialSheetSkeleton />
      ) : (
        <SalesByItemsTable companyName={organizationName} />
      )}
    </FinancialReportBody>
  );
}

export const SalesByItemsBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(SalesByItemsBodyJSX);
