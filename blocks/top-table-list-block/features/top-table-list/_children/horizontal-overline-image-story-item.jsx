import React from 'react';
import {
  extractVideoEmbedFromStory,
  // presentational component does not do data fetching
  VideoPlayer as VideoPlayerPresentational,
} from '@wpmedia/engine-theme-sdk';
import {
  Byline, Overline, PromoDate, PromoDescription, PromoHeadline, PromoImage,
} from '@wpmedia/shared-styles';

const HorizontalOverlineImageStoryItem = (props) => {
  const {
    element,
    id,
    customFields,
  } = props;
  const textClass = customFields?.showImageLG
    ? 'col-sm-12 col-md-xl-6 flex-col'
    : 'col-sm-xl-12 flex-col';

  const showBottomBorder = (typeof customFields?.showBottomBorderLG === 'undefined') ? true : customFields?.showBottomBorderLG;

  const videoEmbed = customFields?.playVideoInPlaceLG
    && !!extractVideoEmbedFromStory
    && extractVideoEmbedFromStory(element);

  return (
    <>
      <article key={id} className="container-fluid large-promo">
        <div className="promo-item-margins row lg-promo-padding-bottom">
          {(!!videoEmbed || customFields?.showImageLG)
            ? (
              <div className="col-sm-12 col-md-xl-6 flex-col">
                {(!!videoEmbed
                  && (
                    <VideoPlayerPresentational
                      id={id}
                      embedMarkup={videoEmbed}
                      enableAutoplay={false}
                    />
                  )
                ) || (
                    customFields?.showImageLG
                    && (
                      <PromoImage
                        content={element}
                        showPromoLabel
                        promoSize="LG"
                        promoLabelSize="large"
                        imageRatio={customFields?.imageRatioLG}
                      />
                    ))}
              </div>
            )
            : null}
          {(customFields?.showHeadlineLG
            || customFields?.showDescriptionLG
            || customFields?.showBylineLG
            || customFields?.showDateLG)
            ? (
              <div className={textClass}>
                {customFields?.showOverlineLG
                  ? <Overline story={element} className="overline" editable />
                  : null}
                {customFields?.showHeadlineLG
                  ? (
                    <PromoHeadline
                      content={element}
                      headingClassName="lg-promo-headline"
                      linkClassName="lg-promo-headline"
                      editable={false}
                    />
                  )
                  : null}
                {customFields?.showDescriptionLG
                  ? (
                    <PromoDescription
                      content={element}
                      className="description-text"
                      editable={false}
                    />
                  )
                  : null}
                <div className="article-meta">
                  {customFields?.showBylineLG
                    ? <Byline content={element} font="Primary" list />
                    : null}
                  {customFields?.showDateLG
                    ? <PromoDate content={element} />
                    : null}
                </div>
              </div>
            )
            : null}
        </div>
      </article>
      <hr className={!showBottomBorder ? 'hr-borderless' : ''} />
    </>
  );
};

export default HorizontalOverlineImageStoryItem;
