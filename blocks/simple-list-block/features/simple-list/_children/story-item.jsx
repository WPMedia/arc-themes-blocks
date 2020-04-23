import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';
import { resizerURL } from 'fusion:environment';
import Title from './title';

const StoryItem = (props) => {
  const {
    itemTitle = '',
    imageURL = '',
    id = '',
    primaryFont = '',
    websiteURL,
    websiteDomain,
    arcSite,
    resizedImageOptions,
  } = props;

  const location = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? `https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/${websiteURL}`
    : `${websiteDomain}/${websiteURL}`;

  return (
    <div key={id} className="list-item-simple">
      <a
        href={location}
        title={itemTitle}
        className="simple-list-anchor"
      >
        {imageURL !== '' ? (
          <Image
            resizedImageOptions={resizedImageOptions}
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
            breakpoints={getProperties(arcSite)?.breakpoints}
            resizerURL={resizerURL}
          />
        ) : (
          <div className="simple-list-placeholder" />
        )}
      </a>
      {itemTitle !== '' ? (
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
