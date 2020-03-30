import React from 'react';
import getSourceImageBreakpoints from './getSourceImageBreakpoints';

const DynamicImage = (props) => {
  const {
    resizedImageParams,
    alt,
    url,
  } = props;

  const {
    smallWidth,
    smallHeight,
    mediumWidth,
    mediumHeight,
    largeWidth,
    largeHeight,
  } = props;

  const targetDimensionsPerBreakpoint = {
    small: {
      width: smallWidth,
      height: smallHeight,
    },
    medium: {
      width: mediumWidth,
      height: mediumHeight,
    },
    large: {
      width: largeWidth,
      height: largeHeight,
    },
  };

  return (
    <picture>
      {getSourceImageBreakpoints(targetDimensionsPerBreakpoint, resizedImageParams, url, alt)}
    </picture>
  );
};

export default DynamicImage;
