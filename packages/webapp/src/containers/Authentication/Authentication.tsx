// @ts-nocheck
import { Spinner } from '@blueprintjs/core';
import { Suspense,useEffect } from 'react';
import BodyClassName from 'react-body-classname';
import { Route, Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { AuthMetaBootProvider } from './AuthMetaBoot';
import { Box, Icon, FormattedMessage as T } from '@/components';
import authenticationRoutes from '@/routes/authentication';
import { useBranding } from '@/hooks/useBranding';
import '@/style/pages/Authentication/Auth.scss';

export function Authentication() {
  const { name, logoUri, primaryColor } = useBranding();
  useEffect(() => {
    document.title = name;
    if(primaryColor){
      document.documentElement.style.setProperty('--brand-primary', primaryColor);
    }
  }, [name, primaryColor]);
  return (
    <BodyClassName className={'authentication'}>
      <AuthPage>
        <AuthInsider>
          <AuthLogo>
            {logoUri ? <img src={logoUri} alt={name} /> : <h1>{name}</h1>}
          </AuthLogo>

          <AuthMetaBootProvider>
            <Suspense
              fallback={
                <Box style={{ marginTop: '5rem' }}>
                  <Spinner size={30} />
                </Box>
              }
            >
              <AuthenticationRoutes />
            </Suspense>
          </AuthMetaBootProvider>
        </AuthInsider>
      </AuthPage>
    </BodyClassName>
  );
}

function AuthenticationRoutes() {
  const location = useLocation();
  const locationKey = location.pathname;

  return (
    <TransitionGroup>
      <CSSTransition
        timeout={500}
        key={locationKey}
        classNames="authTransition"
      >
        <Switch>
          {authenticationRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
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
