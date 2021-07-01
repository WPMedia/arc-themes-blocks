import React, {
  useCallback, useEffect, useReducer, useRef, useState,
} from 'react';

import ArticleDate from '@wpmedia/date-block';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getTranslatedPhrases from 'fusion:intl';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';

import { Image } from '@wpmedia/engine-theme-sdk';
import { extractResizedParams, extractImageFromStory } from '@wpmedia/resizer-image-block';
import {
  Byline,
  Heading,
  SecondaryFont,
} from '@wpmedia/shared-styles';
import {
  defaultResultList,
  reduceResultList,
  resolveDefaultPromoElements,
} from './helpers';

const ReadMoreButton = styled.button`
  background-color: ${(props) => props.primaryColor};
  font-family: ${(props) => props.primaryFont};

  &:not(:disabled):not(.disabled):active:hover,
  &:not(:disabled):not(.disabled):hover:hover {
    background-color: ${(props) => props.primaryColor};
  }
`;

const Results = () => {
  const {
    arcSite,
    contextPath,
    customFields,
    deployment,
  } = useFusionContext();

  const {
    listContentConfig: {
      contentService,
      contentConfigValues,
    },
  } = customFields;

  const {
    breakpoints,
    fallbackImage,
    locale,
    primaryLogoAlt,
    resizerURL,
  } = getProperties(arcSite) || {};

  const imageProps = {
    smallWidth: 158,
    smallHeight: 89,
    mediumWidth: 274,
    mediumHeight: 154,
    largeWidth: 274,
    largeHeight: 154,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  };

  const configuredOffset = parseInt(contentConfigValues.offset, 10)
    || parseInt(contentConfigValues.feedOffset, 10)
    || parseInt(contentConfigValues.from, 10)
    || 0;
  const configuredSize = parseInt(contentConfigValues.size, 10)
    || parseInt(contentConfigValues.feedSize, 10)
    || 10;

  const [queryOffset, setQueryOffset] = useState(configuredOffset);
  const listItemRefs = useRef([]);

  const targetFallbackImage = !(fallbackImage.includes('http'))
    ? deployment(`${contextPath}/${fallbackImage}`)
    : fallbackImage;

  const placeholderResizedImageOptions = useContent({
    source: !targetFallbackImage.includes('/resources/') ? 'resize-image-api' : null,
    query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
  });

  const [resultList, alterResultList] = useReducer(reduceResultList, defaultResultList);
  useEffect(() => {
    const topItem = resultList.content_elements[queryOffset];
    if (topItem?._id && listItemRefs.current[topItem?._id]) {
      const focusLink = listItemRefs.current[topItem._id].querySelector('a:not([aria-hidden])');
      if (focusLink) {
        focusLink.focus();
      }
    }
  }, [resultList, queryOffset]);

  const serviceQueryPage = useCallback((requestedOffset = 0) => {
    /*
      This sets up a window view of the data starting from the initial index
      to *twice* the size.  When clicking on the more button, we will render
      the next size worth of items and load the next size from the server.
    */
    switch (contentService) {
      case 'story-feed-query': {
        const size = requestedOffset === configuredOffset
          ? configuredSize * 2
          : configuredSize;
        const offset = requestedOffset === configuredOffset
          ? configuredOffset
          : requestedOffset + configuredSize * 2;
        return { offset, size };
      }
      case 'story-feed-author':
      case 'story-feed-sections':
      case 'story-feed-tag': {
        const feedSize = requestedOffset === configuredOffset
          ? configuredSize * 2
          : configuredSize;
        const feedOffset = requestedOffset === configuredOffset
          ? configuredOffset
          : requestedOffset + configuredSize * 2;
        return { feedOffset, feedSize };
      }
      case 'content-api-collections': {
        const size = requestedOffset === configuredOffset
          ? configuredSize * 2
          : configuredSize;
        const from = requestedOffset === configuredOffset
          ? configuredOffset
          : requestedOffset + configuredSize * 2;
        return { from, size };
      }
      default: { break; }
    }
    return {};
  }, [configuredOffset, configuredSize, contentService]);

  const requestedResultList = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      feature: 'results-list',
      ...serviceQueryPage(queryOffset),
    },
    filter: `{
      count
      next
      content_elements {
        _id,
        type
        display_date
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
        headlines {
          basic
        }
        description {
          basic
        }
        promo_items {
          basic {
            type
            url
            resized_params {
              274x154
              158x89
            }
          }
          lead_art {
            promo_items {
              basic {
                type
                url
                resized_params {
                  274x154
                  158x89
                }
              }
            }
            type
          }
        }
        websites {
          ${arcSite} {
            website_url
          }
        }
      }
    }`,
  });

  useEffect(() => {
    alterResultList({
      type: 'appendUnique',
      data: requestedResultList,
    });
  }, [requestedResultList]);

  const promoElements = resolveDefaultPromoElements(customFields);
  const phrases = getTranslatedPhrases(locale || 'en');

  const viewableElements = resultList?.content_elements
    .slice(0, queryOffset + configuredSize);

  return viewableElements.length > 0 ? (
    <div className="results-list-container">
      {viewableElements.map((element) => {
        const {
          description: { basic: descriptionText } = {},
          display_date: displayDate,
          headlines: { basic: headlineText } = {},
          websites,
        } = element;

        const imageURL = extractImageFromStory(element);
        const url = websites[arcSite].website_url;
        return (
          <div
            className="list-item"
            key={`result-card-${url}`}
            ref={(ref) => {
              listItemRefs.current[element._id] = ref;
            }}
          >
            {(promoElements.showImage)
              ? (
                <div className="results-list--image-container mobile-order-2 mobile-image">
                  <a
                    href={url}
                    title={headlineText}
                    aria-hidden="true"
                    tabIndex="-1"
                  >
                    <Image
                      {...imageProps}
                      url={imageURL !== null ? imageURL : targetFallbackImage}
                      alt={imageURL !== null ? headlineText : primaryLogoAlt}
                      resizedImageOptions={imageURL !== null
                        ? extractResizedParams(element)
                        : placeholderResizedImageOptions}
                    />
                  </a>
                </div>
              )
              : null}
            {(promoElements.showHeadline)
              ? (
                <div className="results-list--headline-container mobile-order-1">
                  <a href={url} title={headlineText}>
                    <Heading className="headline-text">{headlineText}</Heading>
                  </a>
                </div>
              )
              : null }
            {(promoElements.showDescription || promoElements.showDate || promoElements.showByline)
              ? (
                <div className="results-list--description-author-container mobile-order-3">
                  {(promoElements.showDescription && descriptionText)
                    ? (
                      <a href={url} title={headlineText}>
                        <SecondaryFont as="p" className="description-text">
                          {descriptionText}
                        </SecondaryFont>
                      </a>
                    )
                    : null}
                  {(promoElements.showDate || promoElements.showByline)
                    ? (
                      <div className="results-list--author-date">
                        {(promoElements.showByline)
                          ? (
                            <Byline
                              content={element}
                              list
                              separator={promoElements.showDate}
                              font="Primary"
                            />
                          )
                          : null }
                        {(promoElements.showDate)
                          ? <ArticleDate classNames="story-date" date={displayDate} />
                          : null }
                      </div>
                    )
                    : null}
                </div>
              )
              : null }
          </div>
        );
      })}
      {viewableElements.length < resultList?.content_elements.length && (
        <div className="see-more">
          <ReadMoreButton
            type="button"
            onClick={() => setQueryOffset(queryOffset + configuredSize)}
            className="btn btn-sm"
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            primaryColor={getThemeStyle(arcSite)['primary-color']}
            aria-label={phrases.t('results-list-block.see-more-button-aria-label')}
          >
            {phrases.t('results-list-block.see-more-button')}
          </ReadMoreButton>
        </div>
      )}
    </div>
  ) : null;
};

export default Results;
