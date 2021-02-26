import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { LazyLoad } from '@wpmedia/engine-theme-sdk';
import GlobalContentGallery from './_children/global-content';
import CustomContentGallery from './_children/custom-content';

const GalleryFeature = (
  {
    customFields: {
      inheritGlobalContent,
      galleryContentConfig,
      lazyLoad = false,
    } = {},
  } = {},
) => {
  const { arcSite } = useFusionContext();
  const { locale = 'en' } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  let showGlobalContent;
  if (typeof inheritGlobalContent === 'undefined') {
    showGlobalContent = (typeof galleryContentConfig === 'undefined');
  } else {
    showGlobalContent = inheritGlobalContent;
  }

  return (
    <LazyLoad enabled={lazyLoad}>
      {showGlobalContent ? (
        <GlobalContentGallery phrases={phrases} />
      ) : (
        <CustomContentGallery contentConfig={galleryContentConfig} phrases={phrases} />
      )}
    </LazyLoad>
  );
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
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

GalleryFeature.label = 'Gallery – Arc Block';

export default GalleryFeature;
