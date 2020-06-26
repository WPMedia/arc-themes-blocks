import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import { ratiosFor } from '@wpmedia/resizer-image-block';
import getProperties from 'fusion:properties';

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
    paddingRight = false,
    imageRatio,
  } = props;

  const ratios = ratiosFor('SM', imageRatio);

  return (
    <article key={id} className={`container-fluid small-promo ${paddingRight ? 'small-promo-padding' : ''}`}>
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
                  smallWidth={ratios.smallWidth}
                  smallHeight={ratios.smallHeight}
                  mediumWidth={ratios.mediumWidth}
                  mediumHeight={ratios.mediumHeight}
                  largeWidth={ratios.largeWidth}
                  largeHeight={ratios.largeHeight}
                  breakpoints={getProperties(arcSite)?.breakpoints}
                  resizerURL={getProperties(arcSite)?.resizerURL}
                />
              </a>
            ) : (
              <Image
                smallWidth={ratios.smallWidth}
                smallHeight={ratios.smallHeight}
                mediumWidth={ratios.mediumWidth}
                mediumHeight={ratios.mediumHeight}
                largeWidth={ratios.largeWidth}
                largeHeight={ratios.largeHeight}
                alt={getProperties(arcSite).primaryLogoAlt || 'Placeholder logo'}
                url={targetFallbackImage}
                breakpoints={getProperties(arcSite)?.breakpoints}
                resizedImageOptions={placeholderResizedImageOptions}
                resizerURL={getProperties(arcSite)?.resizerURL}
              />
            )}
          </div>
          )}
      </div>
    </article>
  );
};
export default ItemTitleWithRightImage;
