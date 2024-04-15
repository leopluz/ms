/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import i18next from 'i18next';
import './i18n/config';

// Helpers.
const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;

type Unit =
  | 'Years'
  | 'Year'
  | 'Yrs'
  | 'Yr'
  | 'Y'
  | 'Weeks'
  | 'Week'
  | 'W'
  | 'Days'
  | 'Day'
  | 'D'
  | 'Hours'
  | 'Hour'
  | 'Hrs'
  | 'Hr'
  | 'H'
  | 'Minutes'
  | 'Minute'
  | 'Mins'
  | 'Min'
  | 'M'
  | 'Seconds'
  | 'Second'
  | 'Secs'
  | 'Sec'
  | 's'
  | 'Milliseconds'
  | 'Millisecond'
  | 'Msecs'
  | 'Msec'
  | 'Ms';

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

export type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

interface Options {
  /**
   * Set to `true` to use verbose formatting. Defaults to `false`.
   */
  long?: boolean;
  locale?: string;
}

/**
 * Parse or format the given value.
 *
 * @param value - The string or number to convert
 * @param options - Options for the conversion
 * @throws Error if `value` is not a non-empty string or a number
 */
function msFn(value: StringValue, options?: Options): number;
function msFn(value: number, options?: Options): string;
function msFn(value: StringValue | number, options?: Options): number | string {
  processLocaleOption(options);
  try {
    if (typeof value === 'string') {
      return parse(value);
    } else if (typeof value === 'number') {
      return format(value, options);
    }
    throw new Error('Value provided to ms() must be a string or number.');
  } catch (error) {
    const message = isError(error)
      ? `${error.message}. value=${JSON.stringify(value)}`
      : 'An unknown error has occurred.';
    throw new Error(message);
  }
}

/**
 * Parse the given string and return milliseconds.
 *
 * @param str - A string to parse to milliseconds
 * @returns The parsed value in milliseconds, or `NaN` if the string can't be
 * parsed
 */
export function parse(str: string): number {
  if (typeof str !== 'string' || str.length === 0 || str.length > 100) {
    throw new Error(
      'Value provided to ms.parse() must be a string with length between 1 and 99.',
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const unitPattern: string = i18next.t('unitPattern');
  const regex = new RegExp(
    `^(?<value>-?(?:\\d+)?\\.?\\d+) *(?<type>${unitPattern})?$`,
    'i',
  );
  const match = regex.exec(str);
  // Named capture groups need to be manually typed today.
  // https://github.com/microsoft/TypeScript/issues/32098
  const groups = match?.groups as { value: string; type?: string } | undefined;
  if (!groups) {
    return NaN;
  }
  const n = parseFloat(groups.value);
  const type = (groups.type || 'ms').toLowerCase() as Lowercase<Unit>;
  if (
    Object.values(i18next.t('years', { returnObjects: true })).includes(type)
  ) {
    return n * y;
  } else if (
    Object.values(i18next.t('weeks', { returnObjects: true })).includes(type)
  ) {
    return n * w;
  } else if (
    Object.values(i18next.t('days', { returnObjects: true })).includes(type)
  ) {
    return n * d;
  } else if (
    Object.values(i18next.t('hours', { returnObjects: true })).includes(type)
  ) {
    return n * h;
  } else if (
    Object.values(i18next.t('minutes', { returnObjects: true })).includes(type)
  ) {
    return n * m;
  } else if (
    Object.values(i18next.t('seconds', { returnObjects: true })).includes(type)
  ) {
    return n * s;
  } else if (
    Object.values(i18next.t('milliseconds', { returnObjects: true })).includes(
      type,
    )
  ) {
    return n;
  }
  // This should never occur.
  throw new Error(
    `The unit ${type as string} was matched, but no matching case exists.`,
  );
}

/**
 * Parse the given StringValue and return milliseconds.
 *
 * @param value - A typesafe StringValue to parse to milliseconds
 * @returns The parsed value in milliseconds, or `NaN` if the string can't be
 * parsed
 */
export function parseStrict(value: StringValue): number {
  return parse(value);
}

// eslint-disable-next-line import/no-default-export
export default msFn;

/**
 * Short format for `ms`.
 */
function fmtShort(ms: number): StringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return `${Math.round(ms / d)}d`;
  }
  if (msAbs >= h) {
    return `${Math.round(ms / h)}h`;
  }
  if (msAbs >= m) {
    return `${Math.round(ms / m)}m`;
  }
  if (msAbs >= s) {
    return `${Math.round(ms / s)}s`;
  }
  return `${ms}ms`;
}

/**
 * Long format for `ms`.
 */
function fmtLong(ms: number): StringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, i18next.t('day'));
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, i18next.t('hour'));
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, i18next.t('minute'));
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, i18next.t('second'));
  }
  return `${ms} ms`;
}

/**
 * Format the given integer as a string.
 *
 * @param ms - milliseconds
 * @param options - Options for the conversion
 * @returns The formatted string
 */
export function format(ms: number, options?: Options): string {
  if (typeof ms !== 'number' || !isFinite(ms)) {
    throw new Error('Value provided to ms.format() must be of type number.');
  }
  return options?.long ? fmtLong(ms) : fmtShort(ms);
}

/**
 * Pluralization helper.
 */
function plural(
  ms: number,
  msAbs: number,
  n: number,
  name: string,
): StringValue {
  const isPlural = msAbs >= n * 1.5;
  return `${Math.round(ms / n)} ${name}${isPlural ? 's' : ''}` as StringValue;
}

/**
 * A type guard for errors.
 *
 * @param value - The value to test
 * @returns A boolean `true` if the provided value is an Error-like object
 */
function isError(value: unknown): value is Error {
  return typeof value === 'object' && value !== null && 'message' in value;
}

export function processLocaleOption(options?: Options) {
  const locale = options?.locale;
  if (locale === 'pt') {
    i18next.changeLanguage(locale);
  }
}
