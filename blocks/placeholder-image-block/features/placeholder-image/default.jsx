import React from 'react';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import { Image } from '@wpmedia/engine-theme-sdk';

const getFallbackImageURL = ({ deployment, contextPath, fallbackImage }) => {
  let targetFallbackImage = fallbackImage;

  if (!targetFallbackImage.includes('http')) {
    targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
  }

  return targetFallbackImage;
};

const PlaceholderImage = ({ client = false }) => {
  const {
    arcSite, contextPath, deployment,
  } = useFusionContext();
  const {
    fallbackImage, primaryLogoAlt, breakpoints, resizerURL,
  } = getProperties(arcSite);

  const targetFallbackImage = getFallbackImageURL({ deployment, contextPath, fallbackImage });
  const imageProps = {
    url: targetFallbackImage,
    smallWidth: 800,
    smallHeight: 450,
    mediumWidth: 800,
    mediumHeight: 450,
    largeWidth: 800,
    largeHeight: 450,
    alt: primaryLogoAlt || '',
    breakpoints,
    resizerURL,
  };

  const placeholderResizedImageOptions = useContent({
    source: client ? 'resize-image-api-client' : 'resize-image-api',
    query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
  });

  if (!placeholderResizedImageOptions) {
    return null;
  }

  return (
    <Image
      {...imageProps}
      resizedImageOptions={placeholderResizedImageOptions}
    />
  );
};

PlaceholderImage.label = 'Placeholder Image – Arc Block';

export default PlaceholderImage;
