import React from 'react';
import PropTypes from 'prop-types';
import { useContent, useEditableContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import { LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import { imageRatioCustomField } from '@wpmedia/resizer-image-block';
import {
  PromoHeadline, PromoImage, SmallPromoContainer, SmallPromoStyles,
} from '@wpmedia/shared-styles';

const SmallPromoItem = ({ customFields }) => {
  const { arcSite, isAdmin } = useFusionContext();
  const { searchableField } = useEditableContent();

  const content = useContent({
    source: customFields?.itemContentConfig?.contentService ?? null,
    query: customFields?.itemContentConfig?.contentConfigValues
      ? {
        'arc-site': arcSite,
        feature: 'small-promo',
        ...customFields.itemContentConfig.contentConfigValues,
      }
      : null,
    // does not need embed_html because no video section
    // does not need website section nor label because no overline
    // does not need byline because no byline shown
    filter: `{
      _id
      description {
        basic
      }
      display_date
      type
      headlines {
        basic
      }
      promo_items {
        type
        url
        lead_art {
          type
          promo_items {
            basic {
              type
              url
              resized_params {
                400x300
                400x267
                400x225
                274x206
                274x183
                274x154
              }
            }
          }
        }
        basic {
          type
          url
          resized_params {
            400x300
            400x267
            400x225
            274x206
            274x183
            274x154
          }
        }
      }
      websites {
        ${arcSite} {
          website_url
        }
      }
    }`,
  }) || null;

  const imagePosition = customFields?.imagePosition || 'right';
  const headlineMarginClass = SmallPromoStyles(imagePosition, 'headlineMargin');

  const headline = customFields?.showHeadline ? (
    <PromoHeadline
      content={content}
      className={headlineMarginClass}
      linkClassName="sm-promo-headline"
      headingClassName="sm-promo-headline"
    />
  ) : null;

  const image = customFields?.showImage ? (
    <div style={{ position: isAdmin ? 'relative' : null }}>
      <div {...searchableField('imageOverrideURL')}>
        <PromoImage
          content={content}
          customImageURL={customFields.imageOverrideURL}
          showPromoLabel
          promoSize="SM"
          imageRatio={customFields.imageRatio}
          lazyLoad={customFields.lazyLoad}
        />
      </div>
    </div>
  ) : null;

  return content ? (
    <SmallPromoContainer
      headline={headline}
      image={image}
      imagePosition={imagePosition}
    />
  ) : null;
};

const SmallPromo = ({ customFields = { showImage: true, showHeadline: true, imageRatio: '3:2' } }) => {
  const { isAdmin } = useFusionContext();
  if (customFields.lazyLoad && isServerSide() && !isAdmin) { // On Server
    return null;
  }
  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <SmallPromoItem customFields={customFields} />
    </LazyLoad>
  );
};

SmallPromo.propTypes = {
  customFields: PropTypes.shape({
    itemContentConfig: PropTypes.contentConfig('ans-item').tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
    showHeadline: PropTypes.bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    showImage: PropTypes.bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    imageOverrideURL: PropTypes.string.tag({
      label: 'Image URL',
      group: 'Image',
      searchable: 'image',
    }),
    imagePosition: PropTypes.oneOf([
      'right', 'left', 'above', 'below',
    ]).tag({
      defaultValue: 'right',
      label: 'Image Position',
      group: 'Image',
      labels: {
        right: 'Image Right',
        left: 'Image Left',
        above: 'Image Above',
        below: 'Image Below',
      },
    }).isRequired,
    ...imageRatioCustomField('imageRatio', 'Art', '3:2'),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

SmallPromo.label = 'Small Promo – Arc Block';

export default SmallPromo;
