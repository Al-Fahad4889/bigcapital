// @ts-nocheck
import styled from 'styled-components';
import { Icon, FormattedMessage as T } from '@/components';
import { App } from '@/constants/app';
import { useBranding } from '@/hooks/useBranding';
interface AuthContainerProps {
  children: React.ReactNode;
}
import { useBranding } from '@/hooks/useBranding';
export function AuthContainer({ children }: AuthContainerProps) {
  const { name, logoUri } = useBranding();

  return (
    <AuthPage>
      <AuthInsider>
        <AuthLogo>
          {logoUri ? <img src={logoUri} alt={name} /> : <h1>{name}</h1>}
        </AuthLogo>

        {children}
      </AuthInsider>
    </AuthPage>
  );
}

const AuthPage = styled.div``;
const AuthInsider = styled.div`
  width: 384px;
  margin: 0 auto;
  margin-bottom: 40px;
  padding-top: 80px;
`;

const AuthLogo = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;
