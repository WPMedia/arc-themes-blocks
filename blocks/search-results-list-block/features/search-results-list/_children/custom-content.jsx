import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import React from 'react';
import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import PlaceholderImage from '@wpmedia/placeholder-image-block';
import getThemeStyle from 'fusion:themes';
import { Image } from '@wpmedia/engine-theme-sdk';
import { extractResizedParams } from '@wpmedia/resizer-image-block';
import { resizerURL } from 'fusion:environment';
import getProperties from 'fusion:properties';
import SearchIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/SearchIcon';
import { HeadlineText, DescriptionText } from './styled-components';
import { extractImage } from './helpers';
import './search-results-list.scss';

@Consumer
class CustomSearchResultsList extends React.Component {
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

  render() {
    const { arcSite } = this.props;
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
                canonical_url: canonicalUrl,
                promo_items: promoItems,
              } = element;
              const resizedImageOptions = extractResizedParams(element);
              const showSeparator = by && by.length !== 0;
              return (
                <div className="list-item" key={`result-card-${canonicalUrl}`}>
                  <div className="results-list--image-container">
                    <a
                      href={canonicalUrl}
                      title={headlineText}
                      className="list-anchor"
                    >
                      {extractImage(promoItems) ? (
                        <Image
                          url={extractImage(promoItems)}
                          alt={headlineText}
                          // todo: height changed slightly
                          // will have to modify blocks.json to show
                          smallWidth={274}
                          smallHeight={148}
                          mediumWidth={274}
                          mediumHeight={148}
                          largeWidth={274}
                          largeHeight={148}
                          resizedImageOptions={resizedImageOptions}
                          resizerURL={resizerURL}
                          breakpoints={getProperties(arcSite)?.breakpoints}
                        />
                      ) : (
                        <PlaceholderImage
                          smallWidth={274}
                          smallHeight={148}
                          mediumWidth={274}
                          mediumHeight={148}
                          largeWidth={274}
                          largeHeight={148}
                        />
                      )}
                    </a>
                  </div>
                  <div className="results-list--headline-container">
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
                  </div>
                  <div className="results-list--description-author-container">
                    <DescriptionText
                      secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
                      className="description-text"
                    >
                      {descriptionText}
                    </DescriptionText>
                    <div className="results-list--author-date">
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

CustomSearchResultsList.propTypes = {
  customFields: PropTypes.shape({
    searchContentConfig: PropTypes.contentConfig().tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
  }),
};

export default CustomSearchResultsList;
