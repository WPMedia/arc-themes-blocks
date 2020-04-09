import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import ArticleDate from '@wpmedia/date-block';
import Byline from '@wpmedia/byline-block';
import getProperties from 'fusion:properties';
import StyledLink from './styled-link';
import Title from './title';
import DescriptionText from './description-text';
import checkObjectEmpty from '../shared/checkObjectEmpty';

const VerticalOverlineImageStoryItem = (props) => {
  const {
    constructedURL,
    itemTitle,
    imageURL,
    descriptionText,
    primaryFont,
    by,
    element,
    displayDate,
    overlineURL,
    overlineText,
    id,
    arcSite,
  } = props;
  const showSeparator = by && by.length !== 0;
  return (
    <article className="container-fluid xl-large-promo" key={id}>
      <div className="row xl-promo-padding-bottom">
        <div className="col-sm-xl-12 flex-col">
          {overlineText ? (
            <StyledLink href={overlineURL} className="overline">
              {overlineText}
            </StyledLink>
          ) : null}
          <a href={constructedURL} title={itemTitle} className="xl-promo-headline">
            <Title primaryFont={primaryFont} className="xl-promo-headline">
              {itemTitle}
            </Title>
          </a>
          {imageURL !== '' ? (
            <a href={constructedURL} title={itemTitle}>
              <Image
                url={imageURL}
                // todo: get the proper alt tag for this image
                alt={itemTitle}
                // xl aspect ratio of 4:3
                smallWidth={400}
                smallHeight={300}
                mediumWidth={600}
                mediumHeight={450}
                largeWidth={800}
                largeHeight={600}
                breakpoints={getProperties(arcSite)?.breakpoints}
                resizerURL={getProperties(arcSite)?.resizerURL}
              />
            </a>
          ) : null}
          <DescriptionText secondaryFont={primaryFont} className="description-text">
            {descriptionText}
          </DescriptionText>
          <div className="article-meta">
            {!checkObjectEmpty(element) ? <Byline story={element} stylesFor="list" /> : null}
            {/* The Separator will only be shown if there is atleast one author name */}
            {showSeparator && <p className="dot-separator">&#9679;</p>}
            <ArticleDate date={displayDate} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default VerticalOverlineImageStoryItem;
