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
  } = props;
  const showSeparator = by && by.length !== 0;
  return (
    <div className="list-item list-item-vertical" key={`result-card-${itemTitle}`}>
      {overlineText ? (
        <StyledLink href={overlineURL} className="overline">
          {overlineText}
        </StyledLink>
      ) : null}
      <a href={constructedURL} title={itemTitle} className="list-anchor">
        <Title primaryFont={primaryFont} className="top-table-list-extra-large-title">
          {itemTitle}
        </Title>
      </a>
      <a href={constructedURL} title={itemTitle} className="list-anchor">
        {imageURL !== '' ? (
          <Image
            url={imageURL}
            // todo: get the proper alt tag for this image
            alt={itemTitle}
            smallWidth={274}
            smallHeight={148}
            mediumWidth={274}
            mediumHeight={148}
            // xl size via invision
            // https://washpost.invisionapp.com/d/main#/console/18639079/395708159/inspect
            largeWidth={797}
            largeHeight={1062}
          />
        ) : (
          <div className="top-table-extra-large-image-placeholder" />
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
          <DescriptionText secondaryFont={primaryFont} className="description-text">
            {descriptionText}
          </DescriptionText>
        </div>
        <div className="author-date">
          {!checkObjectEmpty(element) ? <Byline story={element} stylesFor="list" /> : null}
          {/* The Separator will only be shown if there is atleast one author name */}
          {showSeparator && <p className="dot-separator">&#9679;</p>}
          <ArticleDate classNames="story-date" date={displayDate} />
        </div>
      </div>
    </div>
  );
};

export default VerticalOverlineImageStoryItem;
