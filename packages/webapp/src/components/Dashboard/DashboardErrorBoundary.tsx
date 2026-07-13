// @ts-nocheck
import React from 'react';
import { FormattedMessage as T } from '@/components';
import { useBranding } from '@/hooks/useBranding';

export default function DashboardErrorBoundary({}) {
  const { logoUri, name } = useBranding();

  return (
    <div className="dashboard__error-boundary">
      <h1><T id={'sorry_about_that_something_went_wrong'} /></h1>
      <p><T id={'if_the_problem_stuck_please_contact_us_as_soon_as_possible'} /></p>
      {logoUri ? <img src={logoUri} alt={name} /> : <h1>{name}</h1>}
    </div>
  )
}