import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import { ratiosFor } from '@wpmedia/resizer-image-block';
import getProperties from 'fusion:properties';
import Title from './title';
import PromoLabel from './promo_label';
import discoverPromoType from './discover';
import {
  LEFT, RIGHT, ABOVE, BELOW,
} from '../shared/imagePositionConstants';

const SmallListItem = (props) => {
  const {
    itemTitle,
    imageURL,
    id,
    primaryFont,
    websiteURL,
    arcSite,
    resizedImageOptions,
    targetFallbackImage,
    placeholderResizedImageOptions,
    element,
    imageRatio,
    customFields: {
      imagePositionSM: imagePosition = RIGHT,
      storiesPerRowSM,
      showHeadlineSM,
      showImageSM,
      showBottomBorderSM,
    },
  } = props;
  const ratios = ratiosFor('SM', imageRatio);
  const storiesPerRow = (typeof storiesPerRowSM === 'undefined') ? 2 : storiesPerRowSM;
  const promoType = discoverPromoType(element);
  const showHeadline = showHeadlineSM && itemTitle !== '';
  const showImage = showImageSM;
  const layout = imagePosition === ABOVE || imagePosition === BELOW ? 'vertical' : 'horizontal';
  const isReverseLayout = (imagePosition === ABOVE || imagePosition === LEFT);
  const showBottomBorder = (typeof showBottomBorderSM === 'undefined') ? true : showBottomBorderSM;

  const hrBorderTmpl = () => {
    if (showBottomBorder) {
      return (
        <hr />
      );
    }
    return (
      <hr className="hr-borderless" />
    );
  };

  const PromoHeadline = () => (
    <div className={`promo-headline headline-wrap-${layout}`}>
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
  );

  const PromoImage = () => (
    <div className="promo-image flex-col">
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
  );

  const colClassNum = (!!storiesPerRow && Math.floor(12 / storiesPerRow)) || 1;
  const colClasses = `col-sm-12 col-md-${colClassNum} col-lg-${colClassNum} col-xl-${colClassNum}`;

  return (
    <article
      key={id}
      className={`small-promo ${colClasses} layout-section wrap-bottom`}
    >
      <div className={`promo-container ${layout} ${isReverseLayout ? 'reverse' : ''} sm-promo-padding-btm`}>
        { showHeadline && <PromoHeadline /> }
        { showImage && <PromoImage /> }
      </div>
      {hrBorderTmpl()}
    </article>
  );
};
export default SmallListItem;
