// @ts-nocheck
import React from 'react';
import { Button, Tag, Intent, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import { Card, Can, Icon, AppToaster, FormattedMessage as T } from '@/components';
import { safeCallback } from '@/utils';
import {
  AbilitySubject,
  PassengerAction,
} from '@/constants/abilityOption';
import { usePassengers, useDeletePassenger } from '@/hooks/query/passengers/queries';
import { DialogsName } from '@/constants/dialogs';
import { withDialogActions } from '@/containers/Dialog/withDialogActions';
import { withAlertActions } from '@/containers/Alert/withAlertActions';
import { compose } from '@/utils';

function maskDocumentNumber(number) {
  if (!number) return '—';
  if (number.length <= 4) return number;
  return `${number.slice(0, 4)}${'*'.repeat(number.length - 4)}`;
}

function PassengersTable({ customerId, openDialog, openAlert }) {
  const { data: passengers, isLoading } = usePassengers(customerId);
  const { mutateAsync: deletePassenger } = useDeletePassenger();

  const rows = passengers || [];

  const handleEdit = (passenger) => {
    openDialog(DialogsName.PassengerForm, {
      id: passenger.id,
      customerId,
    });
  };

  const handleDelete = (passenger) => {
    openAlert('passenger-delete', { id: passenger.id, customerId });
  };

  return (
    <Card>
      <Card.Header>
        <T id={'passenger.label.passengers'} />
        <Can I={PassengerAction.Create} a={AbilitySubject.PII}>
          <Button
            small
            minimal
            intent={Intent.PRIMARY}
            onClick={() =>
              openDialog(DialogsName.PassengerForm, { customerId })
            }
          >
            <T id={'passenger.label.add_passenger'} />
          </Button>
        </Can>
      </Card.Header>

      {isLoading ? (
        <p style={{ color: '#5c7080' }}>Loading…</p>
      ) : rows.length === 0 ? (
        <p style={{ color: '#5c7080' }}>
          <T id={'passenger.label.no_passengers'} />
        </p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#5c7080', fontSize: 12 }}>
              <th>#</th>
              <th><T id={'passenger.label.full_name'} /></th>
              <th><T id={'passenger.label.passport_number'} /></th>
              <th><T id={'passenger.label.visa_status'} /></th>
              <th><T id={'passenger.label.expiry_date'} /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p, idx) => (
              <tr key={p.id} style={{ borderTop: '1px solid #e1e8ed', fontSize: 13 }}>
                <td>{idx + 1}</td>
                <td>{p.identityDocument?.fullName || '—'}</td>
                <td>{maskDocumentNumber(p.identityDocument?.documentNumber)}</td>
                <td>
                  <Tag round={false} minimal>
                    {p.visaStatus || 'none'}
                  </Tag>
                </td>
                <td>
                  {p.identityDocument?.expiresAt
                    ? new Date(p.identityDocument.expiresAt).toLocaleDateString()
                    : '—'}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Can I={PassengerAction.Edit} a={AbilitySubject.PII}>
                    <Button
                      minimal
                      small
                      icon={<Icon icon="pen-18" />}
                      onClick={safeCallback(handleEdit, p)}
                    />
                  </Can>
                  <Can I={PassengerAction.Delete} a={AbilitySubject.PII}>
                    <Button
                      minimal
                      small
                      intent={Intent.DANGER}
                      icon={<Icon icon="trash" />}
                      onClick={safeCallback(handleDelete, p)}
                    />
                  </Can>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

export default compose(
  withDialogActions,
  withAlertActions,
)(PassengersTable);
