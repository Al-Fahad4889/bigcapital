// @ts-nocheck
import React, { useContext } from 'react';
import { Button, Classes, Intent, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Can, Icon } from '@/components';
import { AbilitySubject, BookingAction } from '@/constants/abilityOption';
import { safeCallback } from '@/utils';
import TableContext from '@/components/Datatable/TableContext';

export function BookingsTableActionsMenu({
  payload: { onEdit, onDelete },
  row: { original },
}) {
  return (
    <Menu>
      <Can I={BookingAction.Edit} a={AbilitySubject.Booking}>
        <MenuItem
          icon={<Icon icon="pen-18" />}
          text={'Edit Booking'}
          onClick={safeCallback(onEdit, original)}
        />
      </Can>
      <Can I={BookingAction.Delete} a={AbilitySubject.Booking}>
        <MenuDivider />
        <MenuItem
          text={'Delete Booking'}
          intent={Intent.DANGER}
          onClick={safeCallback(onDelete, original)}
          icon={<Icon icon="trash-16" iconSize={16} />}
        />
      </Can>
    </Menu>
  );
}

export function BookingActionsCell({ row }) {
  const { table } = useContext(TableContext);
  const { onEdit, onDelete } = table.payload;
  const type = row.original;

  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      <Can I={BookingAction.Edit} a={AbilitySubject.Booking}>
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="pen-18" />}
          small
          onClick={() => onEdit(type)}
        />
      </Can>
      <Can I={BookingAction.Delete} a={AbilitySubject.Booking}>
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="trash" />}
          small
          intent="danger"
          onClick={() => onDelete(type)}
        />
      </Can>
    </div>
  );
}
