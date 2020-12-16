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
  const storiesPerRow = (typeof customFields.storiesPerRowSM === 'undefined')
    ? 2
    : customFields.storiesPerRowSM;
  const promoClasses = `small-promo layout-section small-promo-${storiesPerRow} wrap-bottom`;
  const promoType = discoverPromoType(element);
  const showHeadline = customFields.showHeadlineSM && itemTitle !== '';
  const showImage = customFields.showImageSM;
  let showSize;
  let layout;

  if (storiesPerRow > 2) {
    showSize = `${showHeadline ? 'vHead' : ''}${showImage ? 'vImage' : ''}`;
    layout = 'vertical';
  } else {
    showSize = `${showHeadline ? 'hHead' : ''}${showImage ? 'hImage' : ''}`;
    layout = 'horizontal';
  }

  const sizes = {
    hHeadhImage: {
      title: 'col-sm-8 col-md-8 col-lg-8 col-xl-8 headline-wrap-horizontal',
      image: 'col-sm-4 col-md-4 col-lg-4 col-xl-4 flex-col',
    },
    hHead: {
      title: 'col-sm-12 col-md-12 col-lg-12 col-xl-12 headline-wrap-horizontal',
    },
    hImage: {
      image: 'col-sm-4 col-md-4 col-lg-4 col-xl-4 flex-col',
    },
    vHeadvImage: {
      title: 'col-sm-8 col-md-12 col-lg-12 col-xl-12 headline-wrap-vertical',
      image: 'col-sm-4 col-md-12 col-lg-12 col-xl-12 flex-col',
    },
    vHead: {
      title: 'col-sm-8 col-md-12 col-lg-12 col-xl-12 headline-wrap-vertical',
    },
    vImage: {
      image: 'col-sm-4 col-md-12 col-lg-12 col-xl-12 flex-col',
    },
  };

  return (
    <article
      key={id}
      className={`${promoClasses} ${paddingRight ? 'small-promo-padding' : ''}`}
    >
      <div className={`row sm-promo-padding-btm ${layout}`}>
        {/* customFields.headlinePositionSM === 'above' && */
          showHeadline ? (
            <div className={sizes[showSize].title}>
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
          ) : null
        }
        {showImage && (
          <div className={sizes[showSize].image}>
            { imageURL !== '' ? (
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
      {/* {customFields.headlinePositionSM === 'below'
      && customFields.showHeadlineSM
      && itemTitle !== '' ? (
        <div className="col-sm-8 col-md-xl-8">
          <a href={websiteURL} title={itemTitle} className="sm-promo-headline headline-below">
            <Title primaryFont={primaryFont} className="sm-promo-headline">
              {itemTitle}
            </Title>
          </a>
        </div>
        ) : null} */}
      <hr />
    </article>
  );
};
export default ItemTitleWithRightImage;
