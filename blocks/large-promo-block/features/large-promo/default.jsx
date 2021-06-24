import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useEditableContent, useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';

import {
  extractVideoEmbedFromStory,
  // presentational component does not do data fetching
  VideoPlayer as VideoPlayerPresentational,
  LazyLoad,
  isServerSide,
  videoPlayerCustomFields,
} from '@wpmedia/engine-theme-sdk';
import { imageRatioCustomField } from '@wpmedia/resizer-image-block';
import {
  Byline, Overline, PromoDate, PromoDescription, PromoHeadline, PromoImage,
} from '@wpmedia/shared-styles';

import '@wpmedia/shared-styles/scss/_large-promo.scss';

const LargePromoItem = ({ customFields }) => {
  const { arcSite, id, isAdmin } = useFusionContext();
  const { searchableField } = useEditableContent();

  const content = useContent({
    source: customFields?.itemContentConfig?.contentService ?? null,
    query: customFields?.itemContentConfig?.contentConfigValues
      ? {
        'arc-site': arcSite,
        feature: 'large-promo',
        ...customFields?.itemContentConfig?.contentConfigValues,
      }
      : null,
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
      label {
        basic {
          display
          url
          text
        }
      }
      owner {
        sponsored
      }
      promo_items {
        type
        url
        lead_art {
          embed_html
          type
          promo_items {
            basic {
              type
              url
              resized_params {
                377x283
                377x251
                377x212
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
            377x283
            377x251
            377x212
            274x206
            274x183
            274x154
          }
        }
      }
      embed_html
      website_url
      websites {
        ${arcSite} {
          website_url
          website_section {
            _id
            name
          }
        }
      }
    }`,
  }) || null;

  if (!content || content === {}) {
    return null;
  }

  const textClass = customFields?.showImage ? 'col-sm-12 col-md-xl-6 flex-col' : 'col-sm-xl-12 flex-col';
  const videoEmbed = customFields?.playVideoInPlace && extractVideoEmbedFromStory(content);

  return (
    <>
      <article className="container-fluid large-promo">
        <div className="row">
          {(!!videoEmbed
            || customFields?.showImage)
          && (
            <div className="col-sm-12 col-md-xl-6 flex-col" style={{ position: isAdmin ? 'relative' : null }}>
              {(!!videoEmbed
                && (
                  <VideoPlayerPresentational
                    id={id}
                    embedMarkup={videoEmbed}
                    enableAutoplay={false}
                    shrinkToFit={customFields?.shrinkToFit}
                    viewportPercentage={customFields?.viewportPercentage}
                  />
                )
              )
              || (
                customFields?.showImage
                && (
                  <div {...searchableField('imageOverrideURL')} suppressContentEditableWarning>
                    <PromoImage
                      content={content}
                      customImageURL={customFields.imageOverrideURL}
                      showPromoLabel
                      promoSize="LG"
                      promoLabelSize="large"
                      imageRatio={customFields.imageRatio}
                      lazyLoad={customFields.lazyLoad}
                    />
                  </div>
                )
              )}
            </div>
          )}
          {(customFields?.showOverline
            || customFields?.showHeadline
            || customFields?.showDescription
            || customFields?.showByline
            || customFields?.showDate)
          && (
            <div className={textClass}>
              {customFields?.showOverline
                ? <Overline story={content} editable />
                : null}
              {customFields?.showHeadline
                ? <PromoHeadline content={content} headingClassName="lg-promo-headline" linkClassName="lg-promo-headline" />
                : null}
              {customFields?.showDescription
                ? <PromoDescription className="description-text" content={content} />
                : null}
              <div className="article-meta">
                {customFields?.showByline
                  ? <Byline content={content} font="Primary" list separator={customFields.showDate} />
                  : null}
                {customFields?.showDate
                  ? <PromoDate content={content} />
                  : null}
              </div>
            </div>
          )}
        </div>
      </article>
      <hr />
    </>
  );
};

const LargePromo = ({ customFields }) => {
  const { isAdmin } = useFusionContext();
  const shouldLazyLoad = customFields?.lazyLoad && !isAdmin;
  if (shouldLazyLoad && isServerSide()) {
    return null;
  }
  return (
    <LazyLoad enabled={shouldLazyLoad}>
      <LargePromoItem customFields={customFields} />
    </LazyLoad>
  );
};

LargePromo.propTypes = {
  customFields: PropTypes.shape({
    itemContentConfig: PropTypes.contentConfig('ans-item').tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
    showOverline: PropTypes.bool.tag({
      label: 'Show overline',
      defaultValue: true,
      group: 'Show promo elements',
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
    ...imageRatioCustomField('imageRatio', 'Art', '4:3'),
    playVideoInPlace: PropTypes.bool.tag({
      label: 'Play video in place',
      group: 'Art',
      defaultValue: false,
    }),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
    ...(videoPlayerCustomFields()),
  }),

};

LargePromo.label = 'Large Promo – Arc Block';

export default LargePromo;
