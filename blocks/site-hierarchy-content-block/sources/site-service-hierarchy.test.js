import contentSource from './site-service-hierarchy';

describe('the site-service-hierarchy content source block', () => {
  it('should use the proper param types', () => {
    expect(contentSource.params).toEqual({
      hierarchy: 'text',
      sectionId: 'text',
    });
  });

  it('when a hierarchy and sectionId are provided it should build the correct url', () => {
    const url = contentSource.resolve({
      hierarchy: 'foooter',
      sectionId: '/sports',
      'arc-site': 'bbbbb-ccccc',
    });

    expect(url).toEqual('/site/v3/navigation/bbbbb-ccccc?hierarchy=foooter&_id=/sports');
  });

  it('when a hierarchy is provided it should build the correct url', () => {
    const url = contentSource.resolve({
      hierarchy: 'foooter',
      'arc-site': 'bbbbb-ccccc',
    });

    expect(url).toEqual('/site/v3/navigation/bbbbb-ccccc?hierarchy=foooter');
  });

  it('when a sectionId is provided it should build the correct url', () => {
    const url = contentSource.resolve({
      sectionId: '/sports',
      'arc-site': 'bbbbb-ccccc',
    });

    expect(url).toEqual('/site/v3/navigation/bbbbb-ccccc?&_id=/sports');
  });

  it('when a hierarchy and sectionId are NOT provided it should build a url without them', () => {
    const url = contentSource.resolve({ 'arc-site': 'bbbbb-ccccc' });

    expect(url).toEqual('/site/v3/navigation/bbbbb-ccccc?');
  });

  it('when a hierarchy and sectionId are provided it should return data', () => {
    const data = contentSource.transform({ _id: '/' }, { hierarchy: 'hierarchy', sectionId: '/sectionId' });

    expect(data._id).toEqual('/');
  });

  it('when a hierarchy is not provided and sectionId is provided that matches the API data then the data is returned', () => {
    const data = contentSource.transform({ _id: '/sectionId' }, { hierarchy: '', sectionId: '/sectionId' });

    expect(data._id).toEqual('/sectionId');
  });

  it('when a hierarchy is not provided and sectionId is provided that does not match the API data a 404 is thrown', () => {
    expect(() => contentSource.transform({ _id: '/' }, { hierarchy: '', sectionId: '/sectionId' })).toThrow(Error);
  });

  it('when a uri does not match section a 404 is thrown', () => {
    expect(() => contentSource.transform({ _id: '/' }, { hierarchy: '', sectionId: '/sectionId', uri: '/' })).toThrow(Error);
  });

  it('when uri and section match return data', () => {
    const data = contentSource.transform({ _id: '/sectionId' }, { hierarchy: 'hierarchy', sectionId: '/sectionId', uri: '/sectionId' });

    expect(data._id).toEqual('/sectionId');
  });
});
