import contentApi from './content-api';

describe('the content api source block', () => {
  it('should use the proper param types', () => {
    expect(contentApi.params).toEqual({
      website_url: 'text',
    });
  });

  describe('when a site is provided', () => {
    it('should include the "website" query param with the value', () => {
      const url = contentApi.resolve({ website_url: '/aaaa/bccccd/', 'arc-site': 'wapo' });

      expect(url).toEqual('/content/v4/?website_url=/aaaa/bccccd/&website=wapo');
    });
  });

  describe('when a site is NOT provided', () => {
    it('should NOT include the "website" query param', () => {
      const url = contentApi.resolve({ website_url: '/aaaa/bccccd/' });

      expect(url).toEqual('/content/v4/?website_url=/aaaa/bccccd/');
    });
  });

  describe('when a website url is provided', () => {
    it('should set the website_url query param', () => {
      const url = contentApi.resolve({ website_url: '/aaaa/eeeeee/' });

      expect(url).toEqual('/content/v4/?website_url=/aaaa/eeeeee/');
    });
  });

  describe('when a website url is NOT provided', () => {
    it('should have an undefined website_url', () => {
      const url = contentApi.resolve({});

      expect(url).toEqual('/content/v4/?website_url=undefined');
    });
  });
});
