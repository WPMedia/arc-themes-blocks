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
import mockCollectionApiData from './mocks/mockCollectionApi';
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
const ASPECT_RATIOS = ['3:2', '4:3'];

const IMAGE_WIDTHS = [158, 274];

describe('get resized image data helper on the server-side', () => {
  it('returns data passed in if missing env variables', () => {
    getProperties.mockImplementation(() => ({}));
    const dataWithResizedImages = getResizedImageData(
      mockStoryFeedData,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    );
    const resizedParams = dataWithResizedImages.content_elements[0].promo_items.basic;

    expect(typeof resizedParams.resized_params).toBe('undefined');
  });

  it('returns data passed in if window is undefined', () => {
    getProperties.mockImplementation(() => ({
      breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
      aspectRatios: ASPECT_RATIOS,
      imageWidths: IMAGE_WIDTHS,
      resizerURL: 'https://fake.cdn.com/resizer',
    }));

    const dataWithResizedImages = getResizedImageData(
      mockStoryFeedData,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    );

    const resizedParams = dataWithResizedImages.content_elements[0].promo_items.basic
      .resized_params;

    const paramKeys = Object.keys(resizedParams);

    const filterValues = Object.values(resizedParams);

    // if the same resizer key is used this won't change
    expect(filterValues).toMatchInlineSnapshot(`
      Array [
        "igyDQnirIWiPosvSiO_PVOjfwHA=filters:format(jpg):quality(100)/",
        "4lVf8lQhLiqoR4NgWR7InIJAOZk=filters:format(jpg):quality(100)/",
        "7-qaCK-mTjMA9yVPdWG4jW4pF8Y=filters:format(jpg):quality(100)/",
        "MYnhckU5ZpRLz-_qPWht5dA6btU=filters:format(jpg):quality(100)/",
      ]
    `);

    // {
    // '420x315|mobile':
    // '/1QqmqwWQDKeiaT6bDVR31vyHK3k=Z/',
    // },

    // will return undefined if no window
    const allValidFilterValues = filterValues.every(
      (imageFilterValue) => typeof imageFilterValue !== 'undefined'
        && imageFilterValue.includes(':cm=t/'),
    );
    expect(allValidFilterValues).toEqual(false);

    expect(paramKeys).toEqual(['158x105', '274x183', '158x119', '274x206']);
  });

  describe('when shouldCompressImageParams siteProperty is true', () => {
    it('returns data passed in from search-api', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const dataWithResizedImages = getResizedImageData(
        mockSearchApiData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      // doesn't have content_elements, just an array with elements that have promo_items
      const resizedParams = dataWithResizedImages[0].promo_items.basic.resized_params;

      const paramKeys = Object.keys(resizedParams);

      const filterValues = Object.values(resizedParams);

      // if the same resizer key is used this won't change
      expect(filterValues).toMatchInlineSnapshot(`
        Array [
          "EREuTd-UQVMoQjP2ankGgbautlg=filters:cm=t/",
          "-GUCWJze1aTW0QRU9zOn5z36z3k=filters:cm=t/",
          "3vBeOPrsHfy4mMOkthiJnL5jVgg=filters:cm=t/",
          "moZOK3Mk4Rrdadc27RNhfcAc2dk=filters:cm=t/",
        ]
      `);

      const allValidFilterValues = filterValues.every(
        (imageFilterValue) => typeof imageFilterValue !== 'undefined'
          && imageFilterValue.includes(':cm=t/'),
      );
      expect(allValidFilterValues).toEqual(true);

      expect(paramKeys).toEqual(['158x105', '274x183', '158x119', '274x206']);
    });

    it('resizes author bio if img available', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const {
        credits: { by },
      } = getResizedImageData(
        mockCreditsData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      // doesn't have content_elements, just an array with elements that have promo_items
      expect(by[0].resized_params).toMatchInlineSnapshot(`
        Object {
          "158x105": "kE9cLRoDuX1D4iGi7OskhyFQVB4=filters:cm=t/",
          "158x119": "d_ZwPySPo1qycLbh2k1l7AVaEYI=filters:cm=t/",
          "274x183": "RvBSoxoCaOa3AjdgrnuE2s4CNzQ=filters:cm=t/",
          "274x206": "XlPFwhVUcOEbxOfvlaPVU3FZG3A=filters:cm=t/",
        }
      `);
    });

    it('returns empty resizer params author bio if img not available', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const {
        credits: { by },
      } = getResizedImageData(
        mockCreditsEmptyImgData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      // doesn't have content_elements, just an array with elements that have promo_items
      expect(by[0].resized_params).toEqual({});
    });

    it('get lead art', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const dataWithResizedImages = getResizedImageData(
        mockLeadArtData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      // doesn't have content_elements, just an array with elements that have promo_items
      const resizedParams = dataWithResizedImages.promo_items.lead_art.promo_items.basic
        .resized_params;

      const filterValues = Object.values(resizedParams);

      // if the same resizer key is used this won't change
      expect(filterValues).toMatchInlineSnapshot(`
        Array [
          "co26FkibNRkufnqhCrv31ltn3Qk=filters:cm=t/",
          "1-1GML46DecxrRZIO6zlUyhNlCM=filters:cm=t/",
          "hryQKRCgFBZFSYWZbtrFoIxIrZ8=filters:cm=t/",
          "flYSAsm24JkPkewDl_Pi1hFncco=filters:cm=t/",
        ]
      `);

      const allValidFilterValues = filterValues.every(
        (imageFilterValue) => typeof imageFilterValue !== 'undefined'
          && imageFilterValue.includes(':cm=t/'),
      );
      expect(allValidFilterValues).toEqual(true);
    });

    it('get lead art from video', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const dataWithResizedImages = getResizedImageData(
        mockLeadArtVideo,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      // doesn't have content_elements, just an array with elements that have promo_items
      const resizedParams = dataWithResizedImages.promo_items.lead_art.promo_items.basic
        .resized_params;
      const extracted = extractResizedParams(dataWithResizedImages);
      const filterValues = Object.values(resizedParams);

      // if the same resizer key is used this won't change
      expect(filterValues).toMatchInlineSnapshot(`
        Array [
          "4mgc_9DVIamXxOBFJaSxZCD3Jno=filters:cm=t/",
          "uJf7xjoOo9sCbnXfLdtATJhEBSs=filters:cm=t/",
          "NrSnvTUDyiPv-xCB9tmi3NyCilA=filters:cm=t/",
          "sLt3FYHh0ApqlGDua20kY43QGiQ=filters:cm=t/",
        ]
      `);

      expect(resizedParams).toEqual(extracted);

      const allValidFilterValues = filterValues.every(
        (imageFilterValue) => typeof imageFilterValue !== 'undefined'
          && imageFilterValue.includes(':cm=t/'),
      );
      expect(allValidFilterValues).toEqual(true);
    });

    it('get lead art fom video from promo.basic if has image', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const dataWithResizedImages = getResizedImageData(
        mockLeadArtVideoPromoBasic,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      const resizedParams = dataWithResizedImages.promo_items.basic.resized_params;
      const extracted = extractResizedParams(dataWithResizedImages);
      const filterValues = Object.values(resizedParams);

      expect(filterValues).toMatchInlineSnapshot(`
        Array [
          "2Ns147Ak_pZ6TkrSYoRUfnW0bVA=filters:cm=t/",
          "JIUnkF0m3umWdDCxHKrg_8rfPPI=filters:cm=t/",
          "-EPZfCyhyYhQQKqRcTv4-ZjoDyY=filters:cm=t/",
          "cmPTX14xGKGGWOsoi7dWhwBXClI=filters:cm=t/",
        ]
      `);

      expect(resizedParams).toEqual(extracted);

      const allValidFilterValues = filterValues.every(
        (imageFilterValue) => typeof imageFilterValue !== 'undefined'
          && imageFilterValue.includes(':cm=t/'),
      );
      expect(allValidFilterValues).toEqual(true);
    });

    it('resizes recursively for content type gallery, returns gallery specific sizes', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const resizedObject = getResizedImageData(
        galleryResizeData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      expect(
        resizedObject.content_elements[0].content_elements[0].resized_params,
      ).toMatchInlineSnapshot(`
        Object {
          "1600x1067": "k2x4mXQyBfMawGtPgp0gtMXT4Pk=filters:format(png):quality(100)/",
          "1600x1200": "1p4T8JDvU05MQJcEE6SammR9Daw=filters:format(png):quality(100)/",
          "400x267": "s7tcgYyuonSkRCr6bZJFiwoVU3I=filters:format(png):quality(100)/",
          "400x300": "Pg5am-YDB3V4NRbCvrWWD6YCVQ4=filters:format(png):quality(100)/",
          "600x400": "FA6yrU5j5xRlutOMzyoHTT3KFU4=filters:format(png):quality(100)/",
          "600x450": "zpL3EqYdhqMQ6kg71b9YIOrFNfg=filters:format(png):quality(100)/",
          "800x533": "dp_-z9TNZVu5QzbriCMNzNKJFv0=filters:format(png):quality(100)/",
          "800x600": "78MHEssuxVt7e-PyaSIqFdZvsXE=filters:format(png):quality(100)/",
        }
      `);
    });

    it('takes in lead art on the top level data', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const dataWithResizedImages = getResizedImageData(
        topLeveLeadArt,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      expect(dataWithResizedImages.promo_items.lead_art.resized_params)
        .toMatchInlineSnapshot(`
        Object {
          "158x105": "FS7CrD6TSWVIwBLu7VgbwGLShVg=filters:cm=t/",
          "158x119": "aqfECJmTvdeb_Lmz-_GCU6_v-Hc=filters:cm=t/",
          "274x183": "z1Jj9fbE3Q1-85jWjUASFzEuPAw=filters:cm=t/",
          "274x206": "A0dt-xDAk-4PJ8bDel3HyX411zw=filters:cm=t/",
        }
      `);
    });

    it('takes in search results data object', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const dataWithResizedImages = getResizedImageData(
        searchResultsDataBroken.data,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      expect(dataWithResizedImages[0].promo_items.basic.resized_params)
        .toMatchInlineSnapshot(`
        Object {
          "158x105": "XyqNe7Q5Keez3xawI_0URqTw_Zg=filters:cm=t/",
          "158x119": "0Z59aB5_xf5U36svO5HebXHMYKQ=filters:cm=t/",
          "274x183": "XqGLb1xYqCBZffgbj1voY493qT8=filters:cm=t/",
          "274x206": "hThHHljJvtnZt457lFAbEfHiacA=filters:cm=t/",
        }
      `);
    });

    it('respects aspect ratio of image and only url', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));
      const sampleImage = 'image.jpg';
      const dataWithResizedImages = getResizedImageData(
        sampleImage,
        null,
        true,
        true,
        undefined,
        undefined,
      );
      // uses fit in logic
      // only png allowed here
      // by default, fit in only works with png
      // not coercing png
      expect(dataWithResizedImages).toMatchInlineSnapshot(`
        Object {
          "158x105": "yOzHBF-OtvFQVIzNPw9Ya1Lmkmk=/fit-in/158x105/filters:quality(100):fill(white):background_color(white)/",
          "158x119": "gTYuSRL8G733PqIM-0VcVlv5gxw=/fit-in/158x119/filters:quality(100):fill(white):background_color(white)/",
          "274x183": "q49t-MGtKs3x6yfAEznrKbymf1I=/fit-in/274x183/filters:quality(100):fill(white):background_color(white)/",
          "274x206": "Ys5CddSmKeqYyLrMhhWwLQ3K2ZY=/fit-in/274x206/filters:quality(100):fill(white):background_color(white)/",
        }
      `);
    });
    it('return null if only image is used with no image url', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));
      const dataWithResizedImages = getResizedImageData('', null, true, true);
      // uses fit in logic
      expect(dataWithResizedImages).toEqual(null);
    });

    it('returns data passed in if promo_items do not has all the data', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const data = getResizedImageData(
        mockStoryFeedDataEmptyPromo,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      expect(data).toEqual(mockStoryFeedDataEmptyPromo);
    });

    it('get lead art passed in if promo_items do not has all the data', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const leadArtData = getResizedImageData(
        mockLeadArtDataEmptyPromo,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      const resizedParams = leadArtData.promo_items.lead_art.promo_items.basic.resized_params;

      expect(typeof resizedParams).toEqual('undefined');
      expect(leadArtData).toEqual(mockLeadArtDataEmptyPromo);
    });

    it('takes in search results data object', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const dataSearch = getResizedImageData(
        mockSearchApiDataEmptyPromo,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      expect(typeof dataSearch[0].promo_items.basic.resized_params).toEqual(
        'undefined',
      );
      expect(dataSearch).toEqual(mockSearchApiDataEmptyPromo);
    });

    it('takes in collection api results data object', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
        shouldCompressImageParams: true,
      }));

      const dataSearch = getResizedImageData(
        mockCollectionApiData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      expect(
        typeof dataSearch.content_elements[0].promo_items.basic.resized_params,
      ).toEqual('object');
    });
  });
  describe('when shouldCompressImageParams siteProperty is false (unset)', () => {
    it('returns data passed in from search-api', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const dataWithResizedImages = getResizedImageData(
        mockSearchApiData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      // doesn't have content_elements, just an array with elements that have promo_items
      const resizedParams = dataWithResizedImages[0].promo_items.basic.resized_params;

      const paramKeys = Object.keys(resizedParams);

      const filterValues = Object.values(resizedParams);

      // if the same resizer key is used this won't change
      expect(filterValues).toMatchInlineSnapshot(`
        Array [
          "EREuTd-UQVMoQjP2ankGgbautlg=filters:format(jpg):quality(100)/",
          "-GUCWJze1aTW0QRU9zOn5z36z3k=filters:format(jpg):quality(100)/",
          "3vBeOPrsHfy4mMOkthiJnL5jVgg=filters:format(jpg):quality(100)/",
          "moZOK3Mk4Rrdadc27RNhfcAc2dk=filters:format(jpg):quality(100)/",
        ]
      `);

      const allValidFilterValues = filterValues.every(
        (imageFilterValue) => typeof imageFilterValue !== 'undefined'
          && imageFilterValue.includes(':format(jpg):quality(100)/'),
      );
      expect(allValidFilterValues).toEqual(true);

      expect(paramKeys).toEqual(['158x105', '274x183', '158x119', '274x206']);
    });

    it('resizes author bio if img available', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const {
        credits: { by },
      } = getResizedImageData(
        mockCreditsData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      // doesn't have content_elements, just an array with elements that have promo_items
      expect(by[0].resized_params).toMatchInlineSnapshot(`
        Object {
          "158x105": "kE9cLRoDuX1D4iGi7OskhyFQVB4=filters:format(jpg):quality(100)/",
          "158x119": "d_ZwPySPo1qycLbh2k1l7AVaEYI=filters:format(jpg):quality(100)/",
          "274x183": "RvBSoxoCaOa3AjdgrnuE2s4CNzQ=filters:format(jpg):quality(100)/",
          "274x206": "XlPFwhVUcOEbxOfvlaPVU3FZG3A=filters:format(jpg):quality(100)/",
        }
      `);
    });

    it('returns empty resizer params author bio if img not available', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const {
        credits: { by },
      } = getResizedImageData(
        mockCreditsEmptyImgData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      // doesn't have content_elements, just an array with elements that have promo_items
      expect(by[0].resized_params).toEqual({});
    });

    it('get lead art', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const dataWithResizedImages = getResizedImageData(
        mockLeadArtData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      // doesn't have content_elements, just an array with elements that have promo_items
      const resizedParams = dataWithResizedImages.promo_items.lead_art.promo_items.basic
        .resized_params;

      const filterValues = Object.values(resizedParams);

      // if the same resizer key is used this won't change
      expect(filterValues).toMatchInlineSnapshot(`
        Array [
          "co26FkibNRkufnqhCrv31ltn3Qk=filters:format(jpg):quality(100)/",
          "1-1GML46DecxrRZIO6zlUyhNlCM=filters:format(jpg):quality(100)/",
          "hryQKRCgFBZFSYWZbtrFoIxIrZ8=filters:format(jpg):quality(100)/",
          "flYSAsm24JkPkewDl_Pi1hFncco=filters:format(jpg):quality(100)/",
        ]
      `);

      const allValidFilterValues = filterValues.every(
        (imageFilterValue) => typeof imageFilterValue !== 'undefined'
          && imageFilterValue.includes(':format(jpg):quality(100)/'),
      );
      expect(allValidFilterValues).toEqual(true);
    });

    it('get lead art from video', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const dataWithResizedImages = getResizedImageData(
        mockLeadArtVideo,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      // doesn't have content_elements, just an array with elements that have promo_items
      const resizedParams = dataWithResizedImages.promo_items.lead_art.promo_items.basic
        .resized_params;
      const extracted = extractResizedParams(dataWithResizedImages);
      const filterValues = Object.values(resizedParams);

      // if the same resizer key is used this won't change
      expect(filterValues).toMatchInlineSnapshot(`
        Array [
          "4mgc_9DVIamXxOBFJaSxZCD3Jno=filters:format(jpg):quality(100)/",
          "uJf7xjoOo9sCbnXfLdtATJhEBSs=filters:format(jpg):quality(100)/",
          "NrSnvTUDyiPv-xCB9tmi3NyCilA=filters:format(jpg):quality(100)/",
          "sLt3FYHh0ApqlGDua20kY43QGiQ=filters:format(jpg):quality(100)/",
        ]
      `);

      expect(resizedParams).toEqual(extracted);

      const allValidFilterValues = filterValues.every(
        (imageFilterValue) => typeof imageFilterValue !== 'undefined'
          && imageFilterValue.includes(':format(jpg):quality(100)/'),
      );
      expect(allValidFilterValues).toEqual(true);
    });

    it('get lead art fom video from promo.basic if has image', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const dataWithResizedImages = getResizedImageData(
        mockLeadArtVideoPromoBasic,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      const resizedParams = dataWithResizedImages.promo_items.basic.resized_params;
      const extracted = extractResizedParams(dataWithResizedImages);
      const filterValues = Object.values(resizedParams);

      expect(filterValues).toMatchInlineSnapshot(`
        Array [
          "2Ns147Ak_pZ6TkrSYoRUfnW0bVA=filters:format(jpg):quality(100)/",
          "JIUnkF0m3umWdDCxHKrg_8rfPPI=filters:format(jpg):quality(100)/",
          "-EPZfCyhyYhQQKqRcTv4-ZjoDyY=filters:format(jpg):quality(100)/",
          "cmPTX14xGKGGWOsoi7dWhwBXClI=filters:format(jpg):quality(100)/",
        ]
      `);

      expect(resizedParams).toEqual(extracted);

      const allValidFilterValues = filterValues.every(
        (imageFilterValue) => typeof imageFilterValue !== 'undefined'
          && imageFilterValue.includes(':format(jpg):quality(100)/'),
      );
      expect(allValidFilterValues).toEqual(true);
    });

    it('resizes recursively for content type gallery, returns gallery specific sizes', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const resizedObject = getResizedImageData(
        galleryResizeData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      expect(
        resizedObject.content_elements[0].content_elements[0].resized_params,
      ).toMatchInlineSnapshot(`
        Object {
          "1600x1067": "k2x4mXQyBfMawGtPgp0gtMXT4Pk=filters:format(png):quality(100)/",
          "1600x1200": "1p4T8JDvU05MQJcEE6SammR9Daw=filters:format(png):quality(100)/",
          "400x267": "s7tcgYyuonSkRCr6bZJFiwoVU3I=filters:format(png):quality(100)/",
          "400x300": "Pg5am-YDB3V4NRbCvrWWD6YCVQ4=filters:format(png):quality(100)/",
          "600x400": "FA6yrU5j5xRlutOMzyoHTT3KFU4=filters:format(png):quality(100)/",
          "600x450": "zpL3EqYdhqMQ6kg71b9YIOrFNfg=filters:format(png):quality(100)/",
          "800x533": "dp_-z9TNZVu5QzbriCMNzNKJFv0=filters:format(png):quality(100)/",
          "800x600": "78MHEssuxVt7e-PyaSIqFdZvsXE=filters:format(png):quality(100)/",
        }
      `);
    });

    it('takes in lead art on the top level data', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const dataWithResizedImages = getResizedImageData(
        topLeveLeadArt,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      expect(dataWithResizedImages.promo_items.lead_art.resized_params)
        .toMatchInlineSnapshot(`
        Object {
          "158x105": "FS7CrD6TSWVIwBLu7VgbwGLShVg=filters:format(jpg):quality(100)/",
          "158x119": "aqfECJmTvdeb_Lmz-_GCU6_v-Hc=filters:format(jpg):quality(100)/",
          "274x183": "z1Jj9fbE3Q1-85jWjUASFzEuPAw=filters:format(jpg):quality(100)/",
          "274x206": "A0dt-xDAk-4PJ8bDel3HyX411zw=filters:format(jpg):quality(100)/",
        }
      `);
    });

    it('takes in search results data object', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const dataWithResizedImages = getResizedImageData(
        searchResultsDataBroken.data,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      expect(dataWithResizedImages[0].promo_items.basic.resized_params)
        .toMatchInlineSnapshot(`
        Object {
          "158x105": "XyqNe7Q5Keez3xawI_0URqTw_Zg=filters:format(jpg):quality(100)/",
          "158x119": "0Z59aB5_xf5U36svO5HebXHMYKQ=filters:format(jpg):quality(100)/",
          "274x183": "XqGLb1xYqCBZffgbj1voY493qT8=filters:format(jpg):quality(100)/",
          "274x206": "hThHHljJvtnZt457lFAbEfHiacA=filters:format(jpg):quality(100)/",
        }
      `);
    });

    it('respects aspect ratio of image and only url', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));
      const sampleImage = 'image.jpg';
      const dataWithResizedImages = getResizedImageData(
        sampleImage,
        null,
        true,
        true,
        undefined,
        undefined,
      );
      // uses fit in logic
      // only png allowed here
      // by default, fit in only works with png
      // not coercing png
      expect(dataWithResizedImages).toMatchInlineSnapshot(`
        Object {
          "158x105": "yOzHBF-OtvFQVIzNPw9Ya1Lmkmk=/fit-in/158x105/filters:quality(100):fill(white):background_color(white)/",
          "158x119": "gTYuSRL8G733PqIM-0VcVlv5gxw=/fit-in/158x119/filters:quality(100):fill(white):background_color(white)/",
          "274x183": "q49t-MGtKs3x6yfAEznrKbymf1I=/fit-in/274x183/filters:quality(100):fill(white):background_color(white)/",
          "274x206": "Ys5CddSmKeqYyLrMhhWwLQ3K2ZY=/fit-in/274x206/filters:quality(100):fill(white):background_color(white)/",
        }
      `);
    });

    it('respects png image formats', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));
      const sampleImage = 'image.png';
      const dataWithResizedImages = getResizedImageData(
        sampleImage,
        null,
        true,
        false,
        undefined,
        undefined,
      );
      // uses fit in logic
      // only png allowed here
      // by default, fit in only works with png
      // not coercing png
      expect(dataWithResizedImages).toMatchInlineSnapshot(`
        Object {
          "158x105": "gINL0eeWHs6YwvjJYTwb84PEe60=filters:format(png):quality(100)/",
          "158x119": "7IxFyaV2Jk4iGgcPjB5-DTnVijc=filters:format(png):quality(100)/",
          "274x183": "4GKb-pXpPfl9FUo7_HkPkRvWsNU=filters:format(png):quality(100)/",
          "274x206": "nrbeK9d933GhMRlCWXbP87SWiCA=filters:format(png):quality(100)/",
        }
      `);
    });

    it('return null if only image is used with no image url', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));
      const dataWithResizedImages = getResizedImageData('', null, true, false);
      // uses fit in logic
      expect(dataWithResizedImages).toEqual(null);
    });

    it('returns data passed in if promo_items do not has all the data', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const data = getResizedImageData(
        mockStoryFeedDataEmptyPromo,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      expect(data).toEqual(mockStoryFeedDataEmptyPromo);
    });

    it('get lead art passed in if promo_items do not has all the data', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const leadArtData = getResizedImageData(
        mockLeadArtDataEmptyPromo,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      const resizedParams = leadArtData.promo_items.lead_art.promo_items.basic.resized_params;

      expect(typeof resizedParams).toEqual('undefined');
      expect(leadArtData).toEqual(mockLeadArtDataEmptyPromo);
    });

    it('takes in search results data object', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const dataSearch = getResizedImageData(
        mockSearchApiDataEmptyPromo,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      expect(typeof dataSearch[0].promo_items.basic.resized_params).toEqual(
        'undefined',
      );
      expect(dataSearch).toEqual(mockSearchApiDataEmptyPromo);
    });
  });

  describe('focal point', () => {
    it('must genenerate focal point filter for all resized urls on basic promo items', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const imageData = getResizedImageData(
        mockFocalBasicPoint,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      const resizedParams = imageData.promo_items.basic.resized_params;

      Object.keys(resizedParams).forEach((key) => {
        expect(resizedParams[key]).toMatch(/focal\(1674x452:1684x462\)/);
      });
    });

    it('must genenerate focal point filter for all resized urls on lead_art promo items', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const imageData = getResizedImageData(
        mockFocalLeadArtPoint,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      const resizedParams = imageData.promo_items.lead_art.resized_params;

      Object.keys(resizedParams).forEach((key) => {
        expect(resizedParams[key]).toMatch(/focal\(65x65:75x75\)/);
      });
    });

    it('must genenerate focal point filter for all resized urls on basic promo items when overwritten on Composer', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const imageData = getResizedImageData(
        mockFocalPointOverwrite,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      const resizedParams = imageData.promo_items.basic.resized_params;

      Object.keys(resizedParams).forEach((key) => {
        expect(resizedParams[key]).toMatch(/focal\(98x99:108x109\)/);
      });
    });

    it('must genenerate focal point filter for all resized urls on lead art promo items when is Gallery', () => {
      getProperties.mockImplementation(() => ({
        breakpoints: DEFAULT_BREAKPOINTS_ARRAY,
        aspectRatios: ASPECT_RATIOS,
        imageWidths: IMAGE_WIDTHS,
        resizerURL: 'https://fake.cdn.com/resizer',
      }));

      const imageData = getResizedImageData(
        mockGalleryFocalPoint,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      const resizedParams = imageData.promo_items.lead_art.promo_items.basic.resized_params;

      Object.keys(resizedParams).forEach((key) => {
        expect(resizedParams[key]).toMatch(/focal\(5245x213:5255x223\)/);
      });

      const galleryItems = imageData.promo_items.lead_art.content_elements;

      // the gallery elements that have focal point, must have the url with the filter too
      galleryItems.forEach((item) => {
        if (item.focal_point) {
          Object.keys(item.resized_params).forEach((key) => {
            expect(item.resized_params[key]).toMatch(
              /focal\(5245x213:5255x223\)/,
            );
          });
        }
      });
    });
  });
});
