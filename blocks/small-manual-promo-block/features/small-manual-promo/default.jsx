import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { Image } from '@wpmedia/engine-theme-sdk';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useContent } from 'fusion:content';
import { imageRatioCustomField, ratiosFor } from '@wpmedia/resizer-image-block';
import getPromoContainer from './_children/promo_container';
import getPromoStyle from './_children/promo_style';

const SmallManualPromoItem = ({ customFields }) => {
  const { searchableField } = useEditableContent();
  const { isAdmin } = useFusionContext();

  const imagePosition = customFields?.imagePosition || 'right';
  const headlineMarginClass = SmallPromoStyles(imagePosition, 'headlineMargin');

  const headlineOutput = customFields.showHeadline && customFields.headline
    ? (
      <PromoHeadline
        text={customFields.headline}
        link={customFields.linkURL}
        className={headlineMarginClass}
        linkClassName="sm-promo-headline"
        headingClassName="sm-promo-headline"
        newTab={customFields.newTab}
      />
    ) : null;

  const image = customFields?.showImage && customFields.imageURL
    ? (
      <div style={{ position: isAdmin ? 'relative' : null }}>
        <div {...searchableField('imageURL')}>
          <PromoImage
            customImageURL={customFields.imageURL}
            alt={customFields.headline}
            promoSize="SM"
            imageRatio={customFields.imageRatio}
            linkURL={customFields.linkURL}
            newTab={customFields.newTab}
            lazyLoad={customFields.lazyLoad}
          />
        </div>
      </div>
    ) : null;

  // base case for rendering image without even a link
  return (
    <>
      <article className="container-fluid small-promo">
        {getPromoContainer(headline, image, promoContainersStyles, imagePosition)}
      </article>
      <hr />
    </>
  );
};

SmallManualPromo.propTypes = {
  customFields: PropTypes.shape({
    headline: PropTypes.string.tag({
      label: 'Headline',
      group: 'Configure Content',
    }),
    imageURL: PropTypes.string.tag({
      label: 'Image URL',
      group: 'Configure Content',
      searchable: 'image',
    }),
    linkURL: PropTypes.string.tag({
      label: 'Link URL',
      group: 'Configure Content',
    }),
    newTab: PropTypes.bool.tag({
      label: 'Open in new tab',
      defaultValue: false,
      group: 'Configure Content',
    }),
    showHeadline: PropTypes.bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    showImage: PropTypes.bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    imagePosition: PropTypes.oneOf([
      'right', 'left', 'above', 'below',
    ]).tag({
      defaultValue: 'right',
      label: 'Image Position',
      group: 'Image',
      labels: {
        right: 'Image Right',
        left: 'Image Left',
        above: 'Image Above',
        below: 'Image Below',
      },
    }),
    ...imageRatioCustomField('imageRatio', 'Art', '3:2'),
  }),
};

SmallManualPromo.label = 'Small Manual Promo – Arc Block';

export default SmallManualPromo;
