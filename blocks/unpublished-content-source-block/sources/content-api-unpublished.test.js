import contentSource from './content-api-unpublished';

describe('the unpublished content source block', () => {
  it('should use the proper param types', () => {
    expect(contentSource.params).toEqual({
      _id: 'text',
      website: 'text',
    });
  });

  describe('when an id and website are provided', () => {
    it('should build the correct url', () => {
      const url = contentSource.resolve({ _id: 'test', website: 'the-sun' });

      expect(url).toEqual('content/v4?_id=test&website=the-sun&published=false');
    });
  });

  describe('when an id and website are NOT provided', () => {
    it('should not build a url with an id and website', () => {
      const url = contentSource.resolve({ });

      expect(url).toEqual('content/v4?_id=undefined&website=undefined&published=false');
    });
  });
});
