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

const blinkStyles = `
  @keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.blink-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #EF4444;
  animation: blink 1s ease-in-out infinite;
  display: inline-block;
}`


const vatRateAccessor = (type) => {
  const taxRate = type.tax_rate;
  if (!taxRate) return <span className={Classes.TEXT_MUTED}>None</span>;

  return (
    <>
      <style>{blinkStyles}</style>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {!taxRate.active && <span className="blink-dot" />}
        <Tag minimal round={false} intent={Intent.NONE} interactive>
          {taxRate.rate}%
        </Tag>
      </span>
    </>
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
