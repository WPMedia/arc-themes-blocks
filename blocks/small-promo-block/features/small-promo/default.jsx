import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import { LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import { imageRatioCustomField } from '@wpmedia/resizer-image-block';
import { SmallPromoPresentation } from '@wpmedia/shared-styles';

const SmallPromoItem = ({ customFields, arcSite }) => {
  const content = useContent({
    source: customFields?.itemContentConfig?.contentService ?? null,
    query: customFields?.itemContentConfig?.contentConfigValues
      ? {
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
                800x600
                800x533
                800x450
                600x450
                600x400
                600x338
              }
            }
          }
        }
        basic {
          type
          url
          resized_params {
            800x600
            800x533
            800x450
            600x450
            600x400
            600x338
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

  return (
    <SmallPromoPresentation content={content} {...customFields} />
  );
};

const SmallPromo = ({ customFields = { showImage: true, showHeadline: true, imageRatio: '3:2' } }) => {
  const { isAdmin, arcSite } = useFusionContext();
  const shouldLazyLoad = customFields?.lazyLoad && !isAdmin;
  if (shouldLazyLoad && isServerSide()) {
    return null;
  }
  return (
    <LazyLoad enabled={shouldLazyLoad}>
      <SmallPromoItem customFields={customFields} arcSite={arcSite} />
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

SmallPromo.icon = 'paragraph-bullets';

export default SmallPromo;
