import uniqId from './uniqid';

describe('hash generation from tag object', () => {
  it('must return 0 if tag is missing', () => {
    expect(uniqId()).toBe(0);
  });

  it('must return 0 if tag is empty', () => {
    expect(uniqId({})).toBe(0);
  });

  it('must generate a hash for an valid object', () => {
    const tag = {
      slug: '/news',
      text: 'News',
      description: 'Latest News',
    };
    expect(uniqId(tag)).toEqual(expect.any(Number));
  });

  it('must support other utf8 characters', () => {
    const tag = {
      slug: '/ñeüs',
      text: 'Ñéüs',
      description: '蘋果日報: 首頁',
    };
    expect(uniqId(tag)).toEqual(expect.any(Number));
  });

  it('must support return an string if requested', () => {
    const tag = {
      slug: '/ñeüs',
      text: 'Ñéüs',
      description: '蘋果日報: 首頁',
    };
    expect(uniqId(tag, true)).toEqual(expect.any(String));
  });

  it('must support use a seed to generate the hash', () => {
    const tag = {
      slug: '/ñeüs',
      text: 'Ñéüs',
      description: '蘋果日報: 首頁',
    };

    expect(uniqId(tag, true, 0x43939)).toEqual(expect.any(String));
  });
});
