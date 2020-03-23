import getProperties from 'fusion:properties';
import { resizerURL as RESIZER_URL, resizerKey as RESIZER_SECRET_KEY } from 'fusion:environment';

const createResizer = (resizerKey, resizerUrl, filterQuality = 70) => {
  const getResizerParam = (originalUrl, breakpoint, format) => {
    if (typeof window === 'undefined') {
      const Thumbor = require('thumbor-lite');
      const { height, width } = breakpoint;

      if (!height && !width) throw new Error('Height and Width required');

      const thumbor = new Thumbor(resizerKey, resizerUrl);
      /* ToDo: Refactor to use device name (mobile) instead of width */
      const thumborParam = thumbor
        .setImagePath(originalUrl.replace(/(^\w+:|^)\/\//, ''))
        .filter(`format(${format})`)
        .filter(`quality(${filterQuality})`)
        .resize(width, height)
        .buildUrl();
      const urlSuffix = originalUrl.replace('https://', '');
      const breakpointName = `${width}x${height}`;
      return thumborParam
        .replace(resizerUrl, '')
        .replace(urlSuffix, '')
        .replace(`/${breakpointName}/`, '');
    }
    return undefined;
  };

  const getBreakpointDimensionsForAspectRatios = (
    selectedAspectRatio, dimensionsOnly, maxWidth,
  ) => {
    // consider adding window.devicePixelRatio for * scale
    let output = { devices: [] };
    const filteredDimensions = [];
    const siteProperties = getProperties();
    const {
      aspectRatios,
      breakpoints,
    } = siteProperties;
    breakpoints.forEach((breakpoint) => {
      const dimensions = [];
      const breakpointWidth = breakpoint.width;
      const isMaxSize = maxWidth ? maxWidth <= breakpointWidth : true;
      aspectRatios.forEach((aspectRatio) => {
        if (((aspectRatio === selectedAspectRatio || !selectedAspectRatio)) && isMaxSize) {
          const aspectRatioDimensions = aspectRatio.split(':');
          const widthDivisor = aspectRatioDimensions[0];
          const heightDivisor = aspectRatioDimensions[1];
          const scaledHeight = Math.round((breakpointWidth / widthDivisor) * heightDivisor);
          const dimension = `${breakpointWidth}x${scaledHeight}`;
          if (dimensionsOnly) {
            filteredDimensions.push(dimension);
          } else {
            dimensions.push({
              [aspectRatio]: dimension,
            });
          }
        }
      });
      if (!dimensionsOnly && isMaxSize) {
        output.devices.push({ [breakpoint.device]: dimensions });
      }
    });
    if (dimensionsOnly) {
      output = [];
      output.push(filteredDimensions);
    }
    return output;
  };

  const getResizerParams = (originalUrl) => {
    const output = [];
    const getParamsByFormat = (device, format, array) => {
      const breakpointAspectRatios = getBreakpointDimensionsForAspectRatios();
      breakpointAspectRatios.devices.forEach((aspectRatios) => {
        const aspectRatioValues = Object.values(aspectRatios)[0];
        const breakPointDevice = Object.keys(aspectRatios)[0];
        if (breakPointDevice === device || !device) {
          return aspectRatioValues.forEach((aspectRatioValue) => {
            /* Ensure new breakpoints are present in GraphQL filters */
            const dimensions = Object.values(aspectRatioValue)[0].split('x');
            const aspectRatioWidth = dimensions[0];
            const aspectRatioHeight = dimensions[1];
            array.push({
              [`${dimensions.join('x')}${device ? `|${device}` : ''}`]:
                getResizerParam(originalUrl,
                  { width: aspectRatioWidth, height: aspectRatioHeight },
                  format),
            });
          });
        }
        return undefined;
      });
      return array;
    };
    getParamsByFormat(undefined, 'webp', output);
    /* ToDo: Fix this to be format only */
    getParamsByFormat('mobile', 'jpg', output);
    return output;
  };

  return {
    getResizerParam,
    getResizerParams,
  };
};

const resizeImage = (image, breakpoints, resizer) => {
  if ((image.type && image.type !== 'image') || !image.url) {
    throw new Error('Not a valid image object');
  }

  return resizer.getResizerParams(image.url, breakpoints);
};

const resizePromoItems = (promoItems, breakpoints, resizer) => {
  const output = {};
  Object.keys(promoItems).forEach((key) => {
    const promoItem = promoItems[key];
    if ((key === 'type' && promoItem === 'image') || key === 'url') {
      output.resized_params = resizeImage(promoItems, breakpoints, resizer);
      output.url = promoItems.url;
    } else {
      output[key] = promoItem;
    }
  });
  return output;
};

const getResizedImageParams = (data, option, filterQuality) => {
  if (!option.resizerSecret || !option.resizerUrl || !option.breakpoints) {
    throw new Error('Resizer URL, secret, and breakpoints are required.');
  }

  const resizer = createResizer(option.resizerSecret, option.resizerUrl, filterQuality);

  /* eslint-disable no-param-reassign */
  const generateParams = (sourceData) => {
    if (sourceData && sourceData.content_elements) {
      sourceData.content_elements = sourceData.content_elements.map(
        (contentElement) => {
          if (contentElement.type === 'image') {
            contentElement.resized_params = resizeImage(
              contentElement,
              option.breakpoints,
              resizer,
            );
          }
          if (contentElement.promo_items && contentElement.promo_items.basic) {
            contentElement.promo_items.basic = resizePromoItems(
              contentElement.promo_items.basic,
              option.breakpoints,
              resizer,
            );
          }
          return contentElement;
        },
      );
    }
    if (sourceData && sourceData.promo_items && sourceData.promo_items.basic) {
      sourceData.promo_items.basic = resizePromoItems(
        sourceData.promo_items.basic,
        option.breakpoints,
        resizer,
      );
    }
    return sourceData;
  };
  /* eslint-enable no-param-reassign */

  if (data && data.count > 0) {
    data.content_elements.forEach((contentElement) => {
      generateParams(contentElement);
    });
  } else {
    generateParams(data);
  }

  return data;
};


// top level for transforming data
// takes in content source story data via ans
// see mock data for example
// optional filter quality for reducing quality of pics
const getResizedImageData = (data, filterQuality = 70) => {
  const { breakpoints } = getProperties();
  const resizerKey = RESIZER_SECRET_KEY;
  const resizerUrl = RESIZER_URL;

  return getResizedImageParams(data, {
    resizerSecret: resizerKey,
    resizerUrl,
    breakpoints,
  }, filterQuality);
};

export default getResizedImageData;
