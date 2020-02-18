import styled from 'styled-components';
import React from 'react';
import Title from './title';

const StoryItemStyles = styled.div`
  display: flex;
  justify-content: flex-end;
  min-height: 72px;
  width: 100%;

  .simple-list-image-container {
    display: flex;
    flex: 0 0 25%;

    .simple-list-img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
    .simple-list-placeholder {
      background-color: #dfe4ea;
      width: 100%;
      height: auto;
      min-height: 72px;
    }
  }

  .simple-list-headline-anchor {
    flex: 3;

    .simple-list-headline-text {
      max-height: 72px;
    }
  }
`;

const ItemTitleWithRightImage = (props) => {
  const {
    itemTitle = '', imageURL = '', id = '', primaryFont = '',
  } = props;

  return (
    <StoryItemStyles key={id} className="top-table-list-item-simple">
      {itemTitle !== '' ? (
        <div className="simple-list-headline-anchor">
          <Title primaryFont={primaryFont} className="simple-list-headline-text">
            {itemTitle}
          </Title>
        </div>
      ) : null}
      <div className="simple-list-image-container">
        {imageURL !== '' ? (
          <img src={imageURL} alt={itemTitle} className="simple-list-img" />
        ) : (
          <div className="simple-list-placeholder" />
        )}
      </div>
    </StoryItemStyles>
  );
};

export default ItemTitleWithRightImage;
