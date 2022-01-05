import contentSource from './content-api-collections';

jest.mock('fusion:environment', () => ({
  CONTENT_BASE: '',
}));

jest.mock('request-promise-native', () => ({
  __esModule: true,
  default: jest.fn((data) => Promise.resolve(data)),
}));

describe('the collections content source block', () => {
  it('should use the proper param types', () => {
    expect(contentSource.params).toEqual({
      _id: 'text',
      content_alias: 'text',
      from: 'text',
      getNext: 'text',
      size: 'text',
    });
  });

  it('should be associated with the ans-feed schema', () => {
    expect(contentSource.schemaName).toEqual('ans-feed');
  });

  describe('when an id and website are provided', () => {
    it('should build the correct url', async () => {
      const contentSourceRequest = await contentSource.fetch({
        _id: 'test',
        content_alias: 'test',
        website: 'the-sun',
        from: '20',
        size: '0',
        'arc-site': 'the-sun',
      });

      expect(contentSourceRequest.uri).toEqual('content/v4/collections?_id=test&website=the-sun&from=20&size=0&published=true');
    });
  });

  describe('when a from is provided', () => {
    it('should build the correct url with a from', async () => {
      const contentSourceRequest = await contentSource.fetch({
        _id: 'test',
        content_alias: 'test',
        website: 'the-sun',
        from: '20',
        'arc-site': 'the-sun',
      });

      expect(contentSourceRequest.uri).toEqual('content/v4/collections?_id=test&website=the-sun&from=20&published=true');
    });
  });

  describe('when a from is NOT provided', () => {
    it('should build the correct url without a from', async () => {
      const contentSourceRequest = await contentSource.fetch({
        _id: 'test',
        content_alias: 'test',
        website: 'the-sun',
        'arc-site': 'the-sun',
      });

      expect(contentSourceRequest.uri).toEqual('content/v4/collections?_id=test&website=the-sun&published=true');
    });
  });

  describe('when a size is provided', () => {
    it('should build the correct url without a size', async () => {
      const contentSourceRequest = await contentSource.fetch({
        _id: 'test',
        content_alias: 'test',
        website: 'the-sun',
        size: '0',
        'arc-site': 'the-sun',
      });

      expect(contentSourceRequest.uri).toEqual('content/v4/collections?_id=test&website=the-sun&size=0&published=true');
    });
  });

  describe('when a size is NOT provided', () => {
    it('should build the correct url without a size', async () => {
      const contentSourceRequest = await contentSource.fetch({
        _id: 'test',
        content_alias: 'test',
        website: 'the-sun',
        'arc-site': 'the-sun',
      });

      expect(contentSourceRequest.uri).toEqual('content/v4/collections?_id=test&website=the-sun&published=true');
    });
  });

  describe('when an id is NOT provided but a content alias is provided', () => {
    it('should build the correct url with a content alias', async () => {
      const contentSourceRequest = await contentSource.fetch({
        content_alias: 'test_alias',
        website: 'the-sun',
        from: '20',
        size: '0',
        'arc-site': 'the-sun',
      });

      expect(contentSourceRequest.uri).toEqual('content/v4/collections?content_alias=test_alias&website=the-sun&from=20&size=0&published=true');
    });
  });

  describe('when a website is NOT provided', () => {
    it('should not build a url with a website', async () => {
      const contentSourceRequest = await contentSource.fetch({ _id: 'test' });

      expect(contentSourceRequest.uri).toEqual('content/v4/collections?_id=test&published=true');
    });
  });

  describe('when an id and website are NOT provided', () => {
    it('should not build a url with an id and website', async () => {
      const contentSourceRequest = await contentSource.fetch({ });

      expect(contentSourceRequest.uri).toEqual('content/v4/collections?content_alias=undefined&published=true');
    });
  });
});
