const mockFn = jest.fn(() => ({}));
jest.mock('@wpmedia/resizer-image-block', () => mockFn);

describe('the resizer image api client source block', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should use the proper param types', () => {
    const { default: contentSource } = require('./resize-image-api-client');
    expect(contentSource.params).toEqual({
      raw_image_url: 'text',
    });
  });

  it('should not allow an unrestricted domain through return empty object', () => {
    const { default: contentSource } = require('./resize-image-api-client');
    expect(contentSource.fetch({ raw_image_url: 'http://sd.jpg' })).toEqual({});
  });

  it('should return empty object if raw image url is not a URL', () => {
    const { default: contentSource } = require('./resize-image-api-client');
    expect(contentSource.fetch({ raw_image_url: 'httspg' })).toEqual({});
  });

  it('should call getResizedImageData if image and domain match no environment domains', () => {
    const { default: contentSource } = require('./resize-image-api-client');

    contentSource.fetch({ raw_image_url: 'http://themes.images.arcpublishing.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(1);

    contentSource.fetch({ raw_image_url: 'http://images.arcpublishing.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(2);

    contentSource.fetch({ raw_image_url: 'https://example.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(2);
  });

  it('should call getResizedImageData if image and domain match with environment domains', () => {
    jest.mock('fusion:environment', () => ({
      allowedImageDomains: 'http://example.com',
    }));

    const { default: contentSource } = require('./resize-image-api-client');

    contentSource.fetch({ raw_image_url: 'http://themes.images.arcpublishing.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(1);

    contentSource.fetch({ raw_image_url: 'http://images.arcpublishing.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(2);

    contentSource.fetch({ raw_image_url: 'https://example.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(3);

    contentSource.fetch({ raw_image_url: 'https://examples.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(3);
  });

  it('should call getResizedImageData if image and domain match with environment domains', () => {
    jest.mock('fusion:environment', () => ({
      allowedImageDomains: 'http://example.com,my-custom-domain.com',
    }));

    const { default: contentSource } = require('./resize-image-api-client');

    contentSource.fetch({ raw_image_url: 'http://themes.images.arcpublishing.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(1);

    contentSource.fetch({ raw_image_url: 'http://images.arcpublishing.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(2);

    contentSource.fetch({ raw_image_url: 'https://example.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(3);

    contentSource.fetch({ raw_image_url: 'https://examples.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(3);

    contentSource.fetch({ raw_image_url: 'https://my-custom-domain.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(4);
  });
});
