import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';

import Title from './title';

const StoryItem = (props) => {
  const {
    itemTitle = '',
    imageURL = '',
    id = '',
    primaryFont = '',
    websiteURL,
    showHeadline,
    showImage,
    arcSite,
    resizedImageOptions,
    placeholderResizedImageOptions,
    targetFallbackImage,
  } = props;

  return (
    <div key={id} className="list-item-simple">
      {showImage ? (
        <a
          href={websiteURL}
          title={itemTitle}
          className="simple-list-anchor"
        >
          {imageURL !== '' ? (
            <Image
              compressedThumborParams
              resizedImageOptions={resizedImageOptions}
              url={imageURL}
              alt={itemTitle}
              // used this from simple results list
              // small, including simple list, 3:2 aspect ratio
              smallWidth={274}
              smallHeight={183}
              mediumWidth={274}
              mediumHeight={183}
              largeWidth={274}
              largeHeight={183}
              className="simple-list-img"
              breakpoints={getProperties(arcSite)?.breakpoints}
              resizerURL={getProperties(arcSite)?.resizerURL}
            />
          ) : (
            <Image
              compressedThumborParams
              smallWidth={274}
              smallHeight={183}
              mediumWidth={274}
              mediumHeight={183}
              largeWidth={274}
              largeHeight={183}
              alt={getProperties(arcSite).primaryLogoAlt || 'Placeholder logo'}
              url={targetFallbackImage}
              breakpoints={getProperties(arcSite)?.breakpoints}
              resizedImageOptions={placeholderResizedImageOptions}
              resizerURL={getProperties(arcSite)?.resizerURL}
            />
          )}
        </a>
      ) : <div className="simple-list-placeholder" />}
      {showHeadline && itemTitle !== '' ? (
        <a
          className="simple-list-headline-anchor"
          href={websiteURL}
          title={itemTitle}
        >
          <Title primaryFont={primaryFont} className="simple-list-headline-text">
            {itemTitle}
          </Title>
        </a>
      ) : null}
    </div>
  );
};

export default StoryItem;
