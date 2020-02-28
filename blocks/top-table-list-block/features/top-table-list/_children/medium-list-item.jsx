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
    <article className="container-fluid medium-promo" key={id}>
      <div className="row med-promo-padding-bottom">
        <div className="col-sm-12 col-md-xl-4">
          <a href={constructedURL} title={itemTitle}>
            {imageURL !== '' ? (
              <Image
                url={imageURL}
                // todo: get the proper alt tag for this image
                alt={itemTitle}
                smallWidth={275}
                smallHeight={0}
                mediumWidth={275}
                mediumHeight={0}
                largeWidth={275}
                largeHeight={0}
              />
            ) : null}
          </a>
        </div>
        <div className="col-sm-12 col-md-xl-8 flex-col">
          {itemTitle !== '' ? (
            <a href={constructedURL} title={itemTitle} className="md-promo-headline">
              <Title className="md-promo-headline" primaryFont={primaryFont}>{itemTitle}</Title>
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

export default MediumListItem;
