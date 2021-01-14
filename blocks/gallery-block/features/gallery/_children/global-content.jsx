/* eslint max-len: 0 */
import React from 'react';
import { useFusionContext, useAppContext } from 'fusion:context';
import { Gallery } from '@wpmedia/engine-theme-sdk';
// import ArcAd from '@wpmedia/ads-block';
import getProperties from 'fusion:properties';

/**
const GalleryInterstitialAd = () => (
  <ArcAd
    customFields={{
      adType: '300x250',
      displayAdLabel: true,
    }}
  />
);
 * */

const GlobalContentGallery = ({ phrases }) => {
  const { arcSite } = useFusionContext();
  const { globalContent = {} } = useAppContext();
  const { content_elements: contentElements = [] } = globalContent;
  // const { resizerURL, galleryCubeClicks } = getProperties(arcSite) || {};
  const { resizerURL } = getProperties(arcSite) || {};

  /**
  let adProps = {};
  if (galleryCubeClicks) {
    const value = parseInt(galleryCubeClicks, 10);
    if (!Number.isNaN(value)) {
      adProps = {
        adElement: GalleryInterstitialAd,
        interstitialClicks: value,
      };
    }
  }

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
      {...adProps}
    />
  );
* */
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
