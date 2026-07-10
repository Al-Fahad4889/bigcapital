// @ts-nocheck
import { Text } from '@blueprintjs/core';
import React from 'react';
import style from './SetupLeftSection.module.scss';
import { Icon, For, FormattedMessage as T, Stack } from '@/components';
import { getFooterLinks } from '@/constants/footerLinks';
import { useAuthMetadata } from '@/hooks/query';
import { useAuthActions } from '@/hooks/state';
import { useBranding } from '@/hooks/useBranding';
/**
 * Footer item link.
 */

function FooterLinkItem({ title, link }) {
  return (
    <div className={'content__links-item'}>
      <a href={link} target="_blank" rel="noreferrer">
        {title}
      </a>
    </div>
  );
}

/**
 * Setup left section footer.
 */
function SetupLeftSectionFooter() {
  // Retrieve the footer links.
  const { name, logoUri } = useBranding();
  const footerLinks = getFooterLinks(name, logoUri);
  
  const { data: authMeta } = useAuthMetadata();
  const demoUrl = authMeta?.meta?.one_click_demo?.demo_url;

  const handleDemoBtnClick = () => {
    window.open(demoUrl);
  };

  return (
    <div className={'content__footer'}>
      {demoUrl && (
        <Stack spacing={16}>
          <Text className={style.demoButtonLabel}>Not Now?</Text>
          <button className={style.demoButton} onClick={handleDemoBtnClick}>
            Try Demo Account
          </button>
        </Stack>
      )}

      <div className={'content__links'}>
        <For render={FooterLinkItem} of={footerLinks} />
      </div>
    </div>
  );
}

/**
 * Setup left section header.
 */
function SetupLeftSectionHeader() {
  const { setLogout } = useAuthActions();

  // Handle logout link click.
  const onClickLogout = () => {
    setLogout();
  };

  return (
    <div className={'content__header'}>
      <h1 className={'content__title'}>
        <T id={'setup.left_side.title'} />
      </h1>

      <p className={'content__text'}>
        <T id={'setup.left_side.description'} />
      </p>

      <div className={'content__organization'}>
        <span className={'signout'}>
          <a onClick={onClickLogout} href="#">
            <T id={'sign_out'} />
          </a>
        </span>
      </div>
    </div>
  );
}

/**
 * Wizard setup left section.
 */
export function SetupLeftSection() {
  const { name, logoUri } = useBranding();
  return (
    <section className={'setup-page__left-section'}>
      <div className={'content'}>
        <div className={'content__logo'}>
          {logoUri ? <img src={logoUri} alt={name} /> : <h1>{name}</h1>}
        </div>
        <SetupLeftSectionHeader />
        <SetupLeftSectionFooter />
      </div>
    </section>
  );
}
