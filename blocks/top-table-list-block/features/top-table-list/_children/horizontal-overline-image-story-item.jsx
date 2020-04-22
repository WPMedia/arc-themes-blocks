import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import ArticleDate from '@wpmedia/date-block';
import Byline from '@wpmedia/byline-block';
import Overline from '@wpmedia/overline-block';
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
    overlineDisplay,
    overlineUrl,
    overlineText,
    displayDate,
    id,
    customFields,
  } = props;
  const showSeparator = by && by.length !== 0 && customFields.showDateLG;
  const textClass = customFields.showImageLG ? 'col-sm-12 col-md-xl-6 flex-col' : 'col-sm-xl-12 flex-col';

  const overlineTmpl = () => {
    if (customFields.showOverlineLG && overlineDisplay) {
      return (
        (
          <Overline
            customUrl={overlineUrl}
            customText={overlineText}
            className="overline"
            editable
          />
        )
      );
    }
    return null;
  };

  const headlineTmpl = () => {
    if (customFields.showHeadlineLG && itemTitle) {
      return (
        <a href={constructedURL} title={itemTitle} className="lg-promo-headline">
          <Title primaryFont={primaryFont} className="lg-promo-headline">{itemTitle}</Title>
        </a>
      );
    }
    return null;
  };

  const descriptionTmpl = () => {
    if (customFields.showDescriptionLG && descriptionText) {
      return (
        <DescriptionText secondaryFont={primaryFont} className="description-text">
          {descriptionText}
        </DescriptionText>
      );
    }
    return null;
  };

  const byLineTmpl = () => {
    if (customFields.showBylineLG && !checkObjectEmpty(element)) {
      return (
        <>
          {!checkObjectEmpty(element) ? <Byline story={element} stylesFor="list" /> : null}
          {/* The Separator will only be shown if there is atleast one author name */}
          {showSeparator && <p className="dot-separator">&#9679;</p>}
        </>
      );
    }
    return null;
  };

  const dateTmpl = () => {
    if (customFields.showDateLG && displayDate) {
      return (
        <>
          <ArticleDate date={displayDate} />
        </>
      );
    }
    return null;
  };

  return (
    <article key={id} className="container-fluid large-promo">
      <div className="row lg-promo-padding-bottom">
        {customFields.showImageLG
        && (
        <div className="col-sm-12 col-md-xl-6">
          {imageURL !== '' ? (
            <a href={constructedURL} title={itemTitle}>
              <Image
                url={imageURL}
                // todo: get the proper alt tag for this image
                alt={itemTitle}
                smallWidth={274}
                smallHeight={148}
                mediumWidth={274}
                mediumHeight={148}
                // large size via invision
                // https://washpost.invisionapp.com/d/main#/console/18639079/395708159/inspect
                largeWidth={377}
                largeHeight={272}
              />
            </a>
          ) : null}
        </div>
        )}
        {(customFields.showHeadlineLG || customFields.showDescriptionLG
            || customFields.showBylineLG || customFields.showDateLG)
        && (
        <div className={textClass}>
          {overlineTmpl()}
          {headlineTmpl()}
          {descriptionTmpl()}
          <div className="article-meta">
            {byLineTmpl()}
            {dateTmpl()}
          </div>
        </div>
        )}
      </div>
    </article>
  );
};

export default HorizontalOverlineImageStoryItem;
