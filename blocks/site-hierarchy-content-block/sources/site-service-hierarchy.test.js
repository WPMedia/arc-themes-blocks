import contentSource from './site-service-hierarchy';

describe('the site-service-hierarchy content source block', () => {
  it('should use the proper param types', () => {
    expect(contentSource.params).toEqual({
      hierarchy: 'text',
      sectionId: 'text',
    });
  });

  it('when a hierarchy is provided it should build the correct url', () => {
    const url = contentSource.resolve({ hierarchy: 'foooter', 'arc-site': 'bbbbb-ccccc' });

    expect(url).toEqual('/site/v3/navigation/bbbbb-ccccc?hierarchy=foooter');
  });

  it('when a hierarchy is NOT provided it should build a url without it', () => {
    const url = contentSource.resolve({ 'arc-site': 'bbbbb-ccccc' });

    expect(url).toEqual('/site/v3/navigation/bbbbb-ccccc?');
  });
});
