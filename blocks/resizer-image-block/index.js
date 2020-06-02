/* eslint-disable no-param-reassign, camelcase */
import getProperties from 'fusion:properties';
import { resizerURL as RESIZER_URL, resizerKey as RESIZER_SECRET_KEY } from 'fusion:environment';

const getResizerParam = (
  originalUrl, breakpoint, format, filterQuality = 70, respectAspectRatio = false,
) => {
  if (typeof window === 'undefined') {
    const Thumbor = require('thumbor-lite');
    // this is height and width of the target image
    const { height, width } = breakpoint;

    if (!height && !width) throw new Error('Height and Width required');
    const thumbor = new Thumbor(RESIZER_SECRET_KEY, RESIZER_URL);

    let thumborParam = '';
    if (respectAspectRatio) {
      // https://thumbor.readthedocs.io/en/latest/filling.html?highlight=fill#filling
      // fitIn will respect the aspect ratio of the photo and fit it into dsipaly
      // fitin https://thumbor.readthedocs.io/en/latest/usage.html?highlight=fit#fit-in
      thumborParam = thumbor
        .setImagePath(originalUrl.replace(/(^\w+:|^)\/\//, ''))
        /* have to keep png for transparency effect */
        .filter(`quality(${filterQuality})`)
        .filter('fill(white)')
        /* todo: enable background color in angler fish resizer api */
        .filter('background_color(white)')
        .fitIn(width, height)
        .buildUrl();

      const urlSuffix = originalUrl.replace('https://', '');
      return thumborParam
        .replace(RESIZER_URL, '')
        .replace(urlSuffix, '');
    }

    thumborParam = thumbor
      .setImagePath(originalUrl.replace(/(^\w+:|^)\/\//, ''))
      .filter(`format(${format})`)
      .filter(`quality(${filterQuality})`)
      .resize(width, height)
      .buildUrl();
    const urlSuffix = originalUrl.replace('https://', '');
    const breakpointName = `${width}x${height}`;
    return thumborParam
      .replace(RESIZER_URL, '')
      .replace(urlSuffix, '')
      .replace(`/${breakpointName}/`, '');
  }
  return undefined;
};

const getImageDimensionsForAspectRatios = () => {
  // consider adding window.devicePixelRatio for * scale
  const siteProperties = getProperties();
  const {
    aspectRatios,
    imageWidths,
  } = siteProperties;
  return aspectRatios.reduce((availableDimensions, aspectRatio) => {
    const aspectRatioDimensions = aspectRatio.split(':');
    // get width by splitting the 400x400 string
    const widthDivisor = aspectRatioDimensions[0];
    const heightDivisor = aspectRatioDimensions[1];
    return availableDimensions.concat(imageWidths.map((width) => {
      const scaledHeight = Math.round((width / widthDivisor) * heightDivisor);
      const dimension = `${width}x${scaledHeight}`;
      return dimension;
    }));
  }, []);
};

// input: original url
// if only [420] (int) and ['1:1'], aspect ratio
// output: array of strings for ['420x420']

export const getResizerParams = (originalUrl, respectAspectRatio = false) => {
  const output = {};
  const getParamsByFormat = (format, previousOutput) => {
    // where we get image widths
    const imageDimensionsAspectRatios = getImageDimensionsForAspectRatios();
    imageDimensionsAspectRatios.forEach((aspectRatioValue) => {
      const dimensions = aspectRatioValue;
      const [aspectRatioWidth, aspectRatioHeight] = dimensions.split('x');

      previousOutput[aspectRatioValue] = getResizerParam(
        originalUrl,
        {
          width: aspectRatioWidth,
          height: aspectRatioHeight,
        },
        format,
        70,
        respectAspectRatio,
      );
    });
    return previousOutput;
  };
    // todo: use webp for next gen images spike
    // getParamsByFormat('webp', output);
  getParamsByFormat('jpg', output);
  return output;
};


const resizeImage = (image) => {
  if ((image.type && image.type !== 'image') || !image.url) {
    throw new Error('Not a valid image object');
  }

  return getResizerParams(image.url);
};

const resizePromoItems = (promoItems) => Object.keys(promoItems)
  .reduce((promoItemWithResizedImages, key) => {
    const promoItem = promoItems[key];
    if ((key === 'type' && promoItem === 'image') || key === 'url') {
      promoItemWithResizedImages.resized_params = resizeImage(promoItems);
      promoItemWithResizedImages.url = promoItems.url;
      promoItemWithResizedImages.type = 'image';
    } else {
      promoItemWithResizedImages[key] = promoItem;
    }
    return promoItemWithResizedImages;
  }, {});

const resizeAuthorCredits = (authorCredits) => authorCredits.map((creditObject) => ({
  ...creditObject,
  resized_params: creditObject?.image?.url ? getResizerParams(creditObject.image.url) : {},
}));

const getResizedImageParams = (data, option) => {
  if (!option.resizerSecret || !option.resizerUrl) {
    throw new Error('Not a valid image object');
  }

  const generateParams = (sourceData) => {
    if (sourceData && sourceData.content_elements) {
      sourceData.content_elements = sourceData.content_elements.map(
        (contentElement) => {
          if (contentElement.type === 'image') {
            contentElement.resized_params = getResizerParams(
              contentElement.url,
            );
          }
          if (contentElement.type === 'gallery' || contentElement.type === 'story') {
            // recursively resize if gallery or story
            return generateParams(contentElement);
          }
          // if (contentElement.promo_items && contentElement.promo_items.basic) {
          //   contentElement.promo_items.basic = resizePromoItems(
          //     contentElement.promo_items.basic,
          //   );
          // }
          return contentElement;
        },
      );
    }
    if (sourceData && sourceData.promo_items && sourceData.promo_items.basic) {
      sourceData.promo_items.basic = resizePromoItems(
        sourceData.promo_items.basic,
      );
    }

    if (sourceData && sourceData.promo_items && sourceData.promo_items.lead_art) {
      sourceData.promo_items.lead_art = resizePromoItems(
        sourceData.promo_items.lead_art,
      );
    }

    if (sourceData?.promo_items?.lead_art?.content_elements) {
      // recursive if I find content elements
      // find content elements
      generateParams(sourceData.promo_items.lead_art);
    }

    if (sourceData?.promo_items?.lead_art?.promo_items?.basic) {
      sourceData.promo_items.lead_art.promo_items.basic.resized_params = getResizerParams(
        sourceData.promo_items.lead_art.promo_items.basic.url,
      );
    }

    // checking if by is array with a length
    if (sourceData && sourceData.credits && sourceData.credits.by.length) {
      sourceData.credits.by = resizeAuthorCredits(
        sourceData.credits.by,
      );
    }
    return sourceData;
  };

  if (data && data.count > 0) {
    data.content_elements.forEach(generateParams);
  } else if (data && data.length && data.length > 0) {
    // to test, like for search-api, that will have array of content elements
    data.forEach(generateParams);
  } else {
    generateParams(data);
  }

  return data;
};

export const extractResizedParams = (storyObject) => {
  const basicStoryObject = storyObject?.promo_items?.basic;

  if (basicStoryObject?.type === 'image') {
    return basicStoryObject?.resized_params;
  }

  return [];
};


// top level for transforming data
// takes in content source story data via ans
// see mock data for example
// optional filter quality for reducing quality of pics
// exporting for test while we figure out a helper fix
/**
 * @param respectAspectRatio if true, then will use fitIn rather than resize via thumbor
*/
const getResizedImageData = (
  data, filterQuality = 70, onlyUrl = false, respectAspectRatio = false,
) => {
  const { imageWidths, aspectRatios } = getProperties();
  const resizerKey = RESIZER_SECRET_KEY;
  const resizerUrl = RESIZER_URL;


  // ensure that necessary env variables available
  if (
    typeof resizerKey === 'undefined'
      || typeof resizerUrl === 'undefined'
      || typeof imageWidths === 'undefined'
      || typeof aspectRatios === 'undefined'
  ) {
    return data;
  }

  if (onlyUrl) {
    return getResizerParams(data, respectAspectRatio);
  }

  return getResizedImageParams(data, {
    resizerSecret: resizerKey,
    resizerUrl,
    imageWidths,
  }, filterQuality);
};

export default getResizedImageData;
