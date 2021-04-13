import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent, useContent } from 'fusion:content';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';

import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import { PromoLabel } from '@wpmedia/shared-styles';
import '@wpmedia/shared-styles/scss/_medium-promo.scss';
import { Image } from '@wpmedia/engine-theme-sdk';
import PlaceholderImage from '@wpmedia/placeholder-image-block';
import {
  extractResizedParams,
  imageRatioCustomField,
  ratiosFor,
  extractImageFromStory,
} from '@wpmedia/resizer-image-block';
import discoverPromoType from './_children/discover';

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const MediumPromoItem = ({ customFields }) => {
  const { arcSite, isAdmin } = useFusionContext();
  const { editableContent, searchableField } = useEditableContent();

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

  const headlineText = content && content.headlines ? content.headlines.basic : null;
  const descriptionText = content && content.description ? content.description.basic : null;
  const showSeparator = content?.credits?.by && content.credits.by.length !== 0;
  const byLineArray = content?.credits?.by
    && content.credits.by.length !== 0 ? content.credits.by : null;
  const dateText = content?.display_date || null;

  const promoType = discoverPromoType(content);

  const headlineTmpl = () => {
    if (customFields.showHeadline && headlineText) {
      return (
        <a href={content.website_url} className="md-promo-headline">
          <HeadlineText
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            className="md-promo-headline-text"
            {...editableContent(content, 'headlines.basic')}
            suppressContentEditableWarning
          >
            {headlineText}
          </HeadlineText>
        </a>
      );
    }
    return null;
  };

  const descriptionTmpl = () => {
    if (customFields.showDescription && descriptionText) {
      return (
        <DescriptionText
          secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
          className="description-text"
          {...editableContent(content, 'description.basic')}
          suppressContentEditableWarning
        >
          {descriptionText}
        </DescriptionText>
      );
    }
    return null;
  };

  const byLineTmpl = () => {
    if (customFields.showByline && byLineArray) {
      return (
        <>
          <Byline story={content} stylesFor="list" />
          {showSeparator && <p className="dot-separator">&#9679;</p>}
        </>
      );
    }
    return null;
  };

  const dateTmpl = () => {
    if (customFields.showDate && dateText) {
      return (
        <>
          <ArticleDate date={dateText} />
        </>
      );
    }
    return null;
  };

  const ratios = ratiosFor('MD', customFields.imageRatio);
  const imageURL = customFields.imageOverrideURL
    ? customFields.imageOverrideURL : extractImageFromStory(content);
  const resizedImageOptions = customFields.imageOverrideURL
    ? customFieldImageResizedImageOptions
    : extractResizedParams(content);

  return content ? (
    <>
      <article className="container-fluid medium-promo">
        <div className={`medium-promo-wrapper ${customFields.showImage ? 'md-promo-image' : ''}`} style={{ position: isAdmin ? 'relative' : null }}>
          {customFields.showImage
          && (
            <a
              className="image-link"
              href={content.website_url}
              aria-hidden="true"
              tabIndex="-1"
              {...searchableField('imageOverrideURL')}
            >
              {
                imageURL && resizedImageOptions
                  ? (
                    <Image
                      url={imageURL}
                      alt={content && content.headlines ? content.headlines.basic : ''}
                      // medium is 16:9
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
                  )
                }
              <PromoLabel type={promoType} />
            </a>
          )}
          {/* customFields.headlinePosition === 'below' && */
          (customFields.showHeadline || customFields.showDescription
            || customFields.showByline || customFields.showDate)
          && (
            <>
              {headlineTmpl()}
              {descriptionTmpl()}
              <div className="article-meta">
                {byLineTmpl()}
                {dateTmpl()}
              </div>
            </>
          )
        }
        </div>
      </article>
      <hr />
    </>
  ) : null;
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
  }),
};

MediumPromo.label = 'Medium Promo – Arc Block';

export default MediumPromo;
