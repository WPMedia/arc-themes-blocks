import React from 'react';
import { useAppContext } from 'fusion:context';
import { Gallery } from '@wpmedia/engine-theme-sdk';
import { resizerURL } from 'fusion:environment';

const GlobalContentGallery = ({ phrases }) => {
  const { globalContent = {} } = useAppContext();
  const { content_elements: contentElements = [] } = globalContent;
  return (
    <Gallery
      galleryElements={contentElements}
      resizerURL={resizerURL}
      ansId={globalContent._id}
      ansHeadline={globalContent?.headlines?.basic ? globalContent.headlines.basic : ''}
      expandPhrase={phrases.t('global.gallery-expand-button')}
      autoplayPhrase={phrases.t('global.gallery-autoplay-button')}
      pausePhrase={phrases.t('global.gallery-pause-autoplay-button')}
      pageCountPhrase={(current, total) => phrases.t('global.gallery-page-count-text', { current, total })}
    />
  );
};

export default GlobalContentGallery;
