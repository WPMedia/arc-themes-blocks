import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext, useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';

import { Gallery, ErrorBoundary } from '@wpmedia/engine-theme-sdk';

const GalleryFeature = (
  {
    customFields: {
      inheritGlobalContent,
      galleryContentConfig,
    } = {},
  },
) => {
  const AdFeature = lazy(/* istanbul ignore next */ () => import('@wpmedia/ads-block')
    .catch(() => ({ default: () => <p>Ad block not found</p> })));

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

  return (
    <Gallery
      galleryElements={contentElements}
      resizerURL={resizerURL}
      ansId={id}
      ansHeadline={headlines?.basic ? headlines.basic : ''}
      expandPhrase={phrases.t('global.gallery-expand-button')}
      autoplayPhrase={phrases.t('global.gallery-autoplay-button')}
      pausePhrase={phrases.t('global.gallery-pause-autoplay-button')}
      pageCountPhrase={/* istanbul ignore next */ (current, total) => phrases.t('global.gallery-page-count-text', { current, total })}
      adElement={/* istanbul ignore next */ () => (
        <ErrorBoundary fallback={<div>Missing Ad block</div>}>
          <Suspense fallback={<div>Loading ad block</div>}>
            <AdFeature
              customFields={{
                adType: '300x250',
                displayAdLabel: true,
              }}
            />
          </Suspense>
        </ErrorBoundary>
      )}
      interstitialClicks={interstitialClicks}
    />
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
  }),
};

GalleryFeature.label = 'Gallery – Arc Block';

export default GalleryFeature;
