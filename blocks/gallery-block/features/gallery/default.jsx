import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext, useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import GlobalContentGallery from './_children/global-content';
import CustomContentGallery from './_children/custom-content';

import { Gallery, LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';

const GalleryFeatureItem = (
  {
    customFields: {
      inheritGlobalContent,
      galleryContentConfig,
    } = {},
  },
) => {
  let AdBlock;

  try {
    const { default: AdFeature } = require('@wpmedia/ads-block');
    AdBlock = () => (
      <AdFeature customFields={{
        adType: '300x250_gallery',
        displayAdLabel: true,
      }}
      />
    );
  } catch (e) {
    AdBlock = () => <p>Ad block not found</p>;
  }

  const { arcSite } = useFusionContext();
  const { resizerURL, galleryCubeClicks, locale = 'en' } = getProperties(arcSite);
  const { globalContent = {} } = useAppContext();
  const phrases = getTranslatedPhrases(locale);
  const content = useContent(galleryContentConfig ? {
    source: galleryContentConfig.contentService,
    query: galleryContentConfig.contentConfigValues,
  } : {});

  const showGlobalContent = (typeof inheritGlobalContent === 'undefined') ? (typeof galleryContentConfig === 'undefined') : inheritGlobalContent;
  const {
    content_elements: contentElements = [],
    headlines = {},
    id = '',
  } = showGlobalContent ? globalContent : content;

  const interstitialClicks = parseInt(galleryCubeClicks, 10);

  if (showGlobalContent) {
    return <GlobalContentGallery phrases={phrases} />;
  }

  return <CustomContentGallery contentConfig={galleryContentConfig} phrases={phrases} />;
};

GalleryFeature.propTypes = {
  customFields: PropTypes.shape({
    galleryContentConfig: PropTypes.contentConfig().tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
    inheritGlobalContent: PropTypes.bool.tag({
      group: 'Configure Content',
      defaultValue: true,
    }),
  }),
};

GalleryFeature.label = 'Gallery – Arc Block';

export default GalleryFeature;
