// @ts-nocheck
import React from 'react';
import { Icon } from '@/components/Icon';
import { useBranding } from '@/hooks/useBranding';

export default function AuthCopyright() {
  const { logoUri, name } = useBranding();
  return logoUri ? <img src={logoUri} alt={name} /> : <h1>{name}</h1>;
}
