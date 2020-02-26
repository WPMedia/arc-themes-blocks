import React from 'react';
import Title from './title';

const ItemTitleWithRightImage = (props) => {
  const {
    itemTitle, imageURL, id, primaryFont,
  } = props;

  return (
    <article key={id} className="container-fluid small-promo">
      <div className="row sm-promo-padding-btm">
        {itemTitle !== '' ? (
          <div className="col-sm-xl-8">
            <Title primaryFont={primaryFont} className="sm-promo-headline">
              {itemTitle}
            </Title>
          </div>
        ) : null}
        <div className="col-sm-xl-4">
          {imageURL !== '' ? (
            <img src={imageURL} alt={itemTitle} />
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ItemTitleWithRightImage;
