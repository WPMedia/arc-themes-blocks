import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';

import Title from './title';

const StoryItem = (props) => {
  const {
    itemTitle = '',
    imageURL = '',
    id = '',
    primaryFont = '',
    websiteURL,
    websiteDomain,
    showHeadline,
    showImage,
  } = props;

  const location = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? `https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/${websiteURL}`
    : `${websiteDomain}/${websiteURL}`;

  return (
    <div key={id} className="list-item-simple">
      {showImage ? (
        <a
          href={location}
          title={itemTitle}
          className="simple-list-anchor"
        >
          {imageURL !== '' ? (
            <Image
              url={imageURL}
              alt={itemTitle}
                // used this from simple results list
                // small, including simple list, 3:2 aspect ratio
              smallWidth={105}
              smallHeight={70}
              mediumWidth={105}
              mediumHeight={70}
              largeWidth={105}
              largeHeight={70}
              className="simple-list-img"
            />
          ) : (
            <div className="simple-list-placeholder" />
          )}
        </a>
      ) : <div className="simple-list-placeholder" />}
      {showHeadline && itemTitle !== '' ? (
        <a
          className="simple-list-headline-anchor"
          href={location}
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
