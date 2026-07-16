// @ts-nocheck
import React from 'react';
import { Intent, Tag, Classes } from '@blueprintjs/core';
import { Align } from '@/constants';
import clsx from 'classnames';
import { TravelServiceTypeActionsCell } from './_components';

const nameAccessor = (type) => {
  return <span>{type.name}</span>;
};

const descriptionAccessor = (type) => {
  return (
    <span className={clsx(Classes.TEXT_MUTED)}>{type.description || '—'}</span>
  );
};

const vatRateAccessor = (type) => {
  return (
    <Tag minimal={true} round={false} intent={Intent.NONE} interactive={true}>
      {type.taxRate?.name ?? type.taxRateId ?? 'None'}
    </Tag>
  );
};

const statusAccessor = (type) => {
  return type.active ? (
    <Tag round={false} intent={Intent.SUCCESS}>
      Active
    </Tag>
  ) : (
    <Tag round={false} intent={Intent.NONE}>
      Inactive
    </Tag>
  );
};

export const useTravelServiceTypesTableColumns = () => {
  return React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: nameAccessor,
        width: 60,
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: descriptionAccessor,
        width: 100,
      },
      {
        id: 'vatRate',
        Header: 'VAT Rate',
        accessor: vatRateAccessor,
        width: 30,
      },
      {
        id: 'status',
        Header: 'Status',
        accessor: statusAccessor,
        width: 30,
        align: Align.Right,
      },
      {
        id: 'actions',
        Header: 'Actions',
        Cell: TravelServiceTypeActionsCell,
        width: 20,
        disableSortBy: true,
        align: Align.Center,
      },
    ],
    [],
  );
};
