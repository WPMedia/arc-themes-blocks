import React from 'react';
import { useContent } from 'fusion:content';
import { Gallery } from '@wpmedia/engine-theme-sdk';
import { resizerURL } from 'fusion:environment';
import { useFusionContext } from 'fusion:context';

const CustomContentGallery = ({ contentConfig }) => {
  const { globalContent: content } = useFusionContext();
  const { content_elements: contentElements = [] } = useContent({
    source: contentConfig.contentService,
    query: contentConfig.contentConfigValues,
  }) || {};

  return (
    <Gallery
      galleryElements={contentElements}
      resizerURL={resizerURL}
      ansId={content?._id ? content._id : ''}
      ansHeadline={content?.headlines?.basic ? content.headlines.basic : ''}
    />
  );
};

export default CustomContentGallery;
