import React from 'react';
import PropTypes from 'prop-types';
import GlobalContentGallery from './_children/global-content';
import CustomContentGallery from './_children/custom-content';
import '@arc-test-org/engine-theme-sdk/dist/cjs/components/Gallery/gallery.scss';

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
    inheritGlobalContent: PropTypes.bool,
    galleryContentConfig: PropTypes.contentConfig(),
  }),
};

export default GalleryFeature;
