// @ts-nocheck
import React from 'react';
import { getFooterLinks } from '@/constants/footerLinks';
import { For } from '@/components';
import { useBranding } from '@/hooks/useBranding';
function FooterLinkItem({ title, link }) {
  return (
    <div>
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
    <div className="dashboard__footer">
      <div className="footer-links">
        <For render={FooterLinkItem} of={footerLinks} />
      </div>
    </div>
  );
}
