import React from 'react';
import { PrimaryFont } from '@wpmedia/shared-styles';
import { Image } from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';

const StoryItem = (props) => {
  const {
    itemTitle = '',
    imageURL = '',
    id = '',
    websiteURL,
    showHeadline,
    showImage,
    arcSite,
    resizedImageOptions,
    placeholderResizedImageOptions,
    targetFallbackImage,
  } = props;

  return (
    <article key={id} className="list-item-simple simple-list-item-margins">
      {showImage ? (
        <a
          href={websiteURL}
          className="simple-list-anchor"
          aria-hidden="true"
          tabIndex="-1"
        >
          {imageURL !== '' ? (
            <Image
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
              smallWidth={274}
              smallHeight={183}
              mediumWidth={274}
              mediumHeight={183}
              largeWidth={274}
              largeHeight={183}
              alt={getProperties(arcSite).primaryLogoAlt || ''}
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
        >
          <PrimaryFont as="h2" className="simple-list-headline-text">
            {itemTitle}
          </PrimaryFont>
        </a>
      ) : null}
    </article>
  );
};

export default StoryItem;
