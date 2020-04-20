import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import ArticleDate from '@wpmedia/date-block';
import Byline from '@wpmedia/byline-block';
import Overline from '@wpmedia/overline-block';
import getProperties from 'fusion:properties';
import Title from './title';
import DescriptionText from './description-text';
import checkObjectEmpty from '../shared/checkObjectEmpty';

const HorizontalOverlineImageStoryItem = (props) => {
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
    arcSite,
    resizedImageOptions,
  } = props;
  const showSeparator = by && by.length !== 0;

  return (
    <article key={id} className="container-fluid large-promo">
      <div className="row lg-promo-padding-bottom">
        <div className="col-sm-12 col-md-xl-6">
          {imageURL !== '' ? (
            <a href={constructedURL} title={itemTitle}>
              <Image
                resizedImageOptions={resizedImageOptions}
                url={imageURL}
                // todo: get the proper alt tag for this image
                alt={itemTitle}
                // large aspect ratio 4:3
                smallWidth={274}
                smallHeight={206}
                mediumWidth={274}
                mediumHeight={206}
                largeWidth={377}
                largeHeight={283}
                breakpoints={getProperties(arcSite)?.breakpoints}
                resizerURL={getProperties(arcSite)?.resizerURL}
              />
            </a>
          ) : null}
        </div>
        <div className="col-sm-12 col-md-xl-6 flex-col">
          <div>
            <Overline className="overline" />
            <a href={constructedURL} title={itemTitle} className="lg-promo-headline">
              <Title primaryFont={primaryFont} className="lg-promo-headline">{itemTitle}</Title>
            </a>
            <DescriptionText secondaryFont={primaryFont} className="description-text">
              {descriptionText}
            </DescriptionText>
          </div>
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

export default HorizontalOverlineImageStoryItem;
