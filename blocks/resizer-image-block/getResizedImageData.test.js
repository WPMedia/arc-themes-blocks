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
import topLeveLeadArt from './topLevelLeadArt';
import galleryResizeData from './galleryResizeData';
import searchResultsDataBroken from './searchResultsDataBroken';
import mockStoryFeedDataEmptyPromo from './mockStoryFeedDataEmptyPromo';
import mockLeadArtDataEmptyPromo from './mockLeadArtDataEmptyPromo';
import mockSearchApiDataEmptyPromo from './mockSearchApiDataEmptyPromo';

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
        resizerURL: 'https://fake.cdn.com/resizer',
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
        resizerURL: 'https://fake.cdn.com/resizer',
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
        resizerURL: 'https://fake.cdn.com/resizer',
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
        resizerURL: 'https://fake.cdn.com/resizer',
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
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

    const dataWithResizedImages = getResizedImageData(mockLeadArtData);

    // doesn't have content_elements, just an array with elements that have promo_items
    const resizedParams = dataWithResizedImages.promo_items
      .lead_art
      .promo_items.basic.resized_params;

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
  });

  it('resizes recursively for content type gallery, returns gallery specific sizes', () => {
    getProperties.mockImplementation(() => ({
      breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
      aspectRatios: ASPECT_RATIOS,
      imageWidths: IMAGE_WIDTHS,
      resizerURL: 'https://fake.cdn.com/resizer',
    }));

    const resizedObject = getResizedImageData(galleryResizeData);

    expect(resizedObject.content_elements[0].content_elements[0].resized_params)
      .toEqual({
        '1600x1067': '/Aed9imgLCVXM6Nwk1zJulxUpaIk=filters:format(jpg):quality(70)/',
        '1600x1200': '/N5G8ddC9NDk_mNbK9PVAA800hwo=filters:format(jpg):quality(70)/',
        '400x267': '/mEsGuTeYQorRDsIYGoHSmEeIIRY=filters:format(jpg):quality(70)/',
        '400x300': '/HBqyO7f0x9txjJ9Xpw2fB6wcO1I=filters:format(jpg):quality(70)/',
        '600x400': '/LEQ0FS_CjCNwdc8pPfrwj4Aw8ng=filters:format(jpg):quality(70)/',
        '600x450': '/4j_-SGNQZLqeShesrITrWb-jqHY=filters:format(jpg):quality(70)/',
        '800x533': '/hx55AmkHc6npIZv0uiZ2bPseXhE=filters:format(jpg):quality(70)/',
        '800x600': '/Z3sU9m11Oq8UNZ5MsgMs3u8m5Qs=filters:format(jpg):quality(70)/',
      });
  });
  it('takes in lead art on the top level data', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

    const dataWithResizedImages = getResizedImageData(topLeveLeadArt);
    expect(dataWithResizedImages.promo_items.lead_art.resized_params).toEqual({
      '158x105': '/I9PStk1gjBSf260jZTioN4u_RPo=filters:format(jpg):quality(70)/',
      '158x119': '/-bLoWbHajT6EMnuJq9KILDWTk9k=filters:format(jpg):quality(70)/',
      '274x183': '/3iOl2XDNsie7ZxxlpRagvADtkio=filters:format(jpg):quality(70)/',
      '274x206': '/P5WszqbW7D4BknEyLhffQi2ulIk=filters:format(jpg):quality(70)/',
    });
  });
  it('takes in search results data object', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

    const dataWithResizedImages = getResizedImageData(searchResultsDataBroken.data);

    expect(dataWithResizedImages[0].promo_items.basic.resized_params).toEqual({
      '158x105': '/OsfQnLmY00jrVTU2Bn4BNFUNMhU=filters:format(jpg):quality(70)/',
      '158x119': '/h0EkN6oDSPYmLReOq22BJZYfCz4=filters:format(jpg):quality(70)/',
      '274x183': '/tei84mHd537sfGdIxzgfEPb90rM=filters:format(jpg):quality(70)/',
      '274x206': '/2Qa9_nYqKGnCzwL-goJs3iZ4LwY=filters:format(jpg):quality(70)/',
    });
  });
  it('respects aspect ratio of image and only url', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));
    const sampleImage = 'image.jpg';
    const dataWithResizedImages = getResizedImageData(sampleImage, null, true, true);
    // uses fit in logic
    expect(dataWithResizedImages).toEqual({
      '158x105': '/OhPCT9HOiYClZDcHtXJA1y_HbO8=/fit-in/158x105/filters:quality(70):fill(white):background_color(white)/',
      '158x119': '/d1gFvKA4cYT9lBiMNFWTq-7zY5w=/fit-in/158x119/filters:quality(70):fill(white):background_color(white)/',
      '274x183': '/DakL7zt-4boiiIW4glxQ_Ot3l1k=/fit-in/274x183/filters:quality(70):fill(white):background_color(white)/',
      '274x206': '/1ZfEGgXbYqMzzbVM2PUWqZo1RJo=/fit-in/274x206/filters:quality(70):fill(white):background_color(white)/',
    });
  });
  it('return null if only image is used with no image url', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));
    const dataWithResizedImages = getResizedImageData('', null, true, true);
    // uses fit in logic
    expect(dataWithResizedImages).toEqual(null);
  });

  it('returns data passed in if promo_items do not has all the data', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

    const data = getResizedImageData(mockStoryFeedDataEmptyPromo);
    expect(data).toEqual(mockStoryFeedDataEmptyPromo);
  });

  it('get lead art passed in if promo_items do not has all the data', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

    const leadArtData = getResizedImageData(mockLeadArtDataEmptyPromo);
    const resizedParams = leadArtData.promo_items
      .lead_art
      .promo_items.basic.resized_params;

    expect(typeof resizedParams).toEqual('undefined');
    expect(leadArtData).toEqual(mockLeadArtDataEmptyPromo);
  });

  it('takes in search results data object', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

    const dataSearch = getResizedImageData(mockSearchApiDataEmptyPromo);
    expect(typeof dataSearch[0].promo_items.basic.resized_params).toEqual('undefined');
    expect(dataSearch).toEqual(mockSearchApiDataEmptyPromo);
  });
});
