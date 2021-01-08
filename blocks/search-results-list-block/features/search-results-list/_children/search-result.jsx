import React from 'react';
import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import { extractResizedParams } from '@wpmedia/resizer-image-block';
import { Image } from '@wpmedia/engine-theme-sdk';
import getThemeStyle from 'fusion:themes';

import getProperties from 'fusion:properties';
import { HeadlineText, DescriptionText } from './styled-components';
import { extractImage } from './helpers';

const HANDLE_COMPRESSED_IMAGE_PARAMS = false;

const SearchResult = ({
  element,
  arcSite,
  targetFallbackImage,
  placeholderResizedImageOptions,
  promoElements = {},
}) => {
  const {
    description: { basic: descriptionText } = {},
    headlines: { basic: headlineText } = {},
    display_date: displayDate,
    credits: { by } = {},
    promo_items: promoItems,
    websites,
  } = element;

  if (!websites[arcSite]) {
    return null;
  }

  const url = websites[arcSite].website_url;
  const resizedImageOptions = extractResizedParams(element);
  const showSeparator = by && by.length !== 0;
  const {
    showHeadline,
    showImage,
    showDescription,
    showByline,
    showDate,
  } = promoElements;

  return (
    <div className="list-item" key={`result-card-${url}`}>
      { showImage && (
        <div className="results-list--image-container mobile-order-2 mobile-image">
          <a
            href={url}
            title={headlineText}
            className="list-anchor"
          >
            {extractImage(promoItems) ? (
              <Image
                compressedThumborParams={HANDLE_COMPRESSED_IMAGE_PARAMS}
                url={extractImage(promoItems)}
                alt={headlineText}
                smallWidth={274}
                smallHeight={154}
                mediumWidth={274}
                mediumHeight={154}
                largeWidth={274}
                largeHeight={154}
                resizedImageOptions={resizedImageOptions}
                resizerURL={getProperties(arcSite)?.resizerURL}
                breakpoints={getProperties(arcSite)?.breakpoints}
              />
            ) : (
              <Image
                compressedThumborParams={HANDLE_COMPRESSED_IMAGE_PARAMS}
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
      )}
      { showHeadline && (
        <div className="results-list--headline-container mobile-order-1">
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
      )}
      { (showDescription || showDate || showByline) && (
        <div className="results-list--description-author-container mobile-order-3">
          { showDescription && (
            <DescriptionText
              secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
              className="description-text"
            >
              {descriptionText}
            </DescriptionText>
          )}
          { (showDate || showByline) && (
            <div className="results-list--author-date">
              { showByline && <Byline story={element} stylesFor="list" /> }
              { showByline && showSeparator && showDate && <p className="dot-separator">&#9679;</p> }
              { showDate && <ArticleDate classNames="story-date" date={displayDate} /> }
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
