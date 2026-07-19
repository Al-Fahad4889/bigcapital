// @ts-nocheck
import React from 'react';
import { Intent, Tag } from '@blueprintjs/core';
import { Card, FormattedMessage as T, AppToaster, DetailsBarSkeletonBase } from '@/components';
import { useManifests, useGenerateManifest } from '@/hooks/query/manifests/queries';
import { useTravelDocuments } from '@/hooks/query/travelDocuments/queries';
import { useBookingDetailDrawerContext } from './BookingDetailDrawerProvider';

function TravelDocumentsTable({ manifestId }) {
  const { data: documents, isLoading } = useTravelDocuments(manifestId);

  if (isLoading) {
    return <DetailsBarSkeletonBase className={'bp3-skeleton'} />;
  }
  const docs = documents || [];
  if (docs.length === 0) {
    return null;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
      <thead>
        <tr style={{ textAlign: 'left', color: '#5c7080', fontSize: 12 }}>
          <th><T id={'manifest.label.document_reference'} /></th>
          <th><T id={'manifest.label.passenger'} /></th>
          <th><T id={'manifest.label.status'} /></th>
        </tr>
      </thead>
      <tbody>
        {docs.map((doc) => (
          <tr key={doc.id} style={{ borderTop: '1px solid #e1e8ed', fontSize: 13 }}>
            <td>{doc.documentReference}</td>
            <td>{doc.passenger?.identityDocument?.fullName || doc.passenger?.fullName || '—'}</td>
            <td>
              <Tag round={false} minimal intent={doc.status === 'generated' ? Intent.SUCCESS : Intent.NONE}>
                {doc.status}
              </Tag>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function BookingDetailManifest() {
  const { bookingId } = useBookingDetailDrawerContext();
  const { data: manifests, isLoading } = useManifests(bookingId);
  const { mutateAsync: generateManifest } = useGenerateManifest();

  if (isLoading) {
    return <DetailsBarSkeletonBase className={'bp3-skeleton'} />;
  }

  const manifest = (manifests || [])[0];

  const handleGenerate = () => {
    generateManifest(bookingId)
      .then((res) => {
        AppToaster.show({
          message: 'The manifest has been generated successfully.',
          intent: Intent.SUCCESS,
        });
        const warnings = res?.data?.warnings || [];
        warnings.forEach((w) => {
          AppToaster.show({ message: w, intent: Intent.WARNING });
        });
      })
      .catch(() => {
        AppToaster.show({
          message: 'Something went wrong while generating the manifest.',
          intent: Intent.DANGER,
        });
      });
  };

  return (
    <Card>
      <Card.Header>
        <T id={'manifest.label.manifest'} />
      </Card.Header>
      {!manifest ? (
        <div>
          <p style={{ color: '#5c7080' }}>
            <T id={'manifest.label.no_manifest'} />
          </p>
          <button className={'bp3-button bp3-intent-primary'} onClick={handleGenerate}>
            <T id={'manifest.label.generate'} />
          </button>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 13 }}>
            <div><strong><T id={'manifest.label.reference'} />:</strong> {manifest.manifestReference}</div>
            <div><strong><T id={'manifest.label.status'} />:</strong> {manifest.status}</div>
            {manifest.generatedAt && (
              <div><strong><T id={'manifest.label.generated_at'} />:</strong> {new Date(manifest.generatedAt).toLocaleString()}</div>
            )}
          </div>
          <div style={{ marginTop: 12 }}>
            <strong><T id={'manifest.label.travel_documents'} /></strong>
            <TravelDocumentsTable manifestId={manifest.id} />
          </div>
        </div>
      )}
    </Card>
  );
}
