import React from 'react';
import Title from '../shared/title';

const StoryItem = (props) => {
  const {
    itemTitle = '', imageURL = '', id = '', primaryFont = '',
  } = props;

  return (
    <div key={id} className="list-item-simple">
      <div className="simple-list-image-container">
        {imageURL !== '' ? (
          <img src={imageURL} alt={itemTitle} className="simple-list-img" />
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
