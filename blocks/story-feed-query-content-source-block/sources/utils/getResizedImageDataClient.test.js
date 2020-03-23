/**
 * this is for mocking dom env
 * dom will have window node
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment jsdom
 */

import getProperties from 'fusion:properties';
import getResizedImageData from './getResizedImageData';
import mockStoryFeedData from './mockStoryFeedData';

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
  {
    device: 'widescreen',
    width: 1200,
  },
];

const ASPECT_RATIOS = [
  '1:1',
  '3:2',
  '4:3',
  '16:9',
];


describe('get resized image data helper on the client-side', () => {
  it('returns undefined passed in if window is defined', () => {
    getProperties.mockImplementation(() => (
      { breakpoints: DEFAULT_BREAKPOINTS_ARRAY, aspectRatios: ASPECT_RATIOS }));

    const dataWithResizedImages = getResizedImageData(mockStoryFeedData);

    const resizedParams = dataWithResizedImages
      .content_elements[0]
      .promo_items
      .basic
      .resized_params;

    const flattenedObjectBreakpoints = Object.assign({}, ...resizedParams);

    const paramKeys = Object.keys(flattenedObjectBreakpoints);

    const filterValues = Object.values(flattenedObjectBreakpoints);

    // make sure none of them undefined
    // {
    // '420x315|mobile':
    // undefined,
    // },

    // will return undefined if no window
    const allValidFilterValues = filterValues.every((imageFilterValue) => typeof imageFilterValue !== 'undefined' && imageFilterValue.includes(':quality(70)/'));
    expect(allValidFilterValues).toEqual(false);

    expect(paramKeys).toEqual(['420x420', '420x280', '420x315', '420x236', '768x768', '768x512', '768x576', '768x432', '992x992', '992x661', '992x744', '992x558', '1200x1200', '1200x800', '1200x900', '1200x675', '420x420|mobile', '420x280|mobile', '420x315|mobile', '420x236|mobile']);
  });
});
