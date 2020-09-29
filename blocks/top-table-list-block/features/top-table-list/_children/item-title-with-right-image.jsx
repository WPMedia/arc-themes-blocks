import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import { ratiosFor } from '@wpmedia/resizer-image-block';
import getProperties from 'fusion:properties';
import Title from './title';
import PromoLabel from './promo_label';
import discoverPromoType from './discover';

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
    element,
    paddingRight = false,
    imageRatio,
  } = props;

  const ratios = ratiosFor('SM', imageRatio);
  const onePerLine = customFields.storiesPerRowSM === 1;
  const promoClasses = `container-fluid small-promo layout-section ${onePerLine ? 'small-promo-one' : 'wrap-bottom'}`;
  const promoType = discoverPromoType(element);

  return (
    <article
      key={id}
      className={`${promoClasses} ${paddingRight ? 'small-promo-padding' : ''}`}
      style={{
        width: `calc((100% - 1.5rem) / ${customFields.storiesPerRowSM || 1})`,
      }}
    >
      <div className="row sm-promo-padding-btm">
        {customFields.showHeadlineSM === 'above'
        && customFields.showHeadlineSM
        && itemTitle !== '' ? (
          <div className="col-sm-8 col-md-xl-8">
            <a
              href={websiteURL}
              title={itemTitle}
              className="sm-promo-headline"
            >
              <Title primaryFont={primaryFont} className="sm-promo-headline">
                {itemTitle}
              </Title>
            </a>
          </div>
          ) : null}
        {customFields.showImageSM
          && (
          <div className="col-sm-4 col-md-xl-4 flex-col">
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
                <PromoLabel type={promoType} size="small" />
              </a>
            ) : (
              <div className="image-wrapper">
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
                <PromoLabel type={promoType} size="small" />
              </div>
            )}
          </div>
          )}
      </div>
      {customFields.showHeadlineSM === 'below'
      && customFields.showHeadlineSM
      && itemTitle !== '' ? (
        <div className="col-sm-8 col-md-xl-8">
          <a href={websiteURL} title={itemTitle} className="sm-promo-headline">
            <Title primaryFont={primaryFont} className="sm-promo-headline">
              {itemTitle}
            </Title>
          </a>
        </div>
        ) : null}
      <hr />
    </article>
  );
};
export default ItemTitleWithRightImage;
