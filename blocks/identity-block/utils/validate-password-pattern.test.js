import validatePasswordPattern from './validate-password-pattern';

describe('Validate Password', () => {
  it('returns valid validation password regex for match of one each', () => {
    const pattern = new RegExp(validatePasswordPattern(1, 1, 1, 1, 1));

    expect(pattern.test('Abc123!')).toBe(true);

    expect(pattern.test('abc123')).toBe(false);
    expect(pattern.test('abc123!')).toBe(false);
    expect(pattern.test('ABC123!')).toBe(false);
    expect(pattern.test('')).toBe(false);
  });

  it('require six lowercase characters', () => {
    const pattern = new RegExp(validatePasswordPattern(6, 1, 0, 0, 0));

    expect(pattern.test('abcdef')).toBe(true);

    expect(pattern.test('Abc123!')).toBe(false);
    expect(pattern.test('abc123')).toBe(false);
    expect(pattern.test('abc123!')).toBe(false);
    expect(pattern.test('ABC123!')).toBe(false);
    expect(pattern.test('')).toBe(false);
  });

  it('require six uppercase characters', () => {
    const pattern = new RegExp(validatePasswordPattern(0, 1, 0, 0, 6));

    expect(pattern.test('ABCDEF')).toBe(true);

    expect(pattern.test('Abc123!')).toBe(false);
    expect(pattern.test('abc123')).toBe(false);
    expect(pattern.test('abc123!')).toBe(false);
    expect(pattern.test('ABC123!')).toBe(false);
    expect(pattern.test('')).toBe(false);
  });

  it('length 12, at least 1 lowercase and 1 uppercase', () => {
    const pattern = new RegExp(validatePasswordPattern(1, 12, 0, 0, 1));

    expect(pattern.test('aBCDEFABCDEF')).toBe(true);

    expect(pattern.test('ABCDEFABCDEF')).toBe(false);
    expect(pattern.test('Abc123!')).toBe(false);
    expect(pattern.test('abc123')).toBe(false);
    expect(pattern.test('abc123!')).toBe(false);
    expect(pattern.test('ABC123!')).toBe(false);
    expect(pattern.test('')).toBe(false);
  });
});
