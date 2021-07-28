import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useFusionContext } from 'fusion:context';
import { useEditableContent } from 'fusion:content';
import {
  Byline,
  HeadingSection, PromoDate, PromoDescription, PromoHeadline, PromoImage,
} from '@wpmedia/shared-styles';

import '@wpmedia/shared-styles/scss/_medium-promo.scss';

const MediumPromoPresentation = ({
  content,
  showHeadline,
  imageOverrideURL,
  imageRatio,
  showByline,
  showDate,
  showDescription,
  showImage,
  description,
  headline,
  imageURL,
  linkURL,
  lazyLoad,
}) => {
  const { isAdmin } = useFusionContext();
  const { searchableField } = useEditableContent();
  const promoImageURL = content ? imageOverrideURL : imageURL;
  const imageSearchField = content ? 'imageOverrideURL' : 'imageURL';

  return (
    <HeadingSection>
      <article className="container-fluid medium-promo">
        <div className={`medium-promo-wrapper ${showImage ? 'md-promo-image' : ''}`} style={{ position: isAdmin ? 'relative' : null }}>
          {showImage
            ? (
              <div
                className="image-link"
                {...searchableField(imageSearchField)}
                suppressContentEditableWarning
              >
                <PromoImage
                  link={linkURL}
                  content={content}
                  customImageURL={promoImageURL}
                  showPromoLabel
                  promoSize="MD"
                  promoLabelSize="large"
                  imageRatio={imageRatio}
                  lazyLoad={lazyLoad}
                  alt={headline}
                />
              </div>
            )
            : null}
          {(showHeadline
            || showDescription
            || showByline
            || showDate)
          && (
            <>
              {showHeadline
                ? <PromoHeadline content={content} headingClassName="md-promo-headline-text" className="md-promo-headline" />
                : null}
              {(showDescription
                ? <PromoDescription className="description-text" content={content} text={description} />
                : null)}
              <div className="article-meta">
                {showByline
                  ? <Byline content={content} font="Primary" list separator={showDate} />
                  : null}
                {(showDate)
                  ? <PromoDate content={content} />
                  : null}
              </div>
            </>
          )}
        </div>
      </article>
      <hr />
    </HeadingSection>
  );
};

MediumPromoPresentation.defaultProps = {
  content: null,
  showHeadline: true,
};

MediumPromoPresentation.propTypes = {
  content: PropTypes.object,
  showHeadline: PropTypes.bool,
  imageOverrideURL: PropTypes.string,
  imageRatio: PropTypes.string,
  showByline: PropTypes.bool,
  showDate: PropTypes.bool,
  showDescription: PropTypes.bool,
  showImage: PropTypes.bool,
  description: PropTypes.string,
  headline: PropTypes.string,
  imageURL: PropTypes.string,
  linkURL: PropTypes.string,
  lazyLoad: PropTypes.bool,
};

export default MediumPromoPresentation;
