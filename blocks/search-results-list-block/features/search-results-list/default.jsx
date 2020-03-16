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
      resultList: {},
      value: '',
      page: 0
    };
  }

  fetchStories() {
    const { customFields: { searchContentConfig } } = this.props;
    // this.state.page += 1
    // const { contentService, contentConfigValues } = listContentConfig;
    console.log('before', searchContentConfig.contentConfigValues.query, this.state.value);
    searchContentConfig.contentConfigValues.query = this.state.value;
    // searchContentConfig.contentConfigValues.query = this.state.page

    this.fetchContent({
      resultList: {
        source: searchContentConfig.contentService,
        query: searchContentConfig.contentConfigValues,
      },
    });


    console.log('after', searchContentConfig.contentConfigValues.query);
    setTimeout(() => {
      console.log('result', this.state.resultList);
    }, 1000);
    
    console.log('within', searchContentConfig.contentService, searchContentConfig.contentConfigValues);
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
    const { resultList: { data, metadata: { total_hits: totalHits } = {} } = {}, value } = this.state;
    return (
      <div>
        <div className="search-container">
          <form action="/action_page.php" style={{ display: 'flex' }}>
            <input type="text" placeholder="&#xF002; Search Query." className="search-bar" onChange={(evt) => this.setState({ value: evt.target.value })} />
            <button type="button" className="btn btn-sm" onClick={() => this.fetchStories()}>Submit</button>
          </form>
          {
            data && (
              <p className="search-results-text">
                {`${totalHits} Results for “${value}”`}
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
        </div>
      </div>
    );
  }
}

SearchResultsList.label = 'Search Results List – Arc Block';

// SearchResultsList.propTypes = {
//   customFields: PropTypes.shape({
//     listContentConfig: PropTypes.contentConfig('ans-feed'),
//   }),
// };
SearchResultsList.propTypes = {
  customFields: PropTypes.shape({
    searchContentConfig: PropTypes.contentConfig().tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
  }),
};

export default SearchResultsList;
