import React from 'react';
import styled from 'styled-components';
import Consumer from 'fusion:consumer';
import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import getThemeStyle from 'fusion:themes';
import { Image } from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import SearchIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/SearchIcon';
import { extractResizedParams } from '@wpmedia/resizer-image-block';

import { HeadlineText, DescriptionText } from './styled-components';
import { extractImage } from './helpers';
import '@wpmedia/shared-styles/scss/_results-list.scss';
import '@wpmedia/shared-styles/scss/_results-list-desktop.scss';
import '@wpmedia/shared-styles/scss/_results-list-mobile.scss';
import './search-results-list.scss';


const StyledInput = styled.input`
  font-family: ${(props) => props.primaryFont};
`;

const StyledButton = styled.button`
  && {
    background-color: ${(props) => props.primaryColor};
    font-family: ${(props) => props.primaryFont};
  }
`;

@Consumer
class GlobalSearchResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    const query = props.globalContent.metadata && props.globalContent.metadata.q;
    this.state = {
      storedList: {},
      resultList: {},
      page: 1,
      value: query || '',
      placeholderResizedImageOptions: {},
    };
    this.locale = getProperties(this.arcSite).locale || 'en';
    this.phrases = getTranslatedPhrases(this.locale);
    this.fetchPlaceholder();
  }

  getFallbackImageURL() {
    const { arcSite, deployment, contextPath } = this.props;
    let targetFallbackImage = getProperties(arcSite).fallbackImage;

    if (targetFallbackImage && !targetFallbackImage.includes('http')) {
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
      value,
      placeholderResizedImageOptions,
    } = this.state;

    const targetFallbackImage = this.getFallbackImageURL();
    const results = moreStories || data;

    return (
      <div>
        <div className="search-container">
          <div>
            <div className="search-icon-container">
              <SearchIcon fill="#979797" />
            </div>
            <StyledInput
              type="text"
              placeholder="Enter your search terms"
              value={value}
              className="search-bar"
              onChange={(evt) => this.setState({ value: evt.target.value })}
              primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            />
            <StyledButton
              type="button"
              className="btn btn-sm"
              primaryColor={getThemeStyle(arcSite)['primary-color']}
              primaryFont={getThemeStyle(arcSite)['primary-font-family']}
              onClick={() => this.handleSearch()}
            >
              {this.phrases.t('search-results-block.search-button')}
            </StyledButton>
          </div>
          {
            data && (
              <p className="search-results-text">
                {this.phrases.t('search-results-block.search-result-number', { smart_count: totalHits, searchTerm: query })}
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
                promo_items: promoItems,
                websites,
              } = element;
              const showSeparator = by && by.length !== 0;
              if (!websites[arcSite]) {
                return null;
              }
              const url = websites[arcSite].website_url;
              return (
                <div className="list-item" key={`result-card-${url}`}>
                  <div className="results-list--image-container">
                    <a
                      href={url}
                      title={headlineText}
                      className="list-anchor"
                    >
                      {extractImage(promoItems) ? (
                        <Image
                          resizedImageOptions={extractResizedParams(element)}
                          url={extractImage(promoItems)}
                          alt={headlineText}
                          smallWidth={274}
                          smallHeight={154}
                          mediumWidth={274}
                          mediumHeight={154}
                          largeWidth={274}
                          largeHeight={154}
                          breakpoints={getProperties(arcSite)?.breakpoints}
                          resizerURL={getProperties(arcSite)?.resizerURL}
                        />
                      ) : (
                        <Image
                          smallWidth={274}
                          smallHeight={154}
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
                  <div className="results-list--headline-container">
                    <a
                      href={url}
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
            !!(results && results.length > 0 && results.length < totalHits) && (
              <div className="see-more">
                <StyledButton
                  type="button"
                  onClick={() => this.fetchStories()}
                  className="btn btn-sm"
                  primaryColor={getThemeStyle(arcSite)['primary-color']}
                  primaryFont={getThemeStyle(arcSite)['primary-font-family']}
                >
                  {this.phrases.t('search-results-block.see-more-button')}
                  {' '}
                  {this.locale === 'en' && (
                    <span className="visuallyHidden">
                      stories about this topic
                    </span>
                  )}
                </StyledButton>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default GlobalSearchResultsList;
