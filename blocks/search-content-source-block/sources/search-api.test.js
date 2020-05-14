import getProperties from 'fusion:properties';
import contentSource from './search-api';

describe('the search content source block', () => {
  it('should use the proper param types', () => {
    expect(contentSource.params).toEqual({
      query: 'text',
      page: 'text',
    });
  });

  describe('when a query is provided', () => {
    it('should build the correct url', () => {
      getProperties.mockImplementation(() => ({ searchKey: '1234' }));
      const url = contentSource.resolve({
        query: 'test',
        'arc-site': 'the-sun',
      });
      expect(url).toEqual('https://search.arcpublishing.com/search?&q=test&page=1&website_id=the-sun&key=1234');
    });
  });

  describe('when a page number is provided', () => {
    it('should build the a url with the provided page number', () => {
      const url = contentSource.resolve({
        query: 'test',
        page: '3',
        'arc-site': 'the-sun',
      });
      expect(url).toEqual('https://search.arcpublishing.com/search?&q=test&page=3&website_id=the-sun&key=1234');
    });
  });

  describe('when a query is NOT provided', () => {
    it('should not build a url', () => {
      getProperties.mockImplementation(() => ({ }));
      const url = contentSource.resolve({
        page: '3',
        'arc-site': 'the-sun',
      });
      expect(url).toEqual('');
    });
  });

  describe('when a key is not provided', () => {
    it('should not build a url with a key', () => {
      const url = contentSource.resolve({ query: 'test' });
      expect(url).toEqual('https://search.arcpublishing.com/search?&q=test&page=1');
    });
  });

  describe('when a site is not provided', () => {
    it('should not build a url with a website_url', () => {
      const url = contentSource.resolve({ query: 'test' });
      expect(url).toEqual('https://search.arcpublishing.com/search?&q=test&page=1');
    });
  });
});
