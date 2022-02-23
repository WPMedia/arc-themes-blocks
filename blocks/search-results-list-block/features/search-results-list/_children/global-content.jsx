import React from 'react';
import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { SearchIcon } from '@wpmedia/engine-theme-sdk';
import { extractResizedParams, extractImageFromStory } from '@wpmedia/resizer-image-block';
import {
  Button, BUTTON_STYLES, BUTTON_TYPES, PrimaryFont,
} from '@wpmedia/shared-styles';

import SearchResult from './search-result';
import '@wpmedia/shared-styles/scss/_results-list.scss';
import './search-results-list.scss';

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
      focusItem: 0,
    };

    const {
      websiteDomain, fallbackImage, primaryLogoAlt, breakpoints, resizerURL, locale = 'en',
    } = getProperties(props.arcSite) || {};

    this.phrases = getTranslatedPhrases(locale);
    this.websiteDomain = websiteDomain;
    this.fallbackImage = fallbackImage;

    this.imageProps = {
      smallWidth: 158,
      smallHeight: 89,
      mediumWidth: 274,
      mediumHeight: 154,
      largeWidth: 274,
      largeHeight: 154,
      primaryLogoAlt,
      breakpoints,
      resizerURL,
    };

    this.fetchPlaceholder();
    this.customSearchAction = props.customSearchAction || null;
    this.listItemRefs = {};
  }

  componentDidUpdate(prevProps, prevState) {
    const prevFocusItem = prevState.focusItem;
    const { focusItem, resultList } = this.state;

    if (prevFocusItem === focusItem && prevFocusItem > 0) {
      const nextItem = resultList.data[focusItem];
      if (nextItem?._id) {
        this.listItemRefs[nextItem._id].querySelector('a:not([aria-hidden])').focus();
      }
    }
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
    const { storedList, resultList, page } = this.state;
    let currentCount;
    // If 'See More' button is pressed for the first time
    if (page === 1) {
      // Set initial list from globalContent data
      storedList.data = globalContent.data;
      storedList.metadata = globalContent.metadata;
      // use storedList as index reference for focus
      currentCount = storedList?.data?.length;
    } else {
      currentCount = resultList?.data?.length;
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
    this.setState({
      focusItem: currentCount,
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
            <PrimaryFont
              as="input"
              type="text"
              placeholder={this.phrases.t('search-results-blocks.search-input-placeholder')}
              value={value}
              className="search-bar"
              onChange={(evt) => this.setState({ value: evt.target.value })}
            />
            <PrimaryFont
              as="button"
              type="button"
              className="btn btn-sm"
              backgroundColor="primary-color"
              onClick={() => this.handleSearch()}
            >
              {this.phrases.t('search-results-block.search-button')}
            </PrimaryFont>
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
              const resizedImageOptions = extractImageFromStory(element)
                ? extractResizedParams(element)
                : placeholderResizedImageOptions;

              return (
                <div
                  key={`result-card-${element._id}`}
                  ref={(ref) => {
                    this.listItemRefs[element._id] = ref;
                  }}
                >
                  <SearchResult
                    element={element}
                    arcSite={arcSite}
                    targetFallbackImage={targetFallbackImage}
                    resizedImageOptions={resizedImageOptions}
                    promoElements={promoElements}
                    imageProps={this.imageProps}
                  />
                </div>
              );
            })
          }
          {
            !!(results && results.length > 0 && results.length < totalHits) && (
              <div className="see-more">
                <Button
                  ariaLabel={this.phrases.t('search-results-block.see-more-button-aria-label')}
                  buttonStyle={BUTTON_STYLES.PRIMARY}
                  buttonTypes={BUTTON_TYPES.LABEL_ONLY}
                  text={this.phrases.t('search-results-block.see-more-button')}
                  onClick={() => this.fetchStories()}
                />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default GlobalSearchResultsList;
