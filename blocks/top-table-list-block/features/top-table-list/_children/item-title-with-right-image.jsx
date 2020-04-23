import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';

import Title from './title';

const ItemTitleWithRightImage = (props) => {
  const {
    itemTitle, imageURL, id, primaryFont, constructedURL,
  } = props;
  return (
    <article key={id} className="container-fluid small-promo">
      <div className="row sm-promo-padding-btm">
        {itemTitle !== '' ? (
          <div className="col-sm-8 col-md-xl-8">
            <a href={constructedURL} title={itemTitle} className="sm-promo-headline">
              <Title primaryFont={primaryFont} className="sm-promo-headline">
                {itemTitle}
              </Title>
            </a>
          </div>
        ) : null}
        <div className="col-sm-4 col-md-xl-4">
          {imageURL !== '' ? (
            <a href={constructedURL} title={itemTitle}>
              <Image
                url={imageURL}
                alt={itemTitle}
                // small size aspect ratios 3:2
                smallWidth={274}
                smallHeight={183}
                mediumWidth={274}
                mediumHeight={183}
                largeWidth={400}
                largeHeight={267}
              />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};
export default ItemTitleWithRightImage;
