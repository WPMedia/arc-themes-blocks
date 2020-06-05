import React from 'react';
import { useContent } from 'fusion:content';
import { Gallery } from '@wpmedia/engine-theme-sdk';
import { resizerURL } from 'fusion:environment';

const CustomContentGallery = ({ contentConfig, phrases }) => {
  const content = useContent({
    source: contentConfig.contentService,
    query: contentConfig.contentConfigValues,
  }) || {};
  const { content_elements: contentElements = [] } = content;

  return (
    <Gallery
      galleryElements={contentElements}
      resizerURL={resizerURL}
      ansId={content?._id ? content._id : ''}
      ansHeadline={content?.headlines?.basic ? content.headlines.basic : ''}
      expandPhrase={phrases.t('global.gallery-expand-button')}
      autoplayPhrase={phrases.t('global.gallery-autoplay-button')}
      pausePhrase={phrases.t('global.gallery-pause-autoplay-button')}
      pageCountPhrase={(current, total) => phrases.t('global.gallery-page-count-text', { current, total })}
    />
  );
};

export default CustomContentGallery;
