/**
 * this is for mocking dom env
 * dom will have window node
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment jsdom
 */

import getProperties from 'fusion:properties';
import { getResizedImageData } from '../story-feed-query';
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


describe('get resized image data helper on the client-side', () => {
  it('returns undefined passed in if window is defined', () => {
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

    // make sure they are all undefined
    // {
    // '420x315':
    // undefined,
    // },

    // will return undefined if no window
    const allValidFilterValues = filterValues.every((imageFilterValue) => typeof imageFilterValue !== 'undefined' && imageFilterValue.includes(':quality(70)/'));
    expect(allValidFilterValues).toEqual(false);

    expect(paramKeys).toEqual([
      '158x105',
      '158x119',
      '274x183',
      '274x206',
    ]);
  });
});
