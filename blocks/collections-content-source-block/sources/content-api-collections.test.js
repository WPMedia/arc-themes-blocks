import getProperties from 'fusion:properties';
import contentSource from './content-api-collections';

describe('the collections content source block', () => {
  it('should use the proper param types', () => {
    expect(contentSource.params).toEqual({
      _id: 'text',
      content_alias: 'text',
      from: 'text',
      size: 'text',
    });
  });

  it('should be associated with the ans-feed schema', () => {
    expect(contentSource.schemaName).toEqual('ans-feed');
  });

  describe('when an id and website are provided', () => {
    it('should build the correct url', () => {
      const url = contentSource.resolve({
        _id: 'test',
        content_alias: 'test',
        website: 'the-sun',
        from: '20',
        size: '0',
        'arc-site': 'the-sun',
      });

      expect(url).toEqual('content/v4/collections?_id=test&website=the-sun&from=20&size=0&published=true');
    });
  });

  describe('when a from is provided', () => {
    it('should build the correct url with a from', () => {
      const url = contentSource.resolve({
        _id: 'test',
        content_alias: 'test',
        website: 'the-sun',
        from: '20',
        'arc-site': 'the-sun',
      });

      expect(url).toEqual('content/v4/collections?_id=test&website=the-sun&from=20&published=true');
    });
  });

  describe('when a from is NOT provided', () => {
    it('should build the correct url without a from', () => {
      const url = contentSource.resolve({
        _id: 'test',
        content_alias: 'test',
        website: 'the-sun',
        'arc-site': 'the-sun',
      });

      expect(url).toEqual('content/v4/collections?_id=test&website=the-sun&published=true');
    });
  });

  describe('when a size is provided', () => {
    it('should build the correct url without a size', () => {
      const url = contentSource.resolve({
        _id: 'test',
        content_alias: 'test',
        website: 'the-sun',
        size: '0',
        'arc-site': 'the-sun',
      });

      expect(url).toEqual('content/v4/collections?_id=test&website=the-sun&size=0&published=true');
    });
  });

  describe('when a size is NOT provided', () => {
    it('should build the correct url without a size', () => {
      const url = contentSource.resolve({
        _id: 'test',
        content_alias: 'test',
        website: 'the-sun',
        'arc-site': 'the-sun',
      });

      expect(url).toEqual('content/v4/collections?_id=test&website=the-sun&published=true');
    });
  });

  describe('when an id is NOT provided but a content alias is provided', () => {
    it('should build the correct url with a content alias', () => {
      const url = contentSource.resolve({
        content_alias: 'test_alias',
        website: 'the-sun',
        from: '20',
        size: '0',
        'arc-site': 'the-sun',
      });

      expect(url).toEqual('content/v4/collections?content_alias=test_alias&website=the-sun&from=20&size=0&published=true');
    });
  });

  describe('when a website is NOT provided', () => {
    it('should not build a url with a website', () => {
      const url = contentSource.resolve({ _id: 'test' });

      expect(url).toEqual('content/v4/collections?_id=test&published=true');
    });
  });

  describe('when an id and website are NOT provided', () => {
    it('should not build a url with an id and website', () => {
      const url = contentSource.resolve({ });

      expect(url).toEqual('content/v4/collections?content_alias=undefined&published=true');
    });
    it('should not build a url with an id and website', () => {
      const url = contentSource.resolve();

      expect(url).toEqual('content/v4/collections?content_alias=undefined&published=true');
    });
  });

  // This test is only to complete test coverage
  // the correct test implementation is on resizer-image-block
  describe('when data need to be transformed', () => {
    it('should add resized image data', () => {
      getProperties.mockImplementation(() => ({}));
      const data = contentSource.transform([], { 'arc-site': 'dummy' });
      expect(data).toEqual([]);
    });
  });
});
