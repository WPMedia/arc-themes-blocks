import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import getProperties from 'fusion:properties';
import { resizerURL } from 'fusion:environment';
import Title from './title';
import DescriptionText from './description-text';
import checkObjectEmpty from '../shared/checkObjectEmpty';

// via results list
const MediumListItem = (props) => {
  const {
    websiteURL,
    itemTitle,
    imageURL,
    descriptionText,
    primaryFont,
    by,
    element,
    displayDate,
    id,
    arcSite,
    resizedImageOptions,
  } = props;
  const showSeparator = by && by.length !== 0;

  return (
    <article className="container-fluid medium-promo" key={id}>
      <div className="row med-promo-padding-bottom">
        <div className="col-sm-12 col-md-xl-4">
          <a href={websiteURL} title={itemTitle}>
            {imageURL !== '' ? (
              <Image
                resizedImageOptions={resizedImageOptions}
                url={imageURL}
                // todo: get the proper alt tag for this image
                // 16:9 aspect for medium
                alt={itemTitle}
                smallWidth={274}
                smallHeight={154}
                mediumWidth={274}
                mediumHeight={154}
                largeWidth={400}
                largeHeight={225}
                breakpoints={getProperties(arcSite)?.breakpoints}
                resizerURL={resizerURL}
              />
            ) : null}
          </a>
        </div>
        <div className="col-sm-12 col-md-xl-8 flex-col">
          {itemTitle !== '' ? (
            <a href={websiteURL} title={itemTitle} className="md-promo-headline">
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
