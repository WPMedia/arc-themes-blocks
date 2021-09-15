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

  it('length 12, at least non-sequentially 2 lowercase, 1 uppercase', () => {
    const pattern = new RegExp(validatePasswordPattern(2, 12, 0, 0, 1));

    expect(pattern.test('aBCDEFABCDEFa')).toBe(true);

    expect(pattern.test('ABCDEFABCDEF')).toBe(false);
    expect(pattern.test('Abc123!')).toBe(false);
    expect(pattern.test('abc123')).toBe(false);
    expect(pattern.test('abc123!')).toBe(false);
    expect(pattern.test('ABC123!')).toBe(false);
    expect(pattern.test('')).toBe(false);
  });
  it('length 12, at least 1 lowercase, non-sequentially 2 uppercase', () => {
    const pattern = new RegExp(validatePasswordPattern(1, 12, 0, 0, 2));

    expect(pattern.test('BaaaaaaaaaaaaaaaaaaB')).toBe(true);

    expect(pattern.test('ABCDEFABCDEF')).toBe(false);
    expect(pattern.test('Abc123!')).toBe(false);
    expect(pattern.test('abc123')).toBe(false);
    expect(pattern.test('abc123!')).toBe(false);
    expect(pattern.test('ABC123!')).toBe(false);
    expect(pattern.test('')).toBe(false);
  });
  it('length 12 at least non-sequentially 2 digits, 1 lowercase', () => {
    const pattern = new RegExp(validatePasswordPattern(1, 12, 2, 0, 0));

    expect(pattern.test('1aaaaaaaaaaaaaaaaaa1')).toBe(true);

    expect(pattern.test('ABCDEFABCDEF')).toBe(false);
    expect(pattern.test('Abc123!')).toBe(false);
    expect(pattern.test('abc123')).toBe(false);
    expect(pattern.test('abc123!')).toBe(false);
    expect(pattern.test('ABC123!')).toBe(false);
    expect(pattern.test('')).toBe(false);
  });
  it('length 12 at least non-sequentially 2 special characters, 1 lowercase', () => {
    const pattern = new RegExp(validatePasswordPattern(1, 12, 0, 2, 0));

    expect(pattern.test('!aaaaaaaaaaaaaaaaa&')).toBe(true);

    expect(pattern.test('ABCDEFABCDEF')).toBe(false);
    expect(pattern.test('Abc123!')).toBe(false);
    expect(pattern.test('abc123')).toBe(false);
    expect(pattern.test('abc123!')).toBe(false);
    expect(pattern.test('ABC123!')).toBe(false);
    expect(pattern.test('')).toBe(false);
  });
  it('passes non-sequentially 2 character-long amount', () => {
    const pattern = new RegExp(validatePasswordPattern(0, 2, 0, 0, 0));

    expect(pattern.test('f f')).toBe(true);

    expect(pattern.test('')).toBe(false);
  });
  it('passes on complicated two character-long non-sequential requirements', () => {
    const pattern = new RegExp(validatePasswordPattern(2, 12, 2, 2, 2));

    expect(pattern.test('Abc123!Abc123!')).toBe(true);
    expect(pattern.test('ffff')).toBe(false);
  });
});
