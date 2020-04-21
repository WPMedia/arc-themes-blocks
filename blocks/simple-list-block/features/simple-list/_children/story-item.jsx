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
  } = props;

  return (
    <div key={id} className="list-item-simple">
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
            smallWidth={274}
            smallHeight={148}
            mediumWidth={274}
            mediumHeight={148}
            largeWidth={274}
            largeHeight={148}
            className="simple-list-img"
          />
        ) : (
          <div className="simple-list-placeholder" />
        )}
      </a>
      {itemTitle !== '' ? (
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
