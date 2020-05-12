import React from 'react';
import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import { useAppContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import { Image } from '@wpmedia/engine-theme-sdk';
import PlaceholderImage from '@wpmedia/placeholder-image-block';
import getProperties from 'fusion:properties';
import SearchIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/SearchIcon';
import { extractResizedParams } from '@wpmedia/resizer-image-block';
import { resizerURL } from 'fusion:environment';
import { HeadlineText, DescriptionText } from './styled-components';
import { extractImage } from './helpers';
import './search-results-list.scss';

const GlobalSearchResultsList = () => {
  const { globalContent = {}, arcSite } = useAppContext();
  const {
    data,
    metadata: { total_hits: totalHits, q: query } = {},
  } = globalContent;
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
          />
          <button
            type="button"
            className="btn btn-sm"
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
          data && data.length > 0 && data.map((element) => {
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
                <div className="results-list--image-container">
                  <a
                    href={canonicalUrl}
                    title={headlineText}
                    className="list-anchor"
                  >
                    {extractImage(promoItems) ? (
                      <Image
                        resizedImageOptions={extractResizedParams(element)}
                        url={extractImage(promoItems)}
                        alt={headlineText}
                        smallWidth={274}
                        smallHeight={148}
                        mediumWidth={274}
                        mediumHeight={148}
                        largeWidth={274}
                        largeHeight={148}
                        breakpoints={getProperties(arcSite)?.breakpoints}
                        resizerURL={resizerURL}
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
};


export default GlobalSearchResultsList;
