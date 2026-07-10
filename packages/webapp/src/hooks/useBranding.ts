import { useAuthMetadata } from '@/hooks/query/authentication/queries';
import { useCurrentOrganizationMetadata } from '@/hooks/query/organization/queries';

const NEUTRAL = {
  name: 'Agency',
  logoUri: '',
  primaryColor: '#6b7280',
};

export function useBranding() {
  const org = useCurrentOrganizationMetadata();
  const { data: authMeta } = useAuthMetadata();

  const source = org ?? authMeta?.branding ?? null;

  return {
    name: source?.name || NEUTRAL.name,
    logoUri: source?.logoUri || source?.logo_uri || '',
    primaryColor: source?.primaryColor || source?.primary_color || NEUTRAL.primaryColor,
  };
}
