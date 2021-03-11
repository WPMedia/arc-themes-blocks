import React from 'react';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import { extractImageFromStory, extractResizedParams } from '@wpmedia/resizer-image-block';
import { Image } from '@wpmedia/engine-theme-sdk';
import PlaceholderImage from '@wpmedia/placeholder-image-block';
import PromoLabel from './promo_label';
import discoverPromoType from './discover';
import getPromoStyle from './promo_style';

const PromoImage = (props) => {
  const { content, customFields, ratios } = props;
  const { arcSite } = useFusionContext();
  const promoType = discoverPromoType(content);

  let imageConfig = null;
  if (customFields.imageOverrideURL && customFields.lazyLoad) {
    imageConfig = 'resize-image-api-client';
  } else if (customFields.imageOverrideURL) {
    imageConfig = 'resize-image-api';
  }

  const customFieldImageResizedImageOptions = useContent({
    source: imageConfig,
    query: { raw_image_url: customFields.imageOverrideURL },
  }) || undefined;

  const imageURL = customFields.imageOverrideURL
    ? customFields.imageOverrideURL : extractImageFromStory(content);
  const resizedImageOptions = customFields.imageOverrideURL
    ? customFieldImageResizedImageOptions
    : extractResizedParams(content);

  const { imagePosition } = customFields || 'right';
  return content
    ? (
      <div className={`promo-image ${getPromoStyle(imagePosition, 'margin')}`}>
        <div className="flex no-image-padding">
          <a href={content?.website_url || ''} aria-hidden="true" tabIndex="-1">
            {imageURL && resizedImageOptions
              ? (
                <Image
                  url={imageURL}
                  alt={content && content.headlines ? content.headlines.basic : ''}
                    // small should be 3:2 aspect ratio
                  smallWidth={ratios.smallWidth}
                  smallHeight={ratios.smallHeight}
                  mediumWidth={ratios.mediumWidth}
                  mediumHeight={ratios.mediumHeight}
                  largeWidth={ratios.largeWidth}
                  largeHeight={ratios.largeHeight}
                  breakpoints={getProperties(arcSite)?.breakpoints}
                  resizerURL={getProperties(arcSite)?.resizerURL}
                  resizedImageOptions={resizedImageOptions}
                />
              )
              : (
                <PlaceholderImage
                  smallWidth={ratios.smallWidth}
                  smallHeight={ratios.smallHeight}
                  mediumWidth={ratios.mediumWidth}
                  mediumHeight={ratios.mediumHeight}
                  largeWidth={ratios.largeWidth}
                  largeHeight={ratios.largeHeight}
                  client={imageConfig === 'resize-image-api-client'}
                />
              )}
            <PromoLabel type={promoType} size="small" />
          </a>
        </div>
      </div>

    ) : null;
};
export default PromoImage;
