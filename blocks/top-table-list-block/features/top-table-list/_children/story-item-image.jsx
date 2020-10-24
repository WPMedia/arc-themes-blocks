import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import { ratiosFor } from '@wpmedia/resizer-image-block';
import getProperties from 'fusion:properties';
import getPromoStyle from './promo_style';
import PromoLabel from './promo_label';
import discoverPromoType from './discover';

const StoryItemImage = (props) => {
  const {
    itemTitle,
    imageURL,
    websiteURL,
    arcSite,
    resizedImageOptions,
    targetFallbackImage,
    placeholderResizedImageOptions,
    imageRatio,
    element,
    customFields,
  } = props;

  const promoType = discoverPromoType(element);
  const ratios = ratiosFor('SM', imageRatio);

  const imagePosition = customFields?.imagePosition || 'right';
  const imageMarginClass = getPromoStyle(imagePosition, 'margin');

  return (
    // from item-title-with-right-image <div className="col-sm-4 col-md-xl-4 flex-col">
    <div className={imageMarginClass}>
      <div className="flex no-image-padding">
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
              alt={getProperties(arcSite)?.primaryLogoAlt || 'Placeholder logo'}
              url={targetFallbackImage}
              breakpoints={getProperties(arcSite)?.breakpoints}
              resizedImageOptions={placeholderResizedImageOptions}
              resizerURL={getProperties(arcSite)?.resizerURL}
            />
            <PromoLabel type={promoType} size="small" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryItemImage;
