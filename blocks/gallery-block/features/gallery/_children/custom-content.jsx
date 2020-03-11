import React from 'react';
import { useContent } from 'fusion:content';
import { Gallery } from '@wpmedia/engine-theme-sdk';

const CustomContentGallery = ({ contentConfig }) => {
  const { content_elements: contentElements = [] } = useContent({
    source: contentConfig.contentService,
    query: contentConfig.contentConfigValues,
  }) || {};

  return <Gallery galleryElements={contentElements} />;
};

export default CustomContentGallery;
