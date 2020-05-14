import React from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { Image } from '@wpmedia/engine-theme-sdk';

const PlaceholderImage = (props) => {
  const {
    smallWidth,
    smallHeight,
    mediumWidth,
    mediumHeight,
    largeWidth,
    largeHeight,
  } = props;
  const { arcSite, deployment, contextPath } = useFusionContext();

  let targetFallbackImage = getProperties(arcSite).fallbackImage;

  // if true then it's a local image
  // else it's a url image that can be served
  if (targetFallbackImage && !(targetFallbackImage.includes('http'))) {
    targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
  }

  return (
    <Image
      url={targetFallbackImage}
      alt={getProperties(arcSite).primaryLogoAlt || 'Placeholder logo'}
      smallWidth={smallWidth}
      smallHeight={smallHeight}
      mediumWidth={mediumWidth}
      mediumHeight={mediumHeight}
      largeWidth={largeWidth}
      largeHeight={largeHeight}
      respectAspectRatio
    />
  );
};

PlaceholderImage.label = 'Placeholder Image – Arc Block';

export default PlaceholderImage;
