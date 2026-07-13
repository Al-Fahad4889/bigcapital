import { useAuthMetadata } from '@/hooks/query/authentication';
import { useCurrentOrganizationMetadata } from '@/hooks/query/organization';
import { useIsAuthenticated } from '@/hooks/state';

const NEUTRAL = {
  name: 'Agency',
  logoUri: '',
  primaryColor: '#6b7280',
};

export function useBranding() {
  const isAuthenticated = useIsAuthenticated();
  const orgMetadata = useCurrentOrganizationMetadata({ enabled: isAuthenticated });
  const { data: authMeta } = useAuthMetadata();

  const org = isAuthenticated ? orgMetadata : null;
  const source = org ?? authMeta?.branding ?? null;

  return {
    name: source?.name || NEUTRAL.name,
    logoUri: source?.logoUri || source?.logo_uri || '',
    primaryColor: source?.primaryColor || source?.primary_color || NEUTRAL.primaryColor,
  };
}