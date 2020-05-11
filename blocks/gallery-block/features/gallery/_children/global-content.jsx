import React from 'react';
import { useAppContext } from 'fusion:context';
import { Gallery } from '@wpmedia/engine-theme-sdk';
import { resizerURL } from 'fusion:environment';

const GlobalContentGallery = () => {
  const { globalContent: { content_elements: contentElements = [] } = {} } = useAppContext();

  return <Gallery galleryElements={contentElements} resizerURL={resizerURL} />;
};

export default GlobalContentGallery;
