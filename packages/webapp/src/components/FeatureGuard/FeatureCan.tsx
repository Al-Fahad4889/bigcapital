// @ts-nocheck
import React from 'react';
import { withFeatureCan } from './withFeatureCan';
import { compose } from '@/utils';

function FeatureCanJSX({
  feature,
  children,
  isFeatureCan,
}: {
  feature: string;
  children?: React.ReactNode;
  isFeatureCan?: boolean;
}) {
  return isFeatureCan && children;
}

export const FeatureCan = compose(
  withFeatureCan(({ isFeatureCan }) => ({
    isFeatureCan,
  })),
)(FeatureCanJSX);
