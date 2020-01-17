import contentSource from './author-api';

describe('the author api content source block', () => {
  it('should use the proper param types', () => {
    expect(contentSource.params).toEqual({
      slug: 'text',
    });
  });

  describe('when a slug is provided', () => {
    it('should build the correct url', () => {
      const url = contentSource.resolve({ slug: 'dogs' });

      expect(url).toEqual('/tags/v2/slugs?slugs=dogs');
    });
  });

  describe('when a slug is NOT provided', () => {
    it('should not build a url with a slug', () => {
      const url = contentSource.resolve({ slug: '' });

      expect(url).toEqual('/author/v2/author-service?slug');
    });
  });

});
