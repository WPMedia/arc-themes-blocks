/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */

import getProperties from 'fusion:properties';
import getResizedImageData from '.';
import mockStoryFeedData from './mockFeedData';
import mockSearchApiData from './mockSearchApiData';
import mockCreditsData from './mockCreditsData';
import mockCreditsEmptyImgData from './mockCreditsEmptyImgData';
import mockLeadArtData from './mockLeadArtData';

// https://github.com/wapopartners/Infobae-PageBuilder-Fusion-Features/blob/a2409b8147667bd9c435bb44f81bab7ac974c1e8/properties/index.json#L8
const DEFAULT_BREAKPOINTS_ARRAY = [
  {
    device: 'mobile',
    width: 420,
  },
  {
    device: 'tablet',
    width: 768,
  },
  {
    device: 'desktop',
    width: 992,
  },
];

// just targeting results list
const ASPECT_RATIOS = [
  '3:2',
  '4:3',
];

const IMAGE_WIDTHS = [
  158,
  274,
];

describe('get resized image data helper on the server-side', () => {
  it('returns data passed in if missing env variables', () => {
    getProperties.mockImplementation(() => ({}));
    const dataWithResizedImages = getResizedImageData(mockStoryFeedData);
    const resizedParams = dataWithResizedImages
      .content_elements[0]
      .promo_items
      .basic;

    expect(typeof resizedParams.resized_params).toBe('undefined');
  });
  it('returns data passed in if window is undefined', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
      }));

    const dataWithResizedImages = getResizedImageData(mockStoryFeedData);

    const resizedParams = dataWithResizedImages
      .content_elements[0]
      .promo_items
      .basic
      .resized_params;

    const paramKeys = Object.keys(resizedParams);

    const filterValues = Object.values(resizedParams);

    // if the same resizer key is used this won't change
    expect(filterValues).toEqual([
      '/B-33vJ0Ak54a9pMvGhgkzGk0meE=filters:format(jpg):quality(70)/',
      '/CfybbXLZWF3gcwc2tD-FYzZlc8Y=filters:format(jpg):quality(70)/',
      '/RwaE87wvO3wFs17iLXhecTl2hhQ=filters:format(jpg):quality(70)/',
      '/6SNHSvz_6KHTam6lqe-ZgKzlzLs=filters:format(jpg):quality(70)/']);

    // {
    // '420x315|mobile':
    // '/1QqmqwWQDKeiaT6bDVR31vyHK3k=filters:format(jpg):quality(70)/',
    // },

    // will return undefined if no window
    const allValidFilterValues = filterValues.every((imageFilterValue) => typeof imageFilterValue !== 'undefined' && imageFilterValue.includes(':quality(70)/'));
    expect(allValidFilterValues).toEqual(true);

    expect(paramKeys).toEqual([
      '158x105',
      '274x183',
      '158x119',
      '274x206',
    ]);
  });

  it('returns data passed in from search-api', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
      }));

    const dataWithResizedImages = getResizedImageData(mockSearchApiData);

    // doesn't have content_elements, just an array with elements that have promo_items
    const resizedParams = dataWithResizedImages[0].promo_items
      .basic
      .resized_params;

    const paramKeys = Object.keys(resizedParams);

    const filterValues = Object.values(resizedParams);

    // if the same resizer key is used this won't change
    expect(filterValues).toEqual([
      '/5eirj3cmfExljl2SvX6qbwxrB3Y=filters:format(jpg):quality(70)/',
      '/rIrdmTmnUR9StYnBIR1e4vpyLMo=filters:format(jpg):quality(70)/',
      '/v9_ZAorNWy8_1ujEQVwu9lYF1Mo=filters:format(jpg):quality(70)/',
      '/B014aKo-I_UZCWeJ43kYGefBp40=filters:format(jpg):quality(70)/',
    ]);

    const allValidFilterValues = filterValues.every((imageFilterValue) => typeof imageFilterValue !== 'undefined' && imageFilterValue.includes(':quality(70)/'));
    expect(allValidFilterValues).toEqual(true);

    expect(paramKeys).toEqual([
      '158x105',
      '274x183',
      '158x119',
      '274x206',
    ]);
  });
  it('resizes author bio if img available', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
      }));

    const { credits: { by } } = getResizedImageData(mockCreditsData);
    // doesn't have content_elements, just an array with elements that have promo_items
    expect(by[0].resized_params).toEqual({
      '158x105': '/jDV13NRbki-mzrsgQFfZjcSwABw=filters:format(jpg):quality(70)/',
      '158x119': '/BTrRV2a2kh2y3BIwbM5oKQKBNDs=filters:format(jpg):quality(70)/',
      '274x183': '/fxQaIWaQP5lRjwYUPWVQwMkNH9o=filters:format(jpg):quality(70)/',
      '274x206': '/OL7VUs7AyKWyREepsXcuvd89l58=filters:format(jpg):quality(70)/',
    });
  });
  it('returns empty resizer params author bio if img not', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
      }));

    const { credits: { by } } = getResizedImageData(mockCreditsEmptyImgData);
    // doesn't have content_elements, just an array with elements that have promo_items
    expect(by[0].resized_params).toEqual({});
  });
  it('get lead art', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
      }));

    const dataWithResizedImages = getResizedImageData(mockLeadArtData);

    // doesn't have content_elements, just an array with elements that have promo_items
    const resizedParams = dataWithResizedImages.promo_items
      .lead_art
      .promo_items.basic.resized_params;

    const paramKeys = Object.keys(resizedParams);

    const filterValues = Object.values(resizedParams);

    // if the same resizer key is used this won't change
    expect(filterValues).toEqual([
      '/JH9YE5rXU3WoFv5vs342UvuC1gA=filters:format(jpg):quality(70)/',
      '/oVCzXp5WcaNYOq9omFEyWoMCo78=filters:format(jpg):quality(70)/',
      '/31mmYPove0AN7aFn_vwKJ0qhZeI=filters:format(jpg):quality(70)/',
      '/TkU_4vX7gHlX4WBLLwCDMrLuQj4=filters:format(jpg):quality(70)/',
    ]);

    const allValidFilterValues = filterValues.every((imageFilterValue) => typeof imageFilterValue !== 'undefined' && imageFilterValue.includes(':quality(70)/'));
    expect(allValidFilterValues).toEqual(true);

    expect(paramKeys).toEqual([
      '158x105',
      '274x183',
      '158x119',
      '274x206',
    ]);
  });
});
