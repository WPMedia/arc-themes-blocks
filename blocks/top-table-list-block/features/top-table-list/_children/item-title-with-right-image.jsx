import React from 'react';
import Title from './title';

const ItemTitleWithRightImage = (props) => {
  const {
    itemTitle, imageURL, id, primaryFont, constructedURL,
  } = props;
  return (
    <article key={id} className="container-fluid small-promo">
      <div className="row sm-promo-padding-btm">
        {itemTitle !== '' ? (
          <div className="col-sm-xl-8">
            <a href={constructedURL} title={itemTitle} className="sm-promo-headline">
              <Title primaryFont={primaryFont} className="sm-promo-headline">
                {itemTitle}
              </Title>
            </a>
          </div>
        ) : null}
        <div className="col-sm-xl-4">
          {imageURL !== '' ? (
            <a href={constructedURL} title={itemTitle} className="list-anchor">
              <img src={imageURL} alt={itemTitle} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};
export default ItemTitleWithRightImage;
