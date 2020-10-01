/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */

import getProperties from 'fusion:properties';
import getResizedImageData, { extractResizedParams } from '.';
import mockStoryFeedData from './mocks/mockFeedData';
import mockSearchApiData from './mocks/mockSearchApiData';
import mockCreditsData from './mocks/mockCreditsData';
import mockCreditsEmptyImgData from './mocks/mockCreditsEmptyImgData';
import mockLeadArtData from './mocks/mockLeadArtData';
import topLeveLeadArt from './mocks/topLevelLeadArt';
import galleryResizeData from './mocks/galleryResizeData';
import searchResultsDataBroken from './mocks/searchResultsDataBroken';
import mockStoryFeedDataEmptyPromo from './mocks/mockStoryFeedDataEmptyPromo';
import mockLeadArtDataEmptyPromo from './mocks/mockLeadArtDataEmptyPromo';
import mockSearchApiDataEmptyPromo from './mocks/mockSearchApiDataEmptyPromo';
import mockLeadArtVideo from './mocks/mockLeadArtVideo';
import mockLeadArtVideoPromoBasic from './mocks/mockLeadArtVideoPromoBasic';
import mockFocalBasicPoint from './mocks/mockStoryPromoItemsBasicFocalPoint';
import mockFocalLeadArtPoint from './mocks/mockStoryPromoItemsLeadArtFocalPoint';
import mockFocalPointOverwrite from './mocks/mockStoryPromoItemsBasicFocalPointOverwrite';
import mockGalleryFocalPoint from './mocks/mockStoryPromoItemsGalleryFocalPoint';

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
      'B-33vJ0Ak54a9pMvGhgkzGk0meE=filters:cm=t/',
      'CfybbXLZWF3gcwc2tD-FYzZlc8Y=filters:cm=t/',
      'RwaE87wvO3wFs17iLXhecTl2hhQ=filters:cm=t/',
      '6SNHSvz_6KHTam6lqe-ZgKzlzLs=filters:cm=t/']);

    // {
    // '420x315|mobile':
    // '/1QqmqwWQDKeiaT6bDVR31vyHK3k=Z/',
    // },

    // will return undefined if no window
    const allValidFilterValues = filterValues.every((imageFilterValue) => typeof imageFilterValue !== 'undefined' && imageFilterValue.includes(':cm=t/'));
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
      '5eirj3cmfExljl2SvX6qbwxrB3Y=filters:cm=t/',
      'rIrdmTmnUR9StYnBIR1e4vpyLMo=filters:cm=t/',
      'v9_ZAorNWy8_1ujEQVwu9lYF1Mo=filters:cm=t/',
      'B014aKo-I_UZCWeJ43kYGefBp40=filters:cm=t/',
    ]);

    const allValidFilterValues = filterValues.every((imageFilterValue) => typeof imageFilterValue !== 'undefined' && imageFilterValue.includes(':cm=t/'));
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
      '158x105': 'jDV13NRbki-mzrsgQFfZjcSwABw=filters:cm=t/',
      '158x119': 'BTrRV2a2kh2y3BIwbM5oKQKBNDs=filters:cm=t/',
      '274x183': 'fxQaIWaQP5lRjwYUPWVQwMkNH9o=filters:cm=t/',
      '274x206': 'OL7VUs7AyKWyREepsXcuvd89l58=filters:cm=t/',
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
      'JH9YE5rXU3WoFv5vs342UvuC1gA=filters:cm=t/',
      'oVCzXp5WcaNYOq9omFEyWoMCo78=filters:cm=t/',
      '31mmYPove0AN7aFn_vwKJ0qhZeI=filters:cm=t/',
      'TkU_4vX7gHlX4WBLLwCDMrLuQj4=filters:cm=t/',
    ]);

    const allValidFilterValues = filterValues.every((imageFilterValue) => typeof imageFilterValue !== 'undefined' && imageFilterValue.includes(':cm=t/'));
    expect(allValidFilterValues).toEqual(true);
  });

  it('get lead art from video', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

    const dataWithResizedImages = getResizedImageData(mockLeadArtVideo);

    // doesn't have content_elements, just an array with elements that have promo_items
    const resizedParams = dataWithResizedImages.promo_items
      .lead_art
      .promo_items.basic.resized_params;
    const extracted = extractResizedParams(dataWithResizedImages);
    const filterValues = Object.values(resizedParams);

    // if the same resizer key is used this won't change
    expect(filterValues).toEqual([
      'tlTe1hPc85YfFlTMCStAmmrE2Vc=filters:cm=t/',
      'bWSAqvBttzIKiAE1e6phCZBYdH0=filters:cm=t/',
      'Vl230_LsGyl4R2KEQU6TF_8H5Wc=filters:cm=t/',
      'wHPWgxtNFn5PYodMUfU3SpZV5rA=filters:cm=t/',
    ]);

    expect(resizedParams).toEqual(extracted);

    const allValidFilterValues = filterValues.every((imageFilterValue) => typeof imageFilterValue !== 'undefined' && imageFilterValue.includes(':cm=t/'));
    expect(allValidFilterValues).toEqual(true);
  });

  it('get lead art fom video from promo.basic if has image', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

    const dataWithResizedImages = getResizedImageData(mockLeadArtVideoPromoBasic);

    const resizedParams = dataWithResizedImages.promo_items.basic.resized_params;
    const extracted = extractResizedParams(dataWithResizedImages);
    const filterValues = Object.values(resizedParams);

    expect(filterValues).toEqual([
      'Kjuf_xqpadIZBFEG2XsBC3bNoEM=filters:cm=t/',
      '_gwdkIM1uwTFiR0LWaaOUQc3rA0=filters:cm=t/',
      '15d84ojP7siUek9f5jzDMQQWMMs=filters:cm=t/',
      'qCvQmPpPxYd_dYM8uNnbRcRt4rY=filters:cm=t/',
    ]);

    expect(resizedParams).toEqual(extracted);

    const allValidFilterValues = filterValues.every((imageFilterValue) => typeof imageFilterValue !== 'undefined' && imageFilterValue.includes(':cm=t/'));
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
        '1600x1067': 'Aed9imgLCVXM6Nwk1zJulxUpaIk=filters:cm=t/',
        '1600x1200': 'N5G8ddC9NDk_mNbK9PVAA800hwo=filters:cm=t/',
        '400x267': 'mEsGuTeYQorRDsIYGoHSmEeIIRY=filters:cm=t/',
        '400x300': 'HBqyO7f0x9txjJ9Xpw2fB6wcO1I=filters:cm=t/',
        '600x400': 'LEQ0FS_CjCNwdc8pPfrwj4Aw8ng=filters:cm=t/',
        '600x450': '4j_-SGNQZLqeShesrITrWb-jqHY=filters:cm=t/',
        '800x533': 'hx55AmkHc6npIZv0uiZ2bPseXhE=filters:cm=t/',
        '800x600': 'Z3sU9m11Oq8UNZ5MsgMs3u8m5Qs=filters:cm=t/',
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
      '158x105': 'I9PStk1gjBSf260jZTioN4u_RPo=filters:cm=t/',
      '158x119': '-bLoWbHajT6EMnuJq9KILDWTk9k=filters:cm=t/',
      '274x183': '3iOl2XDNsie7ZxxlpRagvADtkio=filters:cm=t/',
      '274x206': 'P5WszqbW7D4BknEyLhffQi2ulIk=filters:cm=t/',
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
      '158x105': 'OsfQnLmY00jrVTU2Bn4BNFUNMhU=filters:cm=t/',
      '158x119': 'h0EkN6oDSPYmLReOq22BJZYfCz4=filters:cm=t/',
      '274x183': 'tei84mHd537sfGdIxzgfEPb90rM=filters:cm=t/',
      '274x206': '2Qa9_nYqKGnCzwL-goJs3iZ4LwY=filters:cm=t/',
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
      '158x105': 'OhPCT9HOiYClZDcHtXJA1y_HbO8=/fit-in/158x105/filters:cm=t:fill(white):background_color(white)/',
      '158x119': 'd1gFvKA4cYT9lBiMNFWTq-7zY5w=/fit-in/158x119/filters:cm=t:fill(white):background_color(white)/',
      '274x183': 'DakL7zt-4boiiIW4glxQ_Ot3l1k=/fit-in/274x183/filters:cm=t:fill(white):background_color(white)/',
      '274x206': '1ZfEGgXbYqMzzbVM2PUWqZo1RJo=/fit-in/274x206/filters:cm=t:fill(white):background_color(white)/',
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

describe('focal point', () => {
  it('must genenerate focal point filter for all resized urls on basic promo items', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

    const imageData = getResizedImageData(mockFocalBasicPoint);
    const resizedParams = imageData.promo_items.basic.resized_params;

    Object.keys(resizedParams).forEach((key) => {
      expect(resizedParams[key]).toMatch(/focal\(1674x452:1684x462\)/);
    });
  });

  it('must genenerate focal point filter for all resized urls on lead_art promo items', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

    const imageData = getResizedImageData(mockFocalLeadArtPoint);
    const resizedParams = imageData.promo_items.lead_art.resized_params;

    Object.keys(resizedParams).forEach((key) => {
      expect(resizedParams[key]).toMatch(/focal\(65x65:75x75\)/);
    });
  });

  it('must genenerate focal point filter for all resized urls on basic promo items when overwritten on Composer', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

    const imageData = getResizedImageData(mockFocalPointOverwrite);
    const resizedParams = imageData.promo_items.basic.resized_params;

    Object.keys(resizedParams).forEach((key) => {
      expect(resizedParams[key]).toMatch(/focal\(98x99:108x109\)/);
    });
  });

  it('must genenerate focal point filter for all resized urls on lead art promo items when is Gallery', () => {
    getProperties.mockImplementation(() => (
      {
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

    const imageData = getResizedImageData(mockGalleryFocalPoint);
    const resizedParams = imageData.promo_items.lead_art.promo_items.basic.resized_params;

    Object.keys(resizedParams).forEach((key) => {
      expect(resizedParams[key]).toMatch(/focal\(5245x213:5255x223\)/);
    });

    const galleryItems = imageData.promo_items.lead_art.content_elements;

    // the gallery elements that have focal point, must have the url with the filter too
    galleryItems.forEach((item) => {
      if (item.focal_point) {
        Object.keys(item.resized_params).forEach((key) => {
          expect(item.resized_params[key]).toMatch(/focal\(5245x213:5255x223\)/);
        });
      }
    });
  });
});
