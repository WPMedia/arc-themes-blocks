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
            />
          ) : (
            <Image
              url={getProperties(arcSite).fallbackImage}
              alt={getProperties(arcSite).primaryLogoAlt || 'Placeholder logo'}
              // used this from simple results list
              // small, including simple list, 3:2 aspect ratio
              smallWidth={105}
              smallHeight={70}
              mediumWidth={105}
              mediumHeight={70}
              largeWidth={105}
              largeHeight={70}
              respectAspectRatio
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
