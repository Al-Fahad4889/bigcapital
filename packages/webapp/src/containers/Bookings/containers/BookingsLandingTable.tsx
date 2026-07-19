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
import { withDrawerActions } from '@/containers/Drawer/withDrawerActions';
import { withDashboardActions } from '@/containers/Dashboard/withDashboardActions';
import { withSettings } from '@/containers/Settings/withSettings';

import { DRAWERS } from '@/constants/drawers';
import { useBookingsTableColumns } from './_utils';
import { useBookingsLandingContext } from './BookingsLandingProvider';
import { BookingsLandingEmptyState } from './BookingsLandingEmptyState';
import { BookingsTableActionsMenu } from './_components';
import { compose } from '@/utils';
import { DialogsName } from '@/constants/dialogs';

function BookingsLandingTable({
  openAlert,
  openDialog,
  openDrawer,
}) {
  const { types, isTypesLoading, isEmptyStatus } =
    useBookingsLandingContext();

  const columns = useBookingsTableColumns();

  const handleDelete = ({ id }) => {
    openAlert('booking-delete', { bookingId: id });
  };

  const handleEdit = (type) => {
    openDialog(DialogsName.BookingForm, { id: type.id });
  };

  const handleCellClick = (cell) => {
    openDrawer(DRAWERS.BOOKING_DETAILS, { bookingId: cell.row.original.id });
  };

  if (isEmptyStatus) {
    return <BookingsLandingEmptyState />;
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
        ContextMenu={BookingsTableActionsMenu}
        onCellClick={handleCellClick}
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
  withDrawerActions,
  withSettings(({ invoiceSettings }) => ({
    invoicesTableSize: invoiceSettings?.tableSize,
  })),
)(BookingsLandingTable);
