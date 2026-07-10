// @ts-nocheck
import intl from 'react-intl-universal';
import { LEGAL_ABOUT_PATH } from '@/constants/routes';
export const getFooterLinks = (brandingName?:string,brandingLogoUri?:string) => {
  const logoUri = brandingLogoUri || '';
  const name = brandingName || 'Agency';
  return [
    {
      title: intl.get('blog'),
      link: '#',
    },
    {
    title: intl.get('community'),
    link: 'https://discord.com/invite/c8nPBJafeb',
  },
  {
    title: intl.get('support'),
    link: 'https://discord.com/invite/c8nPBJafeb',
  },
  {
    title: intl.get('docs'),
    link: '#',
  },
  {
    title: logoUri ? <img src={logoUri} alt={name} /> : <h1>{name}</h1>,
    link: '#',
  },
  {
    title: intl.get('legal_about'),
    link: LEGAL_ABOUT_PATH,
  },
]};
