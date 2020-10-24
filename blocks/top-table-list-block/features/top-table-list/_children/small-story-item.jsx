import React from 'react';
import getPromoStyle from './promo_style';
import getPromoContainer from './promo_container';
import StoryItemHeadline from './story-item-headline';
import StoryItemImage from './story-item-image';

const SmallStoryItem = (props) => {
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

  const onePerLine = customFields.storiesPerRowSM === 1;
  const promoClasses = `container-fluid small-promo layout-section ${onePerLine ? 'small-promo-one' : 'wrap-bottom'}`;

  const imagePosition = customFields?.imagePosition || 'right';
  const headline = customFields?.showHeadlineSM && itemTitle !== ''
    ? (
      <StoryItemHeadline
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        websiteURL={websiteURL}
        customFields={customFields}
      />
    ) : null;

  const image = customFields.showImageSM
    && (
    <StoryItemImage
      itemTitle={itemTitle}
      imageURL={imageURL}
      websiteURL={websiteURL}
      arcSite={arcSite}
      resizedImageOptions={resizedImageOptions}
      targetFallbackImage={targetFallbackImage}
      placeholderResizedImageOptions={placeholderResizedImageOptions}
      imageRatio={imageRatio}
      element={element}
      customFields={customFields}
    />
    );

  const promoContainersStyles = {
    containerClass: getPromoStyle(imagePosition, 'container'),
    headlineClass: customFields.showImageSM
      ? 'col-sm-8 col-md-xl-8'
      : 'col-sm-xl-12 no-image-padding',
    imageClass: 'col-sm-4 col-md-xl-4',
  };

  return (
    <article
      key={id}
      className={`${promoClasses} ${paddingRight ? 'small-promo-padding' : ''}`}
    >
      {/* from item-title-with-right-image <div className="row sm-promo-padding-btm"> */}
      {getPromoContainer(imagePosition, headline, image, promoContainersStyles)}
      <hr />
    </article>
  );
};
export default SmallStoryItem;
