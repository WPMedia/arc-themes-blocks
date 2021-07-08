import React from 'react';
import PropTypes from 'prop-types';

import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import { LazyLoad } from '@wpmedia/engine-theme-sdk';
import { HeadingSection } from '@wpmedia/shared-styles';

// shared with search results list
// to modify, go to the shared styles block
import '@wpmedia/shared-styles/scss/_results-list.scss';
import '@wpmedia/shared-styles/scss/_results-list-desktop.scss';
import '@wpmedia/shared-styles/scss/_results-list-mobile.scss';

import Results from './results';

const ResultsList = ({ customFields }) => {
  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
  } = useFusionContext();
  const { lazyLoad } = customFields;
  const {
    fallbackImage,
    locale,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  } = getProperties(arcSite) || {};
  const imageProperties = {
    smallWidth: 158,
    smallHeight: 89,
    mediumWidth: 274,
    mediumHeight: 154,
    largeWidth: 274,
    largeHeight: 154,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  };

  return (
    <LazyLoad enabled={lazyLoad && !isAdmin}>
      <HeadingSection>
        <Results
          customFields={customFields}
          fusionContext={{
            arcSite,
            contextPath,
            deployment,
            isAdmin,
          }}
          fusionProperties={{
            fallbackImage,
            locale,
          }}
          imageProperties={imageProperties}
        />
      </HeadingSection>
    </LazyLoad>
  );
};

ResultsList.label = 'Results List – Arc Block';

ResultsList.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed').tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
    showHeadline: PropTypes.bool.tag(
      {
        label: 'Show headline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showImage: PropTypes.bool.tag(
      {
        label: 'Show image',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showDescription: PropTypes.bool.tag(
      {
        label: 'Show description',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showByline: PropTypes.bool.tag(
      {
        label: 'Show byline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showDate: PropTypes.bool.tag(
      {
        label: 'Show date',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

export default ResultsList;
