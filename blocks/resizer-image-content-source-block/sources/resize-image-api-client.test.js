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

    // 's3.amazonaws.com/arc-authors/', is a default allowed domain
    contentSource.fetch({ raw_image_url: 'https://s3.amazonaws.com/arc-authors/marty-mcfly.jpg' });
    expect(mockFn.mock.calls.length).toBe(3);

    contentSource.fetch({ raw_image_url: 'https://s3.amazonaws.com/arcauthors/marty-mcfly.jpg' });
    expect(mockFn.mock.calls.length).toBe(3);

    contentSource.fetch({ raw_image_url: 'https://example.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(3);
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

    // does not iterate the mock call because 'examples' doesn't match 'example' in mock
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
  it('allows default arc domains to be called', () => {
    const { default: contentSource } = require('./resize-image-api-client');

    // iterates mock call length because defaults in ARCDomains
    contentSource.fetch({ raw_image_url: 'http://themes.images.arcpublishing.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(1);

    contentSource.fetch({ raw_image_url: 'http://images.arcpublishing.com/image.jpg' });
    expect(mockFn.mock.calls.length).toBe(2);

    contentSource.fetch({ raw_image_url: 'https://s3.amazonaws.com/arc-authors/marty-mcfly.jpg' });
    expect(mockFn.mock.calls.length).toBe(3);

    contentSource.fetch({ raw_image_url: 'https://static.themebuilder.aws.arc.pub/marty-mcfly.jpg' });
    expect(mockFn.mock.calls.length).toBe(4);

    contentSource.fetch({ raw_image_url: 'https://themebuilder-api-uploads-ap-northeast-1.s3.amazonaws.com/marty-mcfly.jpg' });
    expect(mockFn.mock.calls.length).toBe(5);

    contentSource.fetch({ raw_image_url: 'https://themebuilder-api-uploads-eu-central-1.s3.amazonaws.com/marty-mcfly.jpg' });
    expect(mockFn.mock.calls.length).toBe(6);

    contentSource.fetch({ raw_image_url: 'https://themebuilder-api-uploads-us-east-1.s3.amazonaws.com/marty-mcfly.jpg' });
    expect(mockFn.mock.calls.length).toBe(7);

    contentSource.fetch({ raw_image_url: 'https://themebuilder-api-uploads.s3.amazonaws.com/marty-mcfly.jpg' });
    expect(mockFn.mock.calls.length).toBe(8);
  });
});
