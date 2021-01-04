import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from '@wpmedia/intl-block';
import GlobalContentGallery from './_children/global-content';
import CustomContentGallery from './_children/custom-content';

const GalleryFeature = (
  {
    customFields: {
      inheritGlobalContent,
      galleryContentConfig,
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
