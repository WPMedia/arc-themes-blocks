import contentSource from './alert-bar-collections';

describe('the collections content source block', () => {
  describe('when a website param is provided', () => {
    it('should build the correct url', () => {
      const url = contentSource.resolve({
        'arc-site': 'the-sun',
      });

      expect(url).toEqual('content/v4/collections?content_alias=alert-bar&website=the-sun&from=0&size=1&published=true');
    });
  });
  describe('when a website param is not provided', () => {
    it('should build the url without the website', () => {
      const url = contentSource.resolve({});

      expect(url).toEqual('content/v4/collections?content_alias=alert-bar&from=0&size=1&published=true');
    });
  });
});
