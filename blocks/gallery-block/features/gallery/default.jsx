import React from 'react';
import PropTypes from 'prop-types';
import GlobalContentGallery from './_children/global-content';
import CustomContentGallery from './_children/custom-content';

const GalleryFeature = (
  {
    customFields: {
      inheritGlobalContent = true,
      galleryContentConfig,
    } = {},
  } = {},
) => {
  if (inheritGlobalContent) {
    return <GlobalContentGallery />;
  }

  return <CustomContentGallery contentConfig={galleryContentConfig} />;
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
