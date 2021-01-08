/* eslint max-len: 0 */
import React from 'react';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
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

const CustomContentGallery = ({ contentConfig, phrases }) => {
  const { arcSite } = useFusionContext();
  const content = useContent({
    source: contentConfig.contentService,
    query: contentConfig.contentConfigValues,
  }) || {};
  const { content_elements: contentElements = [] } = content;
  const { resizerURL } = getProperties(arcSite) || {};
  /**
  const { resizerURL, galleryCubeClicks } = getProperties(arcSite) || {};
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
  * */

  /**
  return (
    <Gallery
      galleryElements={contentElements}
      resizerURL={resizerURL}
      ansId={content?._id ? content._id : ''}
      ansHeadline={content?.headlines?.basic ? content.headlines.basic : ''}
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
      ansId={content?._id ? content._id : ''}
      ansHeadline={content?.headlines?.basic ? content.headlines.basic : ''}
      expandPhrase={phrases.t('global.gallery-expand-button')}
      autoplayPhrase={phrases.t('global.gallery-autoplay-button')}
      pausePhrase={phrases.t('global.gallery-pause-autoplay-button')}
      pageCountPhrase={(current, total) => phrases.t('global.gallery-page-count-text', { current, total })}
    />
  );
};

export default CustomContentGallery;
