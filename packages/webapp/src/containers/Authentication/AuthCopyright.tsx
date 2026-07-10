// @ts-nocheck
import React from 'react';
import { Icon } from '@/components/Icon';
import { App } from '@/constants/app';
import { useBranding } from '@/hooks/useBranding';
export function AuthCopyright() {
  const { name, logoUri } = useBranding();
  return logoUri ? <img src={logoUri} alt={name} /> : <h1>{name}</h1>;
}
