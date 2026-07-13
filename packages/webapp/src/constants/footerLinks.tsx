// @ts-nocheck
import intl from 'react-intl-universal';
import { Legal_About_Path } from './routes';
export const getFooterLinks = (brandingName?, brandingLogoUri?) => [
  { title: intl.get('blog'), link: '#' },
  { title: 'Community', link: 'https://discord.com/invite/c8nPBJafeb' },
  { title: intl.get('privacy'), link: '#' },
  { title: intl.get('docs'), link: '#' },
  { title: brandingLogoUri ? <img src={brandingLogoUri} alt={brandingName} /> : <h1>{brandingName}</h1>, link: '#' },
  { title: intl.get('legal_about'), link: Legal_About_Path },
];
