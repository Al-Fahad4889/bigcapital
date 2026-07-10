// @ts-nocheck
import React from 'react';
import { For } from '@/components';
import { getFooterLinks } from '@/constants/footerLinks';
import { useBranding } from '@/hooks/useBranding';
function FooterLinkItem({ title, link }) {
  return (
    <div class="">
      <a href={link} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </div>
  );
}

export default function DashboardFooter() {
  const { name, logoUri } = useBranding();
  const footerLinks = getFooterLinks(name, logoUri);

  return (
    <div class="dashboard__footer">
      <div class="footer-links">
        <For render={FooterLinkItem} of={footerLinks} />
      </div>
    </div>
  );
}
