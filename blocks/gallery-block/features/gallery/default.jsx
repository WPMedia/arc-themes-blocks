import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import GlobalContentGallery from './_children/global-content';
import CustomContentGallery from './_children/custom-content';

const GalleryFeature = (
  {
    customFields: {
      inheritGlobalContent = true,
      galleryContentConfig,
    } = {},
  } = {},
  arcSite,
) => {
  const { locale = 'en' } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);
  if (inheritGlobalContent) {
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
    }),
  }),
};

GalleryFeature.label = 'Gallery – Arc Block';

export default GalleryFeature;
