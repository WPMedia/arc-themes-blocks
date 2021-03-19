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
import { Image, LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
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
        ...customFields.itemContentConfig.contentConfigValues,
      }
      : null,
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
              {...searchableField({
                imageOverrideURL: 'url',
                imageOverrideAlt: 'alt_text',
              })}
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
    imageOverrideAlt: PropTypes.string.tag({
      label: 'Image Alt',
      group: 'Image',
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
