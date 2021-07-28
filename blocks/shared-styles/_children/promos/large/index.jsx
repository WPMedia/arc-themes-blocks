import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useFusionContext } from 'fusion:context';
import { useEditableContent } from 'fusion:content';
import {
  Byline,
  HeadingSection, Overline, PromoDate, PromoDescription, PromoHeadline, PromoImage,
} from '@wpmedia/shared-styles';
import {
  extractVideoEmbedFromStory,
  // presentational component does not do data fetching
  VideoPlayer as VideoPlayerPresentational,
} from '@wpmedia/engine-theme-sdk';

import '@wpmedia/shared-styles/scss/_medium-promo.scss';

const LargePromoPresentation = ({
  content,
  showHeadline,
  imageRatio,
  imageOverrideURL,
  lazyLoad,
  showByline,
  showDate,
  showDescription,
  showImage,
  showOverline,
  playVideoInPlace,
  shrinkToFit,
  viewportPercentage,
}) => {
  const { id, isAdmin } = useFusionContext();
  const { searchableField } = useEditableContent();

  const textClass = showImage ? 'col-sm-12 col-md-xl-6 flex-col' : 'col-sm-xl-12 flex-col';
  const videoEmbed = playVideoInPlace && extractVideoEmbedFromStory(content);

  return (
    <HeadingSection>
      <article className="container-fluid large-promo">
        <div className="row">
          {(!!videoEmbed
            || showImage)
          && (
            <div className="col-sm-12 col-md-xl-6 flex-col" style={{ position: isAdmin ? 'relative' : null }}>
              {(!!videoEmbed
                && (
                  <VideoPlayerPresentational
                    id={id}
                    embedMarkup={videoEmbed}
                    enableAutoplay={false}
                    shrinkToFit={shrinkToFit}
                    viewportPercentage={viewportPercentage}
                  />
                )
              )
              || (
                showImage
                && (
                  <div {...searchableField('imageOverrideURL')} suppressContentEditableWarning>
                    <PromoImage
                      content={content}
                      customImageURL={imageOverrideURL}
                      showPromoLabel
                      promoSize="LG"
                      promoLabelSize="large"
                      imageRatio={imageRatio}
                      lazyLoad={lazyLoad}
                    />
                  </div>
                )
              )}
            </div>
          )}
          {(showOverline
            || showHeadline
            || showDescription
            || showByline
            || showDate)
          && (
            <div className={textClass}>
              {showOverline
                ? <Overline story={content} editable />
                : null}
              {showHeadline
                ? <PromoHeadline content={content} headingClassName="lg-promo-headline" linkClassName="lg-promo-headline" />
                : null}
              {showDescription
                ? <PromoDescription className="description-text" content={content} />
                : null}
              <div className="article-meta">
                {showByline
                  ? <Byline content={content} font="Primary" list separator={showDate} />
                  : null}
                {showDate
                  ? <PromoDate content={content} />
                  : null}
              </div>
            </div>
          )}
        </div>
      </article>
      <hr />
    </HeadingSection>
  );
};

LargePromoPresentation.propTypes = {
  content: PropTypes.object,
  showHeadline: PropTypes.bool,
  imageRatio: PropTypes.string,
  description: PropTypes.string,
  headline: PropTypes.string,
  imageOverrideURL: PropTypes.string,
  imageURL: PropTypes.string,
  linkURL: PropTypes.string,
  lazyLoad: PropTypes.bool,
  newTab: PropTypes.bool,
  itemContentConfig: PropTypes.object,
  showByline: PropTypes.bool,
  showDate: PropTypes.bool,
  showDescription: PropTypes.bool,
  showImage: PropTypes.bool,
  showOverline: PropTypes.bool,
  playVideoInPlace: PropTypes.bool,
  shrinkToFit: PropTypes.bool,
  viewportPercentage: PropTypes.string,
};

export default LargePromoPresentation;
