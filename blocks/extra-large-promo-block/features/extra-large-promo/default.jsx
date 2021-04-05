import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent, useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { PromoLabel } from '@wpmedia/shared-styles';
import {
  Image,
  extractVideoEmbedFromStory,
  // presentational component does not do data fetching
  VideoPlayer as VideoPlayerPresentational,
  LazyLoad, isServerSide,
} from '@wpmedia/engine-theme-sdk';
import '@wpmedia/shared-styles/scss/_extra-large-promo.scss';
import PlaceholderImage from '@wpmedia/placeholder-image-block';
import {
  extractResizedParams,
  imageRatioCustomField,
  ratiosFor,
  extractImageFromStory,
} from '@wpmedia/resizer-image-block';
import Description from './_children/Description';
import OverlineContainer from './_children/OverlineContainer';
import discoverPromoType from './_children/discover';
import Headline from './_children/Headline';
import BylineContainer from './_children/BylineContainer';
import DateContainer from './_children/DateContainer';

const ExtraLargePromoItem = ({ customFields }) => {
  const { arcSite, id, isAdmin } = useFusionContext();
  const { searchableField } = useEditableContent();

  const content = useContent({
    source: customFields?.itemContentConfig?.contentService ?? null,
    query: customFields?.itemContentConfig?.contentConfigValues
      ? {
        'arc-site': arcSite,
        feature: 'extra-large-promo',
        ...customFields.itemContentConfig.contentConfigValues,
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
                800x600
                800x533
                800x450
                600x450
                600x400
                600x338
                400x300
                400x267
                400x225
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
            400x300
            400x267
            400x225
          }
        }
      }
      website_url
      embed_html
      websites {
        ${arcSite} {
          website_section {
            _id
            name
          }
        }
      }
    }`,
  }) || null;

  let imageConfig = null;
  if ((customFields.imageOverrideURL && customFields.lazyLoad) || isAdmin) {
    imageConfig = 'resize-image-api-client';
  } else if (customFields.imageOverrideURL) {
    imageConfig = 'resize-image-api';
  }

  const customFieldImageResizedImageOptions = useContent({
    source: imageConfig,
    query: { raw_image_url: customFields.imageOverrideURL },
  }) || undefined;

  const promoType = discoverPromoType(content);

  const ratios = ratiosFor('XL', customFields.imageRatio);
  const imageURL = customFields.imageOverrideURL
    ? customFields.imageOverrideURL : extractImageFromStory(content);
  const resizedImageOptions = customFields.imageOverrideURL
    ? customFieldImageResizedImageOptions
    : extractResizedParams(content);

  const videoEmbed = customFields?.playVideoInPlace && extractVideoEmbedFromStory(content);

  return content && (
    <>
      <article className="container-fluid xl-large-promo">
        <div className="row">
          {(customFields.showHeadline || customFields.showDescription
            || customFields.showByline || customFields.showDate)
          && (
            <div className="col-sm-xl-12 flex-col" style={{ position: isAdmin ? 'relative' : null }}>
              <OverlineContainer
                customFields={customFields}
                content={content}
                arcSite={arcSite}
              />
              <Headline
                customFields={customFields}
                content={content}
              />
              {
                (
                  !!videoEmbed && (
                    <VideoPlayerPresentational
                      id={id}
                      embedMarkup={videoEmbed}
                      enableAutoplay={false}
                    />
                  )
                ) || (
                  customFields.showImage
                    && (
                      <a href={content.website_url} aria-hidden="true" tabIndex="-1" {...searchableField('imageOverrideURL')}>
                        {imageURL && resizedImageOptions
                          ? (
                            <Image
                              url={imageURL}
                              alt={content && content.headlines ? content.headlines.basic : ''}
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

                        <PromoLabel type={promoType} />
                      </a>
                    )
                )
              }
              <Description
                customFields={customFields}
                content={content}
              />
              <div className="article-meta">
                <BylineContainer customFields={customFields} content={content} />
                <DateContainer customFields={customFields} content={content} />
              </div>
            </div>
          )}
        </div>
      </article>
      <hr />
    </>
  );
};

const ExtraLargePromo = ({ customFields }) => {
  const { isAdmin } = useFusionContext();
  if (customFields.lazyLoad && isServerSide() && !isAdmin) { // On Server
    return null;
  }
  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <ExtraLargePromoItem customFields={{ ...customFields }} />
    </LazyLoad>
  );
};

ExtraLargePromo.propTypes = {
  customFields: PropTypes.shape({
    itemContentConfig: PropTypes.contentConfig('ans-item').tag(
      {
        group: 'Configure Content',
        label: 'Display Content Info',
      },
    ),
    showOverline: PropTypes.bool.tag(
      {
        label: 'Show overline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showHeadline: PropTypes.bool.tag(
      {
        label: 'Show headline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showImage: PropTypes.bool.tag(
      {
        label: 'Show image',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showDescription: PropTypes.bool.tag(
      {
        label: 'Show description',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showByline: PropTypes.bool.tag(
      {
        label: 'Show byline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showDate: PropTypes.bool.tag(
      {
        label: 'Show date',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
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
  }),
};

ExtraLargePromo.label = 'Extra Large Promo – Arc Block';

export default ExtraLargePromo;
