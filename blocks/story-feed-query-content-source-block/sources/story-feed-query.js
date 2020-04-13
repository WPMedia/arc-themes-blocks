import getProperties from 'fusion:properties';
import { resizerURL as RESIZER_URL, resizerKey as RESIZER_SECRET_KEY } from 'fusion:environment';

const createResizer = (resizerKey, resizerUrl, filterQuality = 70) => {
  const getResizerParam = (originalUrl, breakpoint, format) => {
    if (typeof window === 'undefined') {
      const Thumbor = require('thumbor-lite');
      // this is height and width of the target image
      const { height, width } = breakpoint;

      if (!height && !width) throw new Error('Height and Width required');
      const thumbor = new Thumbor(resizerKey, resizerUrl);
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

  // input: none
  // if only [420] (int) and ['1:1'], aspect ratio
  // output: array of strings for ['420x420']
  const getBreakpointDimensionsForAspectRatios = () => {
    // consider adding window.devicePixelRatio for * scale
    const widthsAndAspectRatios = [];
    const siteProperties = getProperties();
    const {
      aspectRatios,
      imageWidths,
    } = siteProperties;
    imageWidths.forEach((imageWidth) => {
      const breakpointWidth = imageWidth;
      aspectRatios.forEach((aspectRatio) => {
        const aspectRatioDimensions = aspectRatio.split(':');
        // get width by splitting the 400x400 string
        const widthDivisor = aspectRatioDimensions[0];
        const heightDivisor = aspectRatioDimensions[1];
        const scaledHeight = Math.round((breakpointWidth / widthDivisor) * heightDivisor);
        const dimension = `${breakpointWidth}x${scaledHeight}`;
        widthsAndAspectRatios.push(dimension);
      });
    });
    return widthsAndAspectRatios;
  };

  /*
takes the dimensions and
{
         '158x105':
           '/XmvUfw5XeP2vy73eIemjjWvUcTE=filters:format(webp):quality(70)/' ,
        '274x183':
         '/eacPxZZDbWfB6iQNyKFtKx-33ho=filters:format(webp):quality(70)/' ,
        '158x105':
         '/lFOUx-Y28BEF-DdIYSkmafVhq20=filters:format(jpg):quality(70)/' ,
        '274x183':
           '/hfZg-QUBEET7FzIhxQQddvAcz7c=filters:format(jpg):quality(70)/'

  */
  const getResizerParams = (originalUrl) => {
    const output = {};
    const getParamsByFormat = (format, previousOutput) => {
      const breakpointAspectRatios = getBreakpointDimensionsForAspectRatios();
      breakpointAspectRatios.forEach((aspectRatioValue) => {
        const dimensions = aspectRatioValue;
        const [aspectRatioWidth, aspectRatioHeight] = dimensions.split('x');

        // eslint-disable-next-line no-param-reassign
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

  return {
    getResizerParam,
    getResizerParams,
  };
};

const resizeImage = (image, imageWidths, resizer) => {
  if ((image.type && image.type !== 'image') || !image.url) {
    throw new Error('Not a valid image object');
  }

  return resizer.getResizerParams(image.url, imageWidths);
};

const resizePromoItems = (promoItems, breakpoints, resizer) => {
  const output = {};
  Object.keys(promoItems).forEach((key) => {
    const promoItem = promoItems[key];
    if ((key === 'type' && promoItem === 'image') || key === 'url') {
      output.resized_params = resizeImage(promoItems, breakpoints, resizer);
      output.url = promoItems.url;
      output.type = 'image';
    } else {
      output[key] = promoItem;
    }
  });
  return output;
};

const getResizedImageParams = (data, option, filterQuality) => {
  if (!option.resizerSecret || !option.resizerUrl || !option.breakpoints) {
    throw new Error('Not a valid image object');
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
// exporting for test while we figure out a helper fix
export const getResizedImageData = (data, filterQuality = 70) => {
  const { breakpoints, imageWidths } = getProperties();
  const resizerKey = RESIZER_SECRET_KEY;
  const resizerUrl = RESIZER_URL;

  return getResizedImageParams(data, {
    resizerSecret: resizerKey,
    resizerUrl,
    breakpoints,
    imageWidths,
  }, filterQuality);
};

export default {
  resolve: (params) => `/content/v4/search/published?q=${params.query || '*'}&website=${params['arc-site']}&size=${params.size || 8}&from=${params.offset || 0}&sort=display_date:desc`,
  schemaName: 'ans-feed',
  params: {
    query: 'text',
    size: 'number',
    offset: 'number',
  },
  transform: (data) => {
    if (typeof window === 'undefined') {
      return getResizedImageData(data);
    }
    return data;
  },
};
