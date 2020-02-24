import React from 'react';
import { Image } from '@arc-test-org/engine-theme-sdk';
import Byline from '@arc-test-org/byline-block';
import ArticleDate from '@arc-test-org/date-block';
import Title from './title';
import DescriptionText from './description-text';
import checkObjectEmpty from '../shared/checkObjectEmpty';

// via results list
const MediumListItem = (props) => {
  const {
    constructedURL,
    itemTitle,
    imageURL,
    descriptionText,
    primaryFont,
    by,
    element,
    displayDate,
    id,
  } = props;
  const showSeparator = by && by.length !== 0;

  return (
    <div className="list-item" key={id}>
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
            largeWidth={274}
            largeHeight={148}
          />
        ) : (
          <div className="top-table-med-image-placeholder" />
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
          <a href={constructedURL} title={itemTitle} className="list-anchor">
            <Title primaryFont={primaryFont}>{itemTitle}</Title>
          </a>
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

export default MediumListItem;
