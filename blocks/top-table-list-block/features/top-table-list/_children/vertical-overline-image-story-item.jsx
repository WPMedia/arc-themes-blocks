import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import ArticleDate from '@wpmedia/date-block';
import Byline from '@wpmedia/byline-block';
import Overline from '@wpmedia/overline-block';
import { ratiosFor } from '@wpmedia/resizer-image-block';
import getProperties from 'fusion:properties';

import Title from './title';
import DescriptionText from './description-text';
import checkObjectEmpty from '../shared/checkObjectEmpty';

const VerticalOverlineImageStoryItem = (props) => {
  const {
    websiteURL,
    itemTitle,
    imageURL,
    descriptionText,
    primaryFont,
    secondaryFont,
    by,
    element,
    overlineDisplay,
    displayDate,
    id,
    overlineUrl,
    arcSite,
    resizedImageOptions,
    overlineText,
    customFields,
    targetFallbackImage,
    placeholderResizedImageOptions,
    imageRatio,
  } = props;
  const showSeparator = by && by.length !== 0 && customFields.showDateXL;

  const overlineTmpl = () => {
    if (customFields.showOverlineXL && overlineDisplay) {
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
    if (customFields.showHeadlineXL && itemTitle) {
      return (
        <a href={websiteURL} title={itemTitle} className="xl-promo-headline">
          <Title primaryFont={primaryFont} className="xl-promo-headline">
            {itemTitle}
          </Title>
        </a>
      );
    }
    return null;
  };

  const descriptionTmpl = () => {
    if (customFields.showDescriptionXL && descriptionText) {
      return (
        <DescriptionText secondaryFont={secondaryFont} className="description-text">
          {descriptionText}
        </DescriptionText>
      );
    }
    return null;
  };

  const byLineTmpl = () => {
    if (customFields.showBylineXL && !checkObjectEmpty(element)) {
      return (
        <>
          {!checkObjectEmpty(element) ? <Byline story={element} stylesFor="list" /> : null}
          {/* The Separator will only be shown if there is at least one author name */}
          {showSeparator && <p className="dot-separator">&#9679;</p>}
        </>
      );
    }
    return null;
  };

  const dateTmpl = () => {
    if (customFields.showDateXL && displayDate) {
      return (
        <>
          <ArticleDate date={displayDate} />
        </>
      );
    }
    return null;
  };

  const ratios = ratiosFor('XL', imageRatio);

  return (
    <article className="container-fluid xl-large-promo" key={id}>
      <div className="row xl-promo-padding-bottom">
        {(customFields.showHeadlineXL || customFields.showDescriptionXL
            || customFields.showBylineXL || customFields.showDateXL)
        && (
        <div className="col-sm-xl-12 flex-col">
          {overlineTmpl()}
          {headlineTmpl()}
          {customFields.showImageXL && imageURL !== '' ? (
            <a href={websiteURL} title={itemTitle}>
              <Image
                resizedImageOptions={resizedImageOptions}
                url={imageURL}
                // todo: get the proper alt tag for this image
                alt={itemTitle}
                smallWidth={ratios.smallWidth}
                smallHeight={ratios.smallHeight}
                mediumWidth={ratios.mediumWidth}
                mediumHeight={ratios.mediumHeight}
                largeWidth={ratios.largeWidth}
                largeHeight={ratios.largeHeight}
                breakpoints={getProperties(arcSite)?.breakpoints}
                resizerURL={getProperties(arcSite)?.resizerURL}
              />
            </a>
          ) : (
            <Image
              smallWidth={ratios.smallWidth}
              smallHeight={ratios.smallHeight}
              mediumWidth={ratios.mediumWidth}
              mediumHeight={ratios.mediumHeight}
              largeWidth={ratios.largeWidth}
              largeHeight={ratios.largeHeight}
              alt={getProperties(arcSite).primaryLogoAlt || 'Placeholder logo'}
              url={targetFallbackImage}
              breakpoints={getProperties(arcSite)?.breakpoints}
              resizedImageOptions={placeholderResizedImageOptions}
              resizerURL={getProperties(arcSite)?.resizerURL}
            />
          )}
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

export default VerticalOverlineImageStoryItem;
