import React from 'react';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import { extractImageFromStory, extractResizedParams, ratiosFor } from '@wpmedia/resizer-image-block';
import { Image } from '@wpmedia/engine-theme-sdk';
import PlaceholderImage from '@wpmedia/placeholder-image-block';
import PromoLabel from './promo_label';
import discoverPromoType from './discover';
import getPromoStyle from './promo_style';

const PromoImage = (props) => {
  const { content, customFields, ratios } = props;
  const { arcSite } = useFusionContext();
  const promoType = discoverPromoType(content);

  const imageConfig = customFields.imageOverrideURL ? 'resize-image-api' : null;

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
          {/* <div className="col-sm-xl-4 flex-col"> // from default */}
          <a
            href={content?.website_url || ''}
            title={content?.headlines?.basic || ''}
          >
            {imageURL
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
                />
              )}
            <PromoLabel type={promoType} size="small" />
          </a>
        </div>
      </div>

    ) : null;
};
export default PromoImage;
