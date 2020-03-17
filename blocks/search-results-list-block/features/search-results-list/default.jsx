import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React, { Component } from 'react';
import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { Image } from '@wpmedia/engine-theme-sdk';
import './search-results-list.scss';

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
class SearchResultsList extends Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = {
      storedList: {},
      resultList: {},
      value: '',
      page: 1,
      searchTerm: '',
    };
  }

  fetchStories(additionalStoryAmount) {
    const { customFields: { searchContentConfig } } = this.props;
    const { value, storedList } = this.state;

    searchContentConfig.contentConfigValues.query = value;
    // If 'See More' button is pressed
    if (additionalStoryAmount) {
      this.state.page += 1;
      const { page } = this.state;
      searchContentConfig.contentConfigValues.page = page.toString();
      this.fetchContent({
        resultList: {
          source: searchContentConfig.contentService,
          query: searchContentConfig.contentConfigValues,
          transform(results) {
            if (results) {
              // Add new data to previous list
              const combinedData = storedList.data.concat(results.data);
              storedList.data = combinedData;
              storedList.metadata = results.metadata;
            }
            return storedList;
          },
        },
      });
    } else {
      this.state.page = 1;
      searchContentConfig.contentConfigValues.page = '1';
      this.fetchContent({
        resultList: {
          source: searchContentConfig.contentService,
          query: searchContentConfig.contentConfigValues,
          transform(results) {
            if (results) {
              // Initializes storedList
              storedList.data = results.data;
              storedList.metadata = results.metadata;
            }
            return results;
          },
        },
      });
    }
    this.state.searchTerm = value;
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
    const {
      resultList: {
        data,
        metadata: { total_hits: totalHits } = {},
      } = {},
      searchTerm,
    } = this.state;
    return (
      <div>
        <div className="search-container">
          <div>
            <input
              type="text"
              placeholder="&#xF002;   Search Query."
              className="search-bar"
              onChange={(evt) => this.setState({ value: evt.target.value })}
            />
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => this.fetchStories(false)}
            >
              Search
            </button>
          </div>
          {
            data && (
              <p className="search-results-text">
                {`${totalHits} Results for “${searchTerm}”`}
              </p>
            )
          }
        </div>
        <div className="results-list-container">
          {
            data && data.length > 0 && data.map((element) => {
              const {
                description: { basic: descriptionText } = {},
                headlines: { basic: headlineText } = {},
                display_date: displayDate,
                credits: { by } = {},
                website_url: websiteUrl,
              } = element;
              const showSeparator = by && by.length !== 0;
              return (
                <div className="list-item" key={`result-card-${element.canonical_url}`}>
                  <a
                    href={this.constructHref(websiteUrl)}
                    title={headlineText}
                    className="list-anchor"
                  >
                    {extractImage(element.promo_items) ? (
                      <Image
                        url={extractImage(element.promo_items)}
                        alt={headlineText}
                        smallWidth={274}
                        smallHeight={148}
                        mediumWidth={274}
                        mediumHeight={148}
                        largeWidth={274}
                        largeHeight={148}
                      />
                    ) : <div className="image-placeholder" />}
                  </a>
                  <div
                    className={
                    descriptionText
                      ? 'headline-description'
                      : 'headline-description headline-description-spacing'
                  }
                  >
                    <div>
                      <a
                        href={this.constructHref(websiteUrl)}
                        title={headlineText}
                        className="list-anchor"
                      >
                        <HeadlineText
                          primaryFont={getThemeStyle(this.arcSite)['primary-font-family']}
                          className="headline-text"
                        >
                          {headlineText}
                        </HeadlineText>
                      </a>
                      <DescriptionText
                        secondaryFont={getThemeStyle(this.arcSite)['secondary-font-family']}
                        className="description-text"
                      >
                        {descriptionText}
                      </DescriptionText>
                    </div>
                    <div className="author-date">
                      <Byline story={element} stylesFor="list" />
                      {/* The Separator will only be shown if there is at least one author name */}
                      { showSeparator && <p className="dot-separator">&#9679;</p> }
                      <ArticleDate classNames="story-date" date={displayDate} />
                    </div>
                  </div>
                </div>
              );
            })
          }
          {
            !!(data && data.length > 0 && data.length < totalHits) && (
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
      </div>
    );
  }
}

SearchResultsList.label = 'Search Results List – Arc Block';

SearchResultsList.propTypes = {
  customFields: PropTypes.shape({
    searchContentConfig: PropTypes.contentConfig().tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
  }),
};

export default SearchResultsList;
