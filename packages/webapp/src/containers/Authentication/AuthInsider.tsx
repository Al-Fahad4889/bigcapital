// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AuthCopyright from './AuthCopyright';
import { AuthInsiderContent, AuthInsiderCopyright } from './_components';

/**
 * Authentication insider page.
 */
export default function AuthInsider({
  logo = true,
  copyright = true,
  children,
  classNames,
}) {
  return (
    <AuthInsiderContent>
      <AuthInsiderContentWrap className={classNames?.content}>
        {children}
      </AuthInsiderContentWrap>

      {copyright && (
        <AuthInsiderCopyright className={classNames?.copyrightWrap}>
          <AuthCopyright />
          <AuthLegalLink>
            <Link to={'/legal/about'}>Legal & About</Link>
          </AuthLegalLink>
        </AuthInsiderCopyright>
      )}
    </AuthInsiderContent>
  );
}

const AuthInsiderContentWrap = styled.div``;

const AuthLegalLink = styled.div`
  margin-top: 8px;

  a {
    color: #666;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
