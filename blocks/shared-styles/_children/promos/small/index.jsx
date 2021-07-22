import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import {
  PromoHeadline, PromoImage, SmallPromoContainer, SmallPromoStyles,
} from '@wpmedia/shared-styles';

const SmallPromoPresentation = ({
  content = null, showHeadline, showImage, imagePosition, customFields,
}) => {
  const { searchableField } = useEditableContent();
  const { isAdmin } = useFusionContext();
  const imageSearchField = content ? 'imageOverrideURL' : 'imageURL';
  const headlineMarginClass = SmallPromoStyles(imagePosition, 'headlineMargin');

  const headlineOutput = showHeadline
    ? (
      <PromoHeadline
        content={content}
        text={customFields?.headline}
        link={customFields?.linkURL}
        className={headlineMarginClass}
        linkClassName="sm-promo-headline"
        headingClassName="sm-promo-headline"
        newTab={customFields?.newTab}
      />
    ) : null;

  const image = showImage
    ? (
      <div style={{ position: isAdmin ? 'relative' : null }}>
        <div {...searchableField(imageSearchField)} suppressContentEditableWarning>
          <PromoImage
            content={content}
            customImageURL={customFields?.[imageSearchField]}
            alt={customFields?.headline}
            promoSize="SM"
            imageRatio={customFields?.imageRatio}
            linkURL={customFields?.linkURL}
            newTab={customFields?.newTab}
            lazyLoad={customFields?.lazyLoad}
          />
        </div>
      </div>
    ) : null;

  return (
    <SmallPromoContainer
      headline={headlineOutput}
      image={image}
      imagePosition={imagePosition}
    />
  );
};

SmallPromoPresentation.defaultProps = {
  showHeadline: true,
  showImage: true,
  imagePosition: 'right',
};

SmallPromoPresentation.propTypes = {
  content: PropTypes.objectOf,
  showHeadline: PropTypes.bool,
  showImage: PropTypes.bool,
  imagePosition: PropTypes.string,
};

export default SmallPromoPresentation;
