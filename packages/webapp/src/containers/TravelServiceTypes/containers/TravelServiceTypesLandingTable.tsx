// @ts-nocheck
import React from 'react';
import {
  DataTable,
  DashboardContentTable,
  TableSkeletonHeader,
  TableSkeletonRows,
} from '@/components';

import { withAlertActions } from '@/containers/Alert/withAlertActions';
import { withDialogActions } from '@/containers/Dialog/withDialogActions';
import { withDashboardActions } from '@/containers/Dashboard/withDashboardActions';
import { withSettings } from '@/containers/Settings/withSettings';

import { useTravelServiceTypesTableColumns } from './_utils';
import { useTravelServiceTypesLandingContext } from './TravelServiceTypesLandingProvider';
import { TravelServiceTypesLandingEmptyState } from './TravelServiceTypesLandingEmptyState';
import { TravelServiceTypesTableActionsMenu } from './_components';
import { compose } from '@/utils';
import { DialogsName } from '@/constants/dialogs';

function TravelServiceTypesDataTable({
  openAlert,
  openDialog,
}) {
  const { types, isTypesLoading, isEmptyStatus } =
    useTravelServiceTypesLandingContext();

  const columns = useTravelServiceTypesTableColumns();

  const handleDelete = ({ id }) => {
    openAlert('travel-service-type-delete', { travelServiceTypeId: id });
  };

  const handleEdit = (type) => {
    openDialog(DialogsName.TravelServiceTypeForm, { id: type.id });
  };

  if (isEmptyStatus) {
    return <TravelServiceTypesLandingEmptyState />;
  }

  return (
    <DashboardContentTable>
      <DataTable
        columns={columns}
        data={types}
        loading={isTypesLoading}
        headerLoading={isTypesLoading}
        progressBarLoading={isTypesLoading}
        manualSortBy={false}
        selectionColumn={false}
        noInitialFetch={true}
        sticky={true}
        pagination={false}
        manualPagination={false}
        autoResetSortBy={false}
        autoResetPage={false}
        TableLoadingRenderer={TableSkeletonRows}
        TableHeaderSkeletonRenderer={TableSkeletonHeader}
        ContextMenu={TravelServiceTypesTableActionsMenu}
        size={'medium'}
        payload={{
          onDelete: handleDelete,
          onEdit: handleEdit,
        }}
      />
    </DashboardContentTable>
  );
}


export default compose(
  withDashboardActions,
  withAlertActions,
  withDialogActions,
  withSettings(({ invoiceSettings }) => ({
    invoicesTableSize: invoiceSettings?.tableSize,
  })),
)(TravelServiceTypesDataTable);
