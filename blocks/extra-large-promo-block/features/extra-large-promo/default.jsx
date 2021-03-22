import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent, useContent } from 'fusion:content';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';

import { useFusionContext } from 'fusion:context';
import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import Overline from '@wpmedia/overline-block';
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
import discoverPromoType from './_children/discover';

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const ExtraLargePromoItem = ({ customFields }) => {
  const { arcSite, id } = useFusionContext();
  const { editableContent } = useEditableContent();

  const content = useContent({
    source: customFields?.itemContentConfig?.contentService ?? null,
    query: customFields?.itemContentConfig?.contentConfigValues
      ? { 'arc-site': arcSite, ...customFields.itemContentConfig.contentConfigValues }
      : null,
  }) || null;

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

  const { website_section: websiteSection } = content?.websites?.[arcSite] ?? {
    website_section: null,
  };
  const headlineText = content && content.headlines ? content.headlines.basic : null;
  const descriptionText = content && content.description ? content.description.basic : null;
  const showSeparator = content && content.credits && content.credits.by
    && content.credits.by.length !== 0;
  const byLineArray = (content && content.credits && content.credits.by
    && content.credits.by.length !== 0) ? content.credits.by : null;
  const dateText = content && content.display_date ? content.display_date : null;
  const overlineDisplay = (content?.label?.basic?.display ?? null)
    || (content?.websites?.[arcSite] && websiteSection)
    || false;
  const promoType = discoverPromoType(content);

  const overlineTmpl = () => {
    if (customFields.showOverline && overlineDisplay) {
      return (
        (
          <Overline
            className="overline"
            story={content}
            editable
          />
        )
      );
    }
    return null;
  };

  const headlineTmpl = () => {
    if (customFields.showHeadline && headlineText) {
      return (
        <a href={content.website_url} className="xl-promo-headline">
          <HeadlineText
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            className="xl-promo-headline"
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
          { showSeparator && <p className="dot-separator">&#9679;</p> }
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
            <div className="col-sm-xl-12 flex-col">
              {overlineTmpl()}
              {headlineTmpl()}
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
                      <a href={content.website_url} aria-hidden="true" tabIndex="-1">
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
              {descriptionTmpl()}
              <div className="article-meta">
                {byLineTmpl()}
                {dateTmpl()}
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
