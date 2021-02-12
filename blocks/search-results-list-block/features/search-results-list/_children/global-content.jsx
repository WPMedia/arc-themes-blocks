import React from 'react';
import styled from 'styled-components';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import SearchIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/SearchIcon';
import { extractResizedParams } from '@wpmedia/resizer-image-block';

import SearchResult from './search-result';
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
    this.customSearchAction = props.customSearchAction || null;
  }

  handleSearch() {
    const { value } = this.state;
    if (this.customSearchAction && value.length > 0) {
      this.customSearchAction(value);
    } else if (value.length > 0) {
      window.location.href = `/search/${value}`;
    }
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
    const { promoElements } = this.props;

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
              const resizedImageOptions = extractImage(element.promoItems)
                ? extractResizedParams(element)
                : placeholderResizedImageOptions;

              return (
                <SearchResult
                  key={`result-card-${element._id}`}
                  element={element}
                  arcSite={arcSite}
                  targetFallbackImage={targetFallbackImage}
                  placeholderResizedImageOptions={placeholderResizedImageOptions}
                  resizedImageOptions={resizedImageOptions}
                  promoElements={promoElements}
                />
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
