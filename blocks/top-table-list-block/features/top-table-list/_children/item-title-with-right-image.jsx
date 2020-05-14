import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import PlaceholderImage from '@wpmedia/placeholder-image-block';
import Title from './title';

const ItemTitleWithRightImage = (props) => {
  const {
    itemTitle,
    imageURL,
    id,
    primaryFont,
    websiteURL,
    customFields,
  } = props;
  return (
    <article key={id} className="container-fluid small-promo">
      <div className="row sm-promo-padding-btm">
        {customFields.showHeadlineSM && itemTitle !== '' ? (
          <div className="col-sm-8 col-md-xl-8">
            <a href={websiteURL} title={itemTitle} className="sm-promo-headline">
              <Title primaryFont={primaryFont} className="sm-promo-headline">
                {itemTitle}
              </Title>
            </a>
          </div>
        ) : null}
        {customFields.showImageSM
          && (
          <div className="col-sm-4 col-md-xl-4">
            {imageURL !== '' ? (
              <a href={websiteURL} title={itemTitle}>
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
            ) : (
              <PlaceholderImage
                smallWidth={274}
                smallHeight={183}
                mediumWidth={274}
                mediumHeight={183}
                largeWidth={400}
                largeHeight={267}
              />
            )}
          </div>
          )}
      </div>
    </article>
  );
};
export default ItemTitleWithRightImage;
