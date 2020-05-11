import React from 'react';
import Consumer from 'fusion:consumer';
import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import getThemeStyle from 'fusion:themes';
import { Image } from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';
import SearchIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/SearchIcon';
import { HeadlineText, DescriptionText } from './styled-components';
import { extractImage } from './helpers';
import './search-results-list.scss';

@Consumer
class GlobalSearchResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = {
      storedList: {},
      resultList: {},
      page: 1,
      value: '',
    };
  }

  fetchStories() {
    const { globalContent } = this.props;
    const { storedList, page } = this.state;
    // If 'See More' button is pressed for the first time
    if (page === 1) {
      // Set initial list from globalContent data
      storedList.data = globalContent.data;
      storedList.metadata = globalContent.metadata;
    }
    // Get results from new page
    this.state.page += 1;
    this.fetchContent({
      resultList: {
        source: 'search-api',
        query: {
          query: globalContent.metadata.q,
          // eslint-disable-next-line react/destructuring-assignment
          page: this.state.page.toString(),
        },
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
  }

  handleSearch() {
    const { value } = this.state;
    if (value.length > 0) {
      window.location.href = `/search/${value}`;
    }
  }

  render() {
    const { globalContent, arcSite } = this.props;
    const {
      data,
      metadata: { total_hits: totalHits, q: query } = {},
    } = globalContent;
    const {
      resultList: {
        data: moreStories,
      } = {},
    } = this.state;
    const results = moreStories || data;
    return (
      <div>
        <div className="search-container">
          <div>
            <div className="search-icon-container">
              <SearchIcon fill="#979797" />
            </div>
            <input
              type="text"
              placeholder="Enter your search terms here"
              className="search-bar"
              onChange={(evt) => this.setState({ value: evt.target.value })}
            />
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => this.handleSearch()}
            >
              Search
            </button>
          </div>
          {
            data && (
              <p className="search-results-text">
                {`${totalHits} Results for “${query}”`}
              </p>
            )
          }
        </div>
        <div className="results-list-container">
          {
            results && results.length > 0 && results.map((element) => {
              const {
                description: { basic: descriptionText } = {},
                headlines: { basic: headlineText } = {},
                display_date: displayDate,
                credits: { by } = {},
                canonical_url: canonicalUrl,
                promo_items: promoItems,
              } = element;
              const showSeparator = by && by.length !== 0;
              return (
                <div className="list-item" key={`result-card-${canonicalUrl}`}>
                  <a
                    href={canonicalUrl}
                    title={headlineText}
                    className="list-anchor"
                  >
                    {extractImage(promoItems) ? (
                      <Image
                        url={extractImage(promoItems)}
                        alt={headlineText}
                        smallWidth={274}
                        smallHeight={148}
                        mediumWidth={274}
                        mediumHeight={148}
                        largeWidth={274}
                        largeHeight={148}
                      />
                    ) : (
                      <Image
                        url={getProperties(arcSite).fallbackImage}
                        alt={getProperties(arcSite).primaryLogoAlt || 'Placeholder logo'}
                        smallWidth={274}
                        smallHeight={148}
                        mediumWidth={274}
                        mediumHeight={148}
                        largeWidth={274}
                        largeHeight={148}
                        respectAspectRatio
                      />
                    )}
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
                        href={canonicalUrl}
                        title={headlineText}
                        className="list-anchor"
                      >
                        <HeadlineText
                          primaryFont={getThemeStyle(arcSite)['primary-font-family']}
                          className="headline-text"
                        >
                          {headlineText}
                        </HeadlineText>
                      </a>
                      <DescriptionText
                        secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
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
            !!(results && results.length > 0 && results.length < totalHits) && (
              <div className="see-more">
                <button
                  type="button"
                  onClick={() => this.fetchStories()}
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

export default GlobalSearchResultsList;
