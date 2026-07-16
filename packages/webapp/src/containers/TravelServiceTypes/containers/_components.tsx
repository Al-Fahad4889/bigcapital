// @ts-nocheck
import React, { useContext } from 'react';
import { Button, Classes, Intent, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Can, Icon } from '@/components';
import { AbilitySubject, TravelServiceTypeAction } from '@/constants/abilityOption';
import { safeCallback } from '@/utils';
import TableContext from '@/components/Datatable/TableContext';

export function TravelServiceTypesTableActionsMenu({
  payload: { onEdit, onDelete },
  row: { original },
}) {
  return (
    <Menu>
      <Can I={TravelServiceTypeAction.Edit} a={AbilitySubject.TravelServiceType}>
        <MenuItem
          icon={<Icon icon="pen-18" />}
          text={'Edit Travel Service Type'}
          onClick={safeCallback(onEdit, original)}
        />
      </Can>
      <Can I={TravelServiceTypeAction.Delete} a={AbilitySubject.TravelServiceType}>
        <MenuDivider />
        <MenuItem
          text={'Delete Travel Service Type'}
          intent={Intent.DANGER}
          onClick={safeCallback(onDelete, original)}
          icon={<Icon icon="trash-16" iconSize={16} />}
        />
      </Can>
    </Menu>
  );
}

export function TravelServiceTypeActionsCell({ row }) {
  const { table } = useContext(TableContext);
  const { onEdit, onDelete } = table.payload;
  const type = row.original;

  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      <Can I={TravelServiceTypeAction.Edit} a={AbilitySubject.TravelServiceType}>
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="pen-18" />}
          small
          onClick={() => onEdit(type)}
        />
      </Can>
      <Can I={TravelServiceTypeAction.Delete} a={AbilitySubject.TravelServiceType}>
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
