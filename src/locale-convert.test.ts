 
import { parseLocaleConvert, formatLocaleConvert } from './locale-convert';

describe('parseLocaleConvert(value: StringValue, locale: string): StringValue', () => {
  it('should not throw an error', () => {
    expect(() => {
      parseLocaleConvert('10 milliseconds', 'pt');
    }).not.toThrowError();
  });
  it('should return null', () => {
    expect(parseLocaleConvert('10 ms', 'pt')).toBeNull();
  });
});

describe('formatLocaleConvert(value: string, locale: string): string', () => {
  it('should not throw an error', () => {
    expect(() => {
      formatLocaleConvert('10ms', 'pt');
    }).not.toThrowError();
  });
  it('should return null', () => {
    expect(formatLocaleConvert('invalid string', 'pt')).toBeNull();
  });
});
