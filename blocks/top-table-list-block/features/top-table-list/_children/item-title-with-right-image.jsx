import React from 'react';
import { Image } from '@arc-test-org/engine-theme-sdk';
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
            <a href={constructedURL} title={itemTitle}>
              <Image
                url={imageURL}
                alt={itemTitle}
                smallWidth={275}
                smallHeight={0}
                mediumWidth={275}
                mediumHeight={0}
                largeWidth={400}
                largeHeight={0}
              />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};
export default ItemTitleWithRightImage;
