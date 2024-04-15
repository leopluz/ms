/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { i18next } from 'i18next';
import { en } from './en';
import { pt } from './pt';

export const resources = {
  en: {
    ms: en,
  },
  pt: {
    ms: pt,
  },
};

i18next.init({
  lng: 'en',
  initImmediate: false,
  defaultNS: 'ms',
  resources,
});
