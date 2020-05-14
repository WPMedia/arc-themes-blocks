/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';

import { Image } from '@wpmedia/engine-theme-sdk';
import PlaceholderImage from '@wpmedia/placeholder-image-block';

import './results-list.scss';
import './desktop-styles.scss';
import './mobile-styles.scss';


function extractImage(promo) {
  return promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;
}

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
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
    };
    this.fetchStories(false);
  }

  fetchStories(additionalStoryAmount) {
    const { customFields: { listContentConfig } } = this.props;
    const { contentService, contentConfigValues } = listContentConfig;
    const { storedList } = this.state;

    if (additionalStoryAmount) {
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
            transform(data) {
              if (data) {
                // Add new data to previous list
                const combinedList = storedList.content_elements.concat(data.content_elements);
                storedList.content_elements = combinedList;
                storedList.next = data.next;
              }
              return storedList;
            },
          },
        });
        // Hide button if no more stories to load
        if (value >= storedList.count) {
          this.state.seeMore = false;
        }
      }
    } else {
      this.fetchContent({
        resultList: {
          source: contentService,
          query: contentConfigValues,
        },
      });
      const { resultList } = this.state;
      this.state.storedList = resultList;
      // Check if there are available stories

      if (resultList?.content_elements) {
        // Hide button if no additional stories from initial content
        if (resultList.content_elements.length >= resultList.count) {
          this.state.seeMore = false;
        }
      }
    }
  }

  render() {
    const { resultList: { content_elements: contentElements = [] } = {}, seeMore } = this.state;
    return (
      <div className="results-list-container">
        {contentElements && contentElements.length > 0 && contentElements.map((element) => {
          const {
            description: { basic: descriptionText } = {},
            headlines: { basic: headlineText } = {},
            display_date: displayDate,
            credits: { by } = {},
            website_url: websiteUrl,
            canonical_url: canonicalUrl,
            promo_items: promoItems,
          } = element;
          const showSeparator = by && by.length !== 0;

          return (
            <div className="list-item" key={`result-card-${canonicalUrl}`}>
              <div className="results-list--image-container">
                <a
                  href={websiteUrl}
                  title={headlineText}
                >
                  {extractImage(promoItems) ? (
                    <Image
                      // results list is 16:9 by default
                      url={extractImage(promoItems)}
                      alt={headlineText}
                      smallWidth={158}
                      smallHeight={89}
                      mediumWidth={274}
                      mediumHeight={154}
                      largeWidth={274}
                      largeHeight={154}
                    />
                  ) : (
                    <PlaceholderImage
                      smallWidth={158}
                      smallHeight={89}
                      mediumWidth={274}
                      mediumHeight={154}
                      largeWidth={274}
                      largeHeight={154}
                    />
                  )}
                </a>
              </div>
              <div className="results-list--headline-container">
                <a
                  href={websiteUrl}
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
              <div className="results-list--description-author-container">
                {descriptionText && (
                  <a
                    href={websiteUrl}
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
                <div className="results-list--author-date">
                  <Byline story={element} stylesFor="list" />
                  {/* The Separator will only be shown if there is at least one author name */}
                  { showSeparator && <p className="dot-separator">&#9679;</p> }
                  <ArticleDate classNames="story-date" date={displayDate} />
                </div>
              </div>
            </div>
          );
        })}
        {
          !!(contentElements && contentElements.length > 0 && seeMore) && (
            <div className="see-more">
              <button
                type="button"
                onClick={() => this.fetchStories(true)}
                className="btn btn-sm"
              >
                See More
                {' '}
                <span className="visuallyHidden">
                  stories about this topic
                </span>
              </button>
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
    listContentConfig: PropTypes.contentConfig('ans-feed'),
  }),
};

export default ResultsList;
