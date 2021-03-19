import React from 'react';

function getPromoContainer(headline, image, promoContainersStyles, imagePosition = 'right', isAdmin) {
  const imageLeftOrAbove = (imagePosition === 'left' || imagePosition === 'above');
  const HeadlineOutput = (
    <div className={promoContainersStyles?.headlineClass}>
      {headline}
    </div>
  );

  const ImageOutput = (
    <div className={promoContainersStyles?.imageClass} style={{ position: isAdmin ? 'relative' : null }}>
      {image}
    </div>
  );

  return (
    <div className={promoContainersStyles?.containerClass}>
      {imageLeftOrAbove ? ImageOutput : HeadlineOutput}
      {imageLeftOrAbove ? HeadlineOutput : ImageOutput}
    </div>
  );
}
export default getPromoContainer;
