import React from 'react';
import getProperties from 'fusion:properties';
import { resizerURL as RESIZER_URL } from 'fusion:environment';

// example output
// https://corecomponents-the-prophet-prod.cdn.arcpublishing.com/resizer/j0ohWrgYlJ0H8HMidvvIrGvidH4=/420x280/filters:format(webp):quality(70)/arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/37UMUNYNOVCEJDZW5SBKBXNMO4.jpg
const reconstructURL = (targetImageKeyWithFilter, targetDimension, imageSourceWithoutProtocol) => {
  const [targetImageKey = '', imageFilter = ''] = targetImageKeyWithFilter.split('=');

  return `${RESIZER_URL}${targetImageKey}=/${targetDimension}/${imageFilter}${imageSourceWithoutProtocol}`;
};


/*

match the dimensions
todo: make a fallback so that if none found, it finds next highest, or best match
fusion-engine    | { '158x85':
fusion-engine    |    '/ATmaUOsdKvyIIdifxrhIXWt5O4s=filters:format(jpg):quality(70)/',
fusion-engine    |   '158x105':
fusion-engine    |    '/ATmaUOsdKvyIIdifxrhIXWt5O4s=filters:format(jpg):quality(70)/',
fusion-engine    |   '274x148':
fusion-engine    |    '/PFpa92fcrVMrwh1tpF1J2o_QfDI=filters:format(jpg):quality(70)/',
fusion-engine    |   '274x183':
fusion-engine    |    '/PFpa92fcrVMrwh1tpF1J2o_QfDI=filters:format(jpg):quality(70)/' }
*/
const getSourceImageBreakpoints = (
  targetDimensionsPerBreakpoint, resizedImageParams, rawURL, alt,
) => {
  const { small, medium, large } = targetDimensionsPerBreakpoint;

  const imageSourceWithoutProtocol = rawURL.replace('https://', '');

  const { breakpoints } = getProperties();

  const mobile = breakpoints[0].width;

  const tablet = breakpoints[1].width;

  const desktop = breakpoints[2].width;

  return (
    <>
      <source
        src={reconstructURL(resizedImageParams[`${small.width}x${small.height}`], `${small.width}x${small.height}`, imageSourceWithoutProtocol)}
        media={`screen and (min-width: ${mobile}px)`}
      />
      <source
        src={reconstructURL(resizedImageParams[`${medium.width}x${medium.height}`], `${medium.width}x${medium.height}`, imageSourceWithoutProtocol)}
        media={`screen and (min-width: ${tablet}px)`}
      />
      <source
        src={reconstructURL(resizedImageParams[`${large.width}x${large.height}`], `${large.width}x${large.height}`, imageSourceWithoutProtocol)}
        media={`screen and (min-width: ${desktop}px)`}
      />
      <img
        src={reconstructURL(resizedImageParams[`${large.width}x${large.height}`], `${large.width}x${large.height}`, imageSourceWithoutProtocol)}
        alt={alt}
        // this won't work on ie 11 but it's a start for lazy loading
        loading="lazy"
      />
    </>
  );
};
export default getSourceImageBreakpoints;
