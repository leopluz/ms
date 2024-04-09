 
import type { StringValue } from './string-value';

 
export function parseLocaleConvert(
  value: StringValue,
  locale: string,
): StringValue {
  // eslint-disable-next-line no-console
  console.log(value, locale);
  return '5 ms';
}

export function formatLocaleConvert(value: string, locale: string): string {
  // eslint-disable-next-line no-console
  console.log(value, locale);
  return '';
}
