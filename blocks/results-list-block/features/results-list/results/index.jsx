import React, {
  createRef, useCallback, useEffect, useReducer, useState,
} from 'react';

import ArticleDate from '@wpmedia/date-block';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getTranslatedPhrases from 'fusion:intl';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';

import { Image, isServerSide } from '@wpmedia/engine-theme-sdk';
import { extractResizedParams, extractImageFromStory } from '@wpmedia/resizer-image-block';
import {
  Byline,
  Heading,
  SecondaryFont,
} from '@wpmedia/shared-styles';
import {
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

const ResultsItem = React.memo(React.forwardRef(({
  arcSite,
  element,
  promoElements,
  imageProps,
  targetFallbackImage,
  placeholderResizedImageOptions,
}, ref) => {
  const {
    description: { basic: descriptionText } = {},
    display_date: displayDate,
    headlines: { basic: headlineText } = {},
    websites,
  } = element;

  const imageURL = extractImageFromStory(element);
  const url = websites[arcSite].website_url;
  return (
    <div className="list-item" ref={ref}>
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
                alt={imageURL !== null ? headlineText : imageProps.primaryLogoAlt}
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
}));

const Results = () => {
  const {
    arcSite,
    contextPath,
    customFields,
    deployment,
    isAdmin,
  } = useFusionContext();

  const {
    lazyLoad,
    listContentConfig: {
      contentService,
      contentConfigValues,
    },
  } = customFields;

  const [{
    breakpoints,
    fallbackImage,
    locale,
    primaryLogoAlt,
    resizerURL,
  }] = useState(getProperties(arcSite) || {});

  const [imageProps] = useState({
    smallWidth: 158,
    smallHeight: 89,
    mediumWidth: 274,
    mediumHeight: 154,
    largeWidth: 274,
    largeHeight: 154,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  });

  const [configuredOffset] = useState(
    parseInt(contentConfigValues.offset, 10)
    || parseInt(contentConfigValues.feedOffset, 10)
    || parseInt(contentConfigValues.from, 10)
    || 0,
  );
  const [configuredSize] = useState(
    parseInt(contentConfigValues.size, 10)
    || parseInt(contentConfigValues.feedSize, 10)
    || 10,
  );

  const [queryOffset, setQueryOffset] = useState(configuredOffset);

  const [targetFallbackImage] = useState(
    !(fallbackImage.includes('http'))
      ? deployment(`${contextPath}/${fallbackImage}`)
      : fallbackImage,
  );

  const placeholderResizedImageOptions = useContent({
    source: !targetFallbackImage.includes('/resources/') ? 'resize-image-api' : null,
    query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
  });

  const [isServerSideLazy] = useState(lazyLoad && isServerSide() && !isAdmin);

  const serviceQueryPage = useCallback((requestedOffset = 0) => {
    /*
      This sets up a window view of the data starting from the initial index
      to *twice* the size.  When clicking on the more button, we will render
      the next size worth of items and load the next size from the server.
    */
    const size = requestedOffset === configuredOffset
      ? configuredSize * 2
      : configuredSize;
    const offset = requestedOffset === configuredOffset
      ? configuredOffset
      : requestedOffset + configuredSize;
    switch (contentService) {
      case 'story-feed-query': {
        return { offset, size };
      }
      case 'story-feed-author':
      case 'story-feed-sections':
      case 'story-feed-tag': {
        return { feedOffset: offset, feedSize: size };
      }
      case 'content-api-collections': {
        return { from: offset, size };
      }
      default: { break; }
    }
    return {};
  }, [configuredOffset, configuredSize, contentService]);

  const requestedResultList = useContent({
    source: isServerSideLazy ? null : contentService,
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

  const [resultList, alterResultList] = useReducer(reduceResultList, requestedResultList);

  useEffect(() => {
    if (requestedResultList) {
      alterResultList({
        type: 'appendUnique',
        data: requestedResultList,
      });
    }
  }, [requestedResultList]);

  const [elementRefs, setElementRefs] = useState([]);
  const [focalElement, setFocalElement] = useState(null);
  useEffect(() => {
    setElementRefs((existingRefs) => {
      const refArray = existingRefs.concat(
        resultList.content_elements
          .map(() => createRef()),
      );
      if (queryOffset !== configuredOffset) { // ignore the first item for focus purposes
        const topItem = queryOffset - configuredOffset;
        if (refArray[topItem]) {
          setFocalElement(refArray[topItem]);
        }
      }
      return refArray;
    });
  }, [configuredOffset, queryOffset, resultList]);

  useEffect(() => {
    if (focalElement?.current) {
      const focusLink = focalElement.current.querySelector('a:not([aria-hidden])');
      if (focusLink) {
        focusLink.focus();
      }
    }
  }, [focalElement]);

  const [promoElements] = useState(resolveDefaultPromoElements(customFields));
  const [phrases] = useState(getTranslatedPhrases(locale || 'en'));

  const viewableElements = resultList?.content_elements
    .slice(0, queryOffset + configuredSize - configuredOffset);

  return (viewableElements?.length > 0 && !isServerSideLazy) ? (
    <div className="results-list-container">
      {viewableElements.map((element, index) => (
        <ResultsItem
          key={`result-card-${element._id}`}
          ref={elementRefs[index]}
          arcSite={arcSite}
          element={element}
          promoElements={promoElements}
          imageProps={imageProps}
          targetFallbackImage={targetFallbackImage}
          placeholderResizedImageOptions={placeholderResizedImageOptions}
        />
      ))}
      {(viewableElements.length < resultList?.content_elements.length
        || requestedResultList?.content_elements?.length > 0
      ) && (
        <div className="see-more">
          <ReadMoreButton
            type="button"
            onClick={() => setQueryOffset((oldOffset) => oldOffset + configuredSize)}
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
