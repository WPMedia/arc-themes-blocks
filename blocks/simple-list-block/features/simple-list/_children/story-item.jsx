import React from 'react';
import { Image } from '@arc-test-org/engine-theme-sdk';
import Title from './title';

const StoryItem = (props) => {
  const {
    itemTitle = '', imageURL = '', id = '', primaryFont = '',
  } = props;

  return (
    <div key={id} className="list-item-simple">
      <div className="simple-list-image-container">
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
      </div>
      {itemTitle !== '' ? (
        <div className="simple-list-headline-anchor">
          <Title primaryFont={primaryFont} className="simple-list-headline-text">
            {itemTitle}
          </Title>
        </div>
      ) : null}
    </div>
  );
};

export default StoryItem;
