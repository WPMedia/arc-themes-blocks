/* eslint-disable no-param-reassign, camelcase */
import getProperties from 'fusion:properties';
import { resizerURL as RESIZER_URL, resizerKey as RESIZER_SECRET_KEY } from 'fusion:environment';

const getResizerParam = (originalUrl, breakpoint, format, filterQuality = 70) => {
  if (typeof window === 'undefined') {
    const Thumbor = require('thumbor-lite');
    // this is height and width of the target image
    const { height, width } = breakpoint;

    if (!height && !width) throw new Error('Height and Width required');
    const thumbor = new Thumbor(RESIZER_SECRET_KEY, RESIZER_URL);
    const thumborParam = thumbor
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

export const getResizerParams = (originalUrl) => {
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
    /*
    path not taken based on current reqs
    if (sourceData && sourceData.content_elements) {
      sourceData.content_elements = sourceData.content_elements.map(
        (contentElement) => {
          if (contentElement.type === 'image') {
            contentElement.resized_params = resizeImage(
              contentElement,
              // designate widths not the width of the screen
              // this is not going to be 100 percent images always
              option.imageWidths,
              resizer,
            );
          }
          // not totally sure the reason for two here for different structure
          // commented out for now
          // if (contentElement.promo_items && contentElement.promo_items.basic) {
          //   contentElement.promo_items.basic = resizePromoItems(
          //     contentElement.promo_items.basic,
          //     option.breakpoints,
          //     resizer,
          //   );
          // }
          return contentElement;
        },
      );
    }
    */
    if (sourceData && sourceData.promo_items && sourceData.promo_items.basic) {
      sourceData.promo_items.basic = resizePromoItems(
        sourceData.promo_items.basic,
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
const getResizedImageData = (data, filterQuality = 70, onlyUrl = false) => {
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
    return getResizerParams(data);
  }

  return getResizedImageParams(data, {
    resizerSecret: resizerKey,
    resizerUrl,
    imageWidths,
  }, filterQuality);
};

export default getResizedImageData;
