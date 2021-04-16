import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent, useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';

import { LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import { imageRatioCustomField } from '@wpmedia/resizer-image-block';
import {
  Byline, PromoDate, PromoDescription, PromoHeadline, PromoImage,
} from '@wpmedia/shared-styles';

import '@wpmedia/shared-styles/scss/_medium-promo.scss';

const MediumPromoItem = ({ customFields }) => {
  const { arcSite, isAdmin } = useFusionContext();
  const { searchableField } = useEditableContent();

  const content = useContent({
    source: customFields?.itemContentConfig?.contentService ?? null,
    query: customFields?.itemContentConfig?.contentConfigValues
      ? {
        'arc-site': arcSite,
        feature: 'medium-promo',
        ...customFields.itemContentConfig.contentConfigValues,
      }
      : null,
    // does not need embed_html because no video section
    // does not need website section nor label because no overline
    filter: `{
      _id
      credits {
        by {
          _id
          name
          url
          type
          additional_properties {
            original {
              byline
            }
          }
        }
      }
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

  return (
    <>
      <article className="container-fluid medium-promo">
        <div className={`medium-promo-wrapper ${customFields.showImage ? 'md-promo-image' : ''}`} style={{ position: isAdmin ? 'relative' : null }}>
          {customFields.showImage
            ? (
              <div className="image-link" {...searchableField('imageOverrideURL')}>
                <PromoImage
                  content={content}
                  customImageURL={customFields.imageOverrideURL}
                  showPromoLabel
                  promoSize="MD"
                  promoLabelSize="large"
                  imageRatio={customFields.imageRatio}
                  lazyLoad={customFields.lazyLoad}
                />
              </div>
            ) : null}
          {(customFields.showHeadline || customFields.showDescription
            || customFields.showByline || customFields.showDate)
          && (
            <>
              {customFields.showHeadline ? (
                <PromoHeadline
                  content={content}
                  headingClassName="md-promo-headline-text"
                  className="md-promo-headline"
                />
              ) : null}
              {(customFields.showDescription ? (
                <PromoDescription
                  className="description-text"
                  content={content}
                />
              ) : null)}
              <div className="article-meta">
                {(customFields.showByline) ? <Byline content={content} font="Primary" list /> : null}
                {(customFields.showDate) ? (
                  <PromoDate content={content} />
                ) : null}
              </div>
            </>
          )}
        </div>
      </article>
      <hr />
    </>
  );
};

const MediumPromo = ({ customFields }) => {
  const { isAdmin } = useFusionContext();
  if (customFields.lazyLoad && isServerSide() && !isAdmin) { // On Server
    return null;
  }
  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <MediumPromoItem customFields={{ ...customFields }} />
    </LazyLoad>
  );
};

MediumPromo.propTypes = {
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
    showDescription: PropTypes.bool.tag({
      label: 'Show description',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    showByline: PropTypes.bool.tag({
      label: 'Show byline',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    showDate: PropTypes.bool.tag({
      label: 'Show date',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    imageOverrideURL: PropTypes.string.tag({
      label: 'Image URL',
      group: 'Image',
      searchable: 'image',
    }),
    ...imageRatioCustomField('imageRatio', 'Art', '16:9'),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

MediumPromo.label = 'Medium Promo – Arc Block';

export default MediumPromo;
