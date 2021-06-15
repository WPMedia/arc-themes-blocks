import React from 'react';
import { PrimaryFont } from '@wpmedia/shared-styles';
import { Image } from '@wpmedia/engine-theme-sdk';

const StoryItem = (props) => {
  const {
    itemTitle = '',
    imageURL = '',
    id = '',
    websiteURL,
    showHeadline,
    showImage,
    resizedImageOptions,
    placeholderResizedImageOptions,
    targetFallbackImage,
    imageProps,
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
          <Image
            {...imageProps}
            url={imageURL !== '' ? imageURL : targetFallbackImage}
            resizedImageOptions={imageURL !== '' ? resizedImageOptions : placeholderResizedImageOptions}
          />
        </a>
      ) : null}
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
