import contentSource from './site-service-hierarchy';

describe('the site-service-hierarchy content source block', () => {
  it('should use the proper param types', () => {
    expect(contentSource.params).toEqual({
      site: 'text',
      hierarchy: 'text',
    });
  });

  describe('when the site is provided by the user', () => {
    describe('when a hierarchy is provided', () => {
      it('should build the correct url', () => {
        const url = contentSource.resolve({ site: 'aaaa-bbbb', hierarchy: 'foooter', 'arc-site': 'bbbbb-ccccc' });

        expect(url).toEqual('/site/v3/navigation/aaaa-bbbb?hierarchy=foooter');
      });
    });

    describe('when a hierarchy is NOT provided', () => {
      it('should build the correct url', () => {
        const url = contentSource.resolve({ site: 'aaaa-bbbb', 'arc-site': 'bbbbb-ccccc' });

        expect(url).toEqual('/site/v3/navigation/aaaa-bbbb');
      });
    });
  });

  describe('when the site is NOT provided by the user', () => {
    describe('when a hierarchy is provided', () => {
      it('should build the correct url', () => {
        const url = contentSource.resolve({ hierarchy: 'foooter', 'arc-site': 'bbbbb-ccccc' });

        expect(url).toEqual('/site/v3/navigation/bbbbb-ccccc?hierarchy=foooter');
      });
    });

    describe('when a hierarchy is NOT provided', () => {
      const url = contentSource.resolve({ 'arc-site': 'bbbbb-ccccc' });

      expect(url).toEqual('/site/v3/navigation/bbbbb-ccccc');
    });
  });
});
