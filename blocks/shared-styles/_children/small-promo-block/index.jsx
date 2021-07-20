import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useContent, useEditableContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import { LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import { imageRatioCustomField } from '@wpmedia/resizer-image-block';
import {
  PromoHeadline, PromoImage, SmallPromoContainer, SmallPromoStyles,
} from '@wpmedia/shared-styles';

const SmallPromoItem = ({ customFields, manual }) => {
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
      text={customFields.headline}
      link={customFields.linkURL}
      newTab={customFields.newTab}
    />
  ) : null;

  const imageSearchableField = manual ? searchableField('imageOverrideURL') : searchableField('imageURL');

  const image = customFields?.showImage ? (
    <div style={{ position: isAdmin ? 'relative' : null }}>
      <div {...imageSearchableField} suppressContentEditableWarning>
        <PromoImage
          content={content}
          customImageURL={customFields.imageOverrideURL || customFields.imageURL}
          showPromoLabel
          promoSize="SM"
          imageRatio={customFields.imageRatio}
          lazyLoad={customFields.lazyLoad}
          alt={customFields.headline}
          linkURL={customFields.linkURL}
          newTab={customFields.newTab}
        />
      </div>
    </div>
  ) : null;

  return (
    <SmallPromoContainer
      headline={headline}
      image={image}
      imagePosition={imagePosition}
    />
  );
};

const SmallPromo = ({ customFields = { showImage: true, showHeadline: true, imageRatio: '3:2' } }) => {
  const { isAdmin } = useFusionContext();
  const shouldLazyLoad = customFields?.lazyLoad && !isAdmin;
  if (shouldLazyLoad && isServerSide()) {
    return null;
  }
  return (
    <LazyLoad enabled={shouldLazyLoad}>
      <SmallPromoItem customFields={customFields} />
    </LazyLoad>
  );
};

const SmallManualPromo = ({ customFields = { showImage: true, showHeadline: true, imageRatio: '3:2' }, manual = true }) => {
  const { isAdmin } = useFusionContext();
  if (customFields.lazyLoad && isServerSide() && !isAdmin) { // On Server
    return null;
  }
  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <SmallPromoItem customFields={{ ...customFields }} />
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
  manual: PropTypes.string.bool({
    label: 'Manual Promo',
    group: 'Promos',
    searchable: 'manual',
  }),
};

SmallManualPromo.propTypes = {
  customFields: PropTypes.shape({
    headline: PropTypes.string.tag({
      label: 'Headline',
      group: 'Configure Content',
    }),
    imageURL: PropTypes.string.tag({
      label: 'Image URL',
      group: 'Configure Content',
      searchable: 'image',
    }),
    linkURL: PropTypes.string.tag({
      label: 'Link URL',
      group: 'Configure Content',
    }),
    newTab: PropTypes.bool.tag({
      label: 'Open in new tab',
      defaultValue: false,
      group: 'Configure Content',
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
    }),
    ...imageRatioCustomField('imageRatio', 'Art', '3:2'),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
  manual: PropTypes.string.bool({
    label: 'Manual Promo',
    group: 'Promos',
    searchable: 'manual',
  }),
};

SmallPromo.label = 'Small Promo – Arc Block';
SmallManualPromo.label = 'Small Manual Promo – Arc Block';

export {
  SmallPromo,
  SmallManualPromo,
};
