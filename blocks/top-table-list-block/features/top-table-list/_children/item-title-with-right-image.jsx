import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';
import { resizerURL } from 'fusion:environment';
import Title from './title';

const ItemTitleWithRightImage = (props) => {
  const {
    itemTitle,
    imageURL,
    id,
    primaryFont,
    websiteURL,
    customFields,
    arcSite,
    resizedImageOptions,
    targetFallbackImage,
    placeholderResizedImageOptions,
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
                  resizedImageOptions={resizedImageOptions}
                  url={imageURL}
                  alt={itemTitle}
                  // small size aspect ratios 3:2
                  smallWidth={274}
                  smallHeight={183}
                  mediumWidth={274}
                  mediumHeight={183}
                  largeWidth={400}
                  largeHeight={267}
                  breakpoints={getProperties(arcSite)?.breakpoints}
                  resizerURL={resizerURL}
                />
              </a>
            ) : (
              <Image
                smallWidth={274}
                smallHeight={183}
                mediumWidth={274}
                mediumHeight={183}
                largeWidth={400}
                largeHeight={267}
                alt={getProperties(arcSite).primaryLogoAlt || 'Placeholder logo'}
                url={targetFallbackImage}
                breakpoints={getProperties(arcSite)?.breakpoints}
                resizedImageOptions={placeholderResizedImageOptions}
                resizerURL={resizerURL}
              />
            )}
          </div>
          )}
      </div>
    </article>
  );
};
export default ItemTitleWithRightImage;
