import React, { lazy, Suspense } from 'react';
import { Image, extractVideoEmbedFromStory } from '@wpmedia/engine-theme-sdk';
import ArticleDate from '@wpmedia/date-block';
import Byline from '@wpmedia/byline-block';
import Overline from '@wpmedia/overline-block';
import { ratiosFor } from '@wpmedia/resizer-image-block';
import getProperties from 'fusion:properties';
import Title from './title';
import DescriptionText from './description-text';
import checkObjectEmpty from '../shared/checkObjectEmpty';
import PromoLabel from './promo_label';
import discoverPromoType from './discover';

const VideoPlayerTopTable = lazy(() => import('./VideoPlayerTopTable'));

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

  const promoType = discoverPromoType(element);
  const showBottomBorder = (typeof customFields.showBottomBorderXL === 'undefined') ? true : customFields.showBottomBorderXL;

  const hrBorderTmpl = () => {
    if (showBottomBorder) {
      return (
        <hr />
      );
    }
    return (
      <hr className="hr-borderless" />
    );
  };

  const overlineTmpl = () => {
    if (customFields.showOverlineXL && overlineDisplay) {
      return (
        <Overline
          customUrl={overlineUrl}
          customText={overlineText}
          className="overline"
          editable
        />
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
        <DescriptionText
          secondaryFont={secondaryFont}
          className="description-text"
        >
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
          {!checkObjectEmpty(element) ? (
            <Byline story={element} stylesFor="list" />
          ) : null}
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
  const videoEmbed = customFields.playVideoInPlaceXL
    && !!extractVideoEmbedFromStory
    && extractVideoEmbedFromStory(element);

  return (
    <>
      <article className="container-fluid xl-large-promo" key={id}>
        <div className="row xl-promo-padding-bottom">
          {(customFields.showHeadlineXL
            || customFields.showDescriptionXL
            || customFields.showBylineXL
            || customFields.showDateXL) && (
            <div className="col-sm-xl-12 flex-col">
              {overlineTmpl()}
              {headlineTmpl()}
              { customFields.showImageXL && (
                <>
                  {(
                    !!videoEmbed && (
                      <Suspense fallback="loading">
                        <VideoPlayerTopTable
                          embedMarkup={videoEmbed}
                        />
                      </Suspense>
                    )
                  ) || (
                    <>
                      { imageURL ? (
                        <a href={websiteURL} title={itemTitle}>
                          <div className="image-wrapper">
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
                            <PromoLabel type={promoType} size="large" />
                          </div>
                        </a>
                      ) : (
                        <div className="image-wrapper">
                          <Image
                            smallWidth={ratios.smallWidth}
                            smallHeight={ratios.smallHeight}
                            mediumWidth={ratios.mediumWidth}
                            mediumHeight={ratios.mediumHeight}
                            largeWidth={ratios.largeWidth}
                            largeHeight={ratios.largeHeight}
                            alt={
                              getProperties(arcSite).primaryLogoAlt
                              || 'Placeholder logo'
                            }
                            url={targetFallbackImage}
                            breakpoints={getProperties(arcSite)?.breakpoints}
                            resizedImageOptions={placeholderResizedImageOptions}
                            resizerURL={getProperties(arcSite)?.resizerURL}
                          />
                          <PromoLabel type={promoType} size="large" />
                        </div>
                      )}
                    </>
                  )}
                </>
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
      {hrBorderTmpl()}
    </>
  );
};

export default VerticalOverlineImageStoryItem;
