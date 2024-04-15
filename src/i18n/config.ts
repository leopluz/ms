/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-named-as-default-member */
import i18next from 'i18next';
import { en } from './en';
import { pt } from './pt';
import { fr } from './fr';

export const resources = {
  en: {
    ms: en,
  },
  pt: {
    ms: pt,
  },
  fr: {
    ms: fr,
  },
};

i18next.init({
  lng: 'en',
  initImmediate: false,
  defaultNS: 'ms',
  resources,
});
