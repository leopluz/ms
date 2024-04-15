import { format, processLocaleOption } from './index';

processLocaleOption({ locale: 'pt' });

// numbers

describe('format(number, { long: true, locale: pt })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { long: true, locale: 'pt' });
    }).not.toThrowError();
  });

  it('should support milliseconds', () => {
    expect(format(500, { long: true, locale: 'pt' })).toBe('500 ms');

    expect(format(-500, { long: true, locale: 'pt' })).toBe('-500 ms');
  });

  it('should support seconds', () => {
    expect(format(1000, { long: true, locale: 'pt' })).toBe('1 segundo');
    expect(format(1200, { long: true, locale: 'pt' })).toBe('1 segundo');
    expect(format(10000, { long: true, locale: 'pt' })).toBe('10 segundos');

    expect(format(-1000, { long: true, locale: 'pt' })).toBe('-1 segundo');
    expect(format(-1200, { long: true, locale: 'pt' })).toBe('-1 segundo');
    expect(format(-10000, { long: true, locale: 'pt' })).toBe('-10 segundos');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000, { long: true, locale: 'pt' })).toBe('1 minuto');
    expect(format(60 * 1200, { long: true, locale: 'pt' })).toBe('1 minuto');
    expect(format(60 * 10000, { long: true, locale: 'pt' })).toBe('10 minutos');

    expect(format(-1 * 60 * 1000, { long: true, locale: 'pt' })).toBe(
      '-1 minuto',
    );
    expect(format(-1 * 60 * 1200, { long: true, locale: 'pt' })).toBe(
      '-1 minuto',
    );
    expect(format(-1 * 60 * 10000, { long: true, locale: 'pt' })).toBe(
      '-10 minutos',
    );
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000, { long: true, locale: 'pt' })).toBe('1 hora');
    expect(format(60 * 60 * 1200, { long: true, locale: 'pt' })).toBe('1 hora');
    expect(format(60 * 60 * 10000, { long: true, locale: 'pt' })).toBe(
      '10 horas',
    );

    expect(format(-1 * 60 * 60 * 1000, { long: true, locale: 'pt' })).toBe(
      '-1 hora',
    );
    expect(format(-1 * 60 * 60 * 1200, { long: true, locale: 'pt' })).toBe(
      '-1 hora',
    );
    expect(format(-1 * 60 * 60 * 10000, { long: true, locale: 'pt' })).toBe(
      '-10 horas',
    );
  });

  it('should support days', () => {
    expect(format(24 * 60 * 60 * 1000, { long: true, locale: 'pt' })).toBe(
      '1 dia',
    );
    expect(format(24 * 60 * 60 * 1200, { long: true, locale: 'pt' })).toBe(
      '1 dia',
    );
    expect(format(24 * 60 * 60 * 10000, { long: true, locale: 'pt' })).toBe(
      '10 dias',
    );

    expect(format(-1 * 24 * 60 * 60 * 1000, { long: true, locale: 'pt' })).toBe(
      '-1 dia',
    );
    expect(format(-1 * 24 * 60 * 60 * 1200, { long: true, locale: 'pt' })).toBe(
      '-1 dia',
    );
    expect(
      format(-1 * 24 * 60 * 60 * 10000, { long: true, locale: 'pt' }),
    ).toBe('-10 dias');
  });

  it('should round', () => {
    expect(format(234234234, { long: true, locale: 'pt' })).toBe('3 dias');

    expect(format(-234234234, { long: true, locale: 'pt' })).toBe('-3 dias');
  });
});

// numbers

describe('format(number)', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { locale: 'pt' });
    }).not.toThrowError();
  });

  it('should support milliseconds', () => {
    expect(format(500, { locale: 'pt' })).toBe('500ms');

    expect(format(-500, { locale: 'pt' })).toBe('-500ms');
  });

  it('should support seconds', () => {
    expect(format(1000, { locale: 'pt' })).toBe('1s');
    expect(format(10000, { locale: 'pt' })).toBe('10s');

    expect(format(-1000, { locale: 'pt' })).toBe('-1s');
    expect(format(-10000, { locale: 'pt' })).toBe('-10s');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000)).toBe('1m');
    expect(format(60 * 10000)).toBe('10m');

    expect(format(-1 * 60 * 1000)).toBe('-1m');
    expect(format(-1 * 60 * 10000)).toBe('-10m');
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000)).toBe('1h');
    expect(format(60 * 60 * 10000)).toBe('10h');

    expect(format(-1 * 60 * 60 * 1000)).toBe('-1h');
    expect(format(-1 * 60 * 60 * 10000)).toBe('-10h');
  });

  it('should support days', () => {
    expect(format(24 * 60 * 60 * 1000)).toBe('1d');
    expect(format(24 * 60 * 60 * 10000)).toBe('10d');

    expect(format(-1 * 24 * 60 * 60 * 1000)).toBe('-1d');
    expect(format(-1 * 24 * 60 * 60 * 10000)).toBe('-10d');
  });

  it('should round', () => {
    expect(format(234234234, { locale: 'pt' })).toBe('3d');

    expect(format(-234234234, { locale: 'pt' })).toBe('-3d');
  });
});

// invalid inputs

describe('format(invalid inputs)', () => {
  it('should throw an error, when format("")', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format('', { locale: 'pt' });
    }).toThrowError();
  });

  it('should throw an error, when format(undefined)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format(undefined, { locale: 'pt' });
    }).toThrowError();
  });

  it('should throw an error, when format(null)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format(null, { locale: 'pt' });
    }).toThrowError();
  });

  it('should throw an error, when format([])', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format([], { locale: 'pt' });
    }).toThrowError();
  });

  it('should throw an error, when format({})', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format({}, { locale: 'pt' });
    }).toThrowError();
  });

  it('should throw an error, when format(NaN)', () => {
    expect(() => {
      format(NaN, { locale: 'pt' });
    }).toThrowError();
  });

  it('should throw an error, when format(Infinity)', () => {
    expect(() => {
      format(Infinity, { locale: 'pt' });
    }).toThrowError();
  });

  it('should throw an error, when format(-Infinity)', () => {
    expect(() => {
      format(-Infinity, { locale: 'pt' });
    }).toThrowError();
  });
});
