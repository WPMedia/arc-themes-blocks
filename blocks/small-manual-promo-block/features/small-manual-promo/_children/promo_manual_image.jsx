import React from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { Image } from '@wpmedia/engine-theme-sdk';
import { useContent } from 'fusion:content';
import getPromoStyle from './promo_style';
import usePromoElementLink from './promo_link';

const PromoManualImage = (props) => {
  const { customFields } = props;
  const { arcSite } = useFusionContext();
  const getElementLink = usePromoElementLink(customFields);

  const imagePosition = customFields?.imagePosition || 'right';
  const imageMarginClass = getPromoStyle(imagePosition, 'margin');
  const resizedImageOptions = useContent({
    source: 'resize-image-api',
    query: { raw_image_url: customFields.imageURL, 'arc-site': arcSite },
  });

  const image = (
    <Image
      url={customFields.imageURL}
      alt={customFields.headline}
    // small should be 3:2 aspect ratio
      smallWidth={105}
      smallHeight={70}
      mediumWidth={105}
      mediumHeight={70}
      largeWidth={105}
      largeHeight={70}
      breakpoints={getProperties(arcSite)?.breakpoints}
      resizerURL={getProperties(arcSite)?.resizerURL}
      resizedImageOptions={resizedImageOptions}
    />
  );

  const imageLink = getElementLink(image);

  return (
    <div className={imageMarginClass}>
      <div className="flex no-image-padding">
        { imageLink }
      </div>
    </div>
  );
};

export default PromoManualImage;
