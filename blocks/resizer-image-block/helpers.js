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
  // consider adding window.devicePixelRatio for * scale
  const getBreakpointDimensionsForAspectRatios = (
    aspectRatios, imageWidths,
  ) => aspectRatios.reduce((
    availableDimensions, aspectRatio,
  ) => {
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

// if ((image.type && image.type !== 'image') || !image.url) {
//   throw new Error('Not a valid image object');
// }
const resizeImage = (
  image, imageWidths, resizer,
) => resizer.getResizerParams(image.url, imageWidths);

/* eslint-disable no-param-reassign */
const resizePromoItems = (promoItems, breakpoints, resizer) => Object.keys(promoItems)
  .reduce((promoItemWithResizedImages, key) => {
    const promoItem = promoItems[key];
    if ((key === 'type' && promoItem === 'image') || key === 'url') {
      promoItemWithResizedImages.resized_params = resizeImage(promoItems, breakpoints, resizer);
      promoItemWithResizedImages.url = promoItems.url;
      promoItemWithResizedImages.type = 'image';
    } else {
      promoItemWithResizedImages[key] = promoItem;
    }
    return promoItemWithResizedImages;
  }, {});
/* eslint-enable no-param-reassign */

const getResizedImageParams = (data, option, filterQuality) => {
  const resizer = createResizer(option.resizerSecret, option.resizerUrl, filterQuality);

  /* eslint-disable no-param-reassign */
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

export default getResizedImageParams;
