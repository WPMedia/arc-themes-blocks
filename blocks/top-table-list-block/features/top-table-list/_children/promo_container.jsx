import React from 'react';

function getPromoContainer(imagePosition = 'right', headline, image, promoContainersStyles) {
  // image left, above
  if (imagePosition === 'left' || imagePosition === 'above') {
    return (
      <div className={promoContainersStyles?.containerClass}>
        <div className={promoContainersStyles?.imageClass}>
          {image}
        </div>
        <div className={promoContainersStyles?.headlineClass}>
          {headline}
        </div>
      </div>
    );
  }

  // image right, below
  return (
    <div className={promoContainersStyles?.containerClass}>
      <div className={promoContainersStyles?.headlineClass}>
        {headline}
      </div>
      <div className={promoContainersStyles?.imageClass}>
        {image}
      </div>
    </div>
  );
}
export default getPromoContainer;
