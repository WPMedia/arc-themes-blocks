import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
// import Byline from '@wpmedia/byline-block';
// import ArticleDate from '@wpmedia/date-block';
// import styled from 'styled-components';
// import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
// import { Image } from '@wpmedia/engine-theme-sdk';
import './search-results-list.scss';

// function extractImage(promo) {
//   return promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;
// }

// const HeadlineText = styled.h2`
//   font-family: ${(props) => props.primaryFont};
// `;

// const DescriptionText = styled.p`
//   font-family: ${(props) => props.secondaryFont};
// `;

@Consumer
class SearchResultsList extends Component {
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
          case 'story-feed-author':
            value = parseInt(contentConfigValues.feedSize, 10);
            contentConfigValues.feedOffset = (storedList.next).toString();
            value += storedList.next;
            break;
          case 'story-feed-query':
            value = parseInt(contentConfigValues.size, 10);
            contentConfigValues.offset = (storedList.next).toString();
            value += storedList.next;
            break;
          case 'story-feed-sections':
            value = parseInt(contentConfigValues.feedSize, 10);
            contentConfigValues.feedOffset = (storedList.next).toString();
            value += storedList.next;
            break;
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
      if (resultList.content_elements) {
        // Hide button if no additional stories from initial content
        if (resultList.content_elements.length >= resultList.count) {
          this.state.seeMore = false;
        }
      }
    }
  }

  constructHref(websiteUrl) {
    const { arcSite } = this.props;
    const {
      websiteDomain,
    } = getProperties(arcSite);
    return (typeof window !== 'undefined' && window.location.hostname === 'localhost')
      ? `https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/${websiteUrl}`
      : `${websiteDomain}/${websiteUrl}`;
  }

  render() {
    // const { resultList: { content_elements: contentElements = [] } = {}, seeMore } = this.state;
    return (
      <div className="results-list-container">
        <div className="search-container">
          <form action="/action_page.php">
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

SearchResultsList.label = 'Search Results List – Arc Block';

SearchResultsList.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed'),
  }),
};

export default SearchResultsList;
