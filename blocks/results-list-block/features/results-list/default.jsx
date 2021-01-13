/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';

import { Image } from '@wpmedia/engine-theme-sdk';
import { extractResizedParams } from '@wpmedia/resizer-image-block';
import { resolveDefaultPromoElements, fetchStoriesTransform } from './helpers';

// shared with search results list
// to modify, go to the shared styles block
import '@wpmedia/shared-styles/scss/_results-list.scss';
import '@wpmedia/shared-styles/scss/_results-list-desktop.scss';
import '@wpmedia/shared-styles/scss/_results-list-mobile.scss';

function extractImage(promo) {
  return promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;
}

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const ReadMoreButton = styled.button`
  background-color: ${(props) => props.primaryColor};

  &:not(:disabled):not(.disabled):active:hover,
  &:not(:disabled):not(.disabled):hover:hover {
    background-color: ${(props) => props.primaryColor}; 
  }
`;

@Consumer
class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = {
      storedList: {},
      resultList: {},
      seeMore: true,
      placeholderResizedImageOptions: {},
    };
    this.phrases = getTranslatedPhrases(getProperties(props.arcSite).locale || 'en');
    this.fetchPlaceholder();
  }

  componentDidMount() {
    this.fetchStories(false);
  }

  getFallbackImageURL() {
    const { arcSite, deployment, contextPath } = this.props;
    let targetFallbackImage = getProperties(arcSite).fallbackImage;

    if (!targetFallbackImage.includes('http')) {
      targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
    }

    return targetFallbackImage;
  }

  fetchPlaceholder() {
    const targetFallbackImage = this.getFallbackImageURL();

    if (!targetFallbackImage.includes('/resources/')) {
      this.fetchContent({
        placeholderResizedImageOptions: {
          source: 'resize-image-api',
          query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
        },
      });
    }
  }

  fetchStories(additionalStoryAmount) {
    const { customFields: { listContentConfig } } = this.props;
    const { contentService, contentConfigValues } = listContentConfig;
    if (additionalStoryAmount) {
      const { storedList } = this.state;
      // Check for next value
      if (storedList.next) {
        // Determine content service type
        let value;
        switch (listContentConfig.contentService) {
          case 'story-feed-query':
            value = parseInt(contentConfigValues.size, 10);
            contentConfigValues.offset = (storedList.next).toString();
            value += storedList.next;
            break;
          case 'story-feed-author':
          case 'story-feed-sections':
          case 'story-feed-tag':
            value = parseInt(contentConfigValues.feedSize, 10);
            contentConfigValues.feedOffset = (storedList.next).toString();
            value += storedList.next;
            break;
          default:
            break;
        }
        this.fetchContent({
          resultList: {
            source: contentService,
            query: contentConfigValues,
            transform: (data) => fetchStoriesTransform(data, storedList),
          },
        });
        // Hide button if no more stories to load
        if (value >= storedList.count) {
          this.state.seeMore = false;
        }
      } else if (listContentConfig.contentService === 'content-api-collections') {
        let from = parseInt(contentConfigValues.from, 10) || 0;
        const size = parseInt(contentConfigValues.size, 10) || 10;
        contentConfigValues.from = String(from + size);
        this.fetchContent({
          resultList: {
            source: contentService,
            query: contentConfigValues,
            transform: (data) => fetchStoriesTransform(data, storedList),
          },
        });

        const query = { ...contentConfigValues };
        from = parseInt(contentConfigValues.from, 10) || 0;
        query.from = String(from + size);
        this.fetchContent({
          seeMore: {
            source: contentService,
            query,
            transform: (data) => !!(data?.content_elements?.length),
          },
        });
      }
    } else {
      const { fetched } = this.getContent(listContentConfig.contentService, contentConfigValues);
      fetched.then((response) => {
        this.setState({ resultList: response, storedList: response });
        if (response?.content_elements
          && response?.count
          && response.content_elements.length >= response.count) {
          this.setState({ seeMore: false });
        }
      });
      if (listContentConfig.contentService === 'content-api-collections') {
        const query = { ...contentConfigValues };
        const from = parseInt(contentConfigValues.from, 10) || 0;
        const size = parseInt(contentConfigValues.size, 10) || 10;
        query.from = String(from + size);
        const { fetched: nextPage } = this.getContent('content-api-collections', query);
        nextPage.then((data) => {
          this.setState({ seeMore: !!(data?.content_elements?.length) });
        });
      }
    }
  }

  render() {
    const {
      arcSite,
      customFields,
    } = this.props;
    const {
      resultList: { content_elements: contentElements = [] } = {}, seeMore,
      placeholderResizedImageOptions,
    } = this.state;
    const targetFallbackImage = this.getFallbackImageURL();
    const promoElements = resolveDefaultPromoElements(customFields);

    return (
      <div className="results-list-container">
        {contentElements && contentElements.length > 0 && contentElements.map((element) => {
          const {
            description: { basic: descriptionText } = {},
            headlines: { basic: headlineText } = {},
            display_date: displayDate,
            credits: { by } = {},
            promo_items: promoItems,
            websites,
          } = element;

          if (!websites[arcSite]) {
            return null;
          }

          const showSeparator = by && by.length !== 0;
          const url = websites[arcSite].website_url;
          return (
            <div className="list-item" key={`result-card-${url}`}>
              { promoElements.showImage && (
                <div className="results-list--image-container mobile-order-2 mobile-image">
                  <a
                    href={url}
                    title={headlineText}
                  >
                    {extractImage(promoItems) ? (
                      <Image
                        // results list is 16:9 by default
                        resizedImageOptions={extractResizedParams(element)}
                        url={extractImage(element.promo_items)}
                        alt={headlineText}
                        smallWidth={158}
                        smallHeight={89}
                        mediumWidth={274}
                        mediumHeight={154}
                        largeWidth={274}
                        largeHeight={154}
                        breakpoints={getProperties(arcSite)?.breakpoints}
                        resizerURL={getProperties(arcSite)?.resizerURL}
                      />
                    ) : (
                      <Image
                        smallWidth={158}
                        smallHeight={89}
                        mediumWidth={274}
                        mediumHeight={154}
                        largeWidth={274}
                        largeHeight={154}
                        alt={getProperties(arcSite).primaryLogoAlt || 'Placeholder logo'}
                        url={targetFallbackImage}
                        breakpoints={getProperties(arcSite)?.breakpoints}
                        resizedImageOptions={placeholderResizedImageOptions}
                        resizerURL={getProperties(arcSite)?.resizerURL}

                      />
                    )}
                  </a>
                </div>
              )}
              { promoElements.showHeadline && (
                <div className="results-list--headline-container mobile-order-1">
                  <a
                    href={url}
                    title={headlineText}
                  >
                    <HeadlineText
                      primaryFont={getThemeStyle(this.arcSite)['primary-font-family']}
                      className="headline-text"
                    >
                      {headlineText}
                    </HeadlineText>
                  </a>
                </div>
              )}
              { (
                promoElements.showDescription
                  || promoElements.showDate
                  || promoElements.showByline
              ) && (
                <div className="results-list--description-author-container mobile-order-3">
                  {promoElements.showDescription && descriptionText && (
                    <a
                      href={url}
                      title={headlineText}
                    >
                      <DescriptionText
                        secondaryFont={getThemeStyle(this.arcSite)['secondary-font-family']}
                        className="description-text"
                      >
                        {descriptionText}
                      </DescriptionText>
                    </a>
                  )}
                  { (promoElements.showDate || promoElements.showByline) && (
                    <div className="results-list--author-date">
                      { promoElements.showByline && <Byline story={element} stylesFor="list" /> }
                      {/* The Separator will only be shown if there is at least one author name */}
                      { promoElements.showByline && showSeparator && promoElements.showDate && <p className="dot-separator">&#9679;</p> }
                      { promoElements.showDate && <ArticleDate classNames="story-date" date={displayDate} /> }
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {
          !!(contentElements && contentElements.length > 0 && seeMore) && (
            <div className="see-more">
              <ReadMoreButton
                type="button"
                onClick={() => this.fetchStories(true)}
                className="btn btn-sm"
                primaryColor={getThemeStyle(arcSite)['primary-color']}
              >
                {this.phrases.t('results-list-block.see-more-button')}
                {' '}
                <span className="visuallyHidden">
                  stories about this topic
                </span>
              </ReadMoreButton>
            </div>
          )
        }
      </div>
    );
  }
}

ResultsList.label = 'Results List – Arc Block';

ResultsList.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed').tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
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
  }),
};

export default ResultsList;
