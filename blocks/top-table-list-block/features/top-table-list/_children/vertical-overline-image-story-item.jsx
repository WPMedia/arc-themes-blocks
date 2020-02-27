import React from 'react';
import { Image } from '@arc-test-org/engine-theme-sdk';
import ArticleDate from '@arc-test-org/date-block';
import Byline from '@arc-test-org/byline-block';
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
                smallWidth={400}
                smallHeight={0}
                mediumWidth={600}
                mediumHeight={0}
                // xl size via invision
                // https://washpost.invisionapp.com/d/main#/console/18639079/395708159/inspect
                largeWidth={800}
                largeHeight={0}
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
