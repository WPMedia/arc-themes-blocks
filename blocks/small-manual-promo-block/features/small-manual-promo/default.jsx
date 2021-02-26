import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { Image, LazyLoad } from '@wpmedia/engine-theme-sdk';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useContent } from 'fusion:content';
import { imageRatioCustomField, ratiosFor } from '@wpmedia/resizer-image-block';
import getPromoContainer from './_children/promo_container';
import getPromoStyle from './_children/promo_style';

import '@wpmedia/shared-styles/scss/_small-promo.scss';

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const SmallManualPromo = ({ customFields = {} }) => {
  const { showImage = true } = customFields;
  const { arcSite } = useFusionContext();
  const imagePosition = customFields?.imagePosition || 'right';

  const headlineMarginClass = getPromoStyle(imagePosition, 'headlineMargin');

  const imageMarginClass = getPromoStyle(imagePosition, 'margin');
  const resizedImageOptions = useContent({
    source: 'resize-image-api',
    query: { raw_image_url: customFields.imageURL, 'arc-site': arcSite },
  });
  const ratios = ratiosFor('SM', customFields.imageRatio);

  const promoContainersStyles = {
    containerClass: getPromoStyle(imagePosition, 'container'),
    headlineClass: showImage
      ? 'col-sm-xl-8'
      : 'col-sm-xl-12',
    imageClass: 'col-sm-xl-4',
  };

  const renderWithLink = useCallback((element, props, attributes) => (
    <a
      href={customFields.linkURL || '#'}
      className={(props && props.className) || ''}
      target={customFields.newTab ? '_blank' : '_self'}
      rel={customFields.newTab ? 'noreferrer noopener' : ''}
      onClick={!customFields.linkURL ? (evt) => {
        evt.preventDefault();
      } : undefined}
      {...attributes}
    >
      {element}
    </a>
  ), [customFields.linkURL, customFields.newTab]);

  const headline = customFields.showHeadline && customFields.headline
    && (
      <div className={`promo-headline ${headlineMarginClass}`}>
        { renderWithLink((
          <HeadlineText
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            className="sm-promo-headline"
          >
            {customFields.headline}
          </HeadlineText>
        ), { className: 'sm-promo-headline' }) }
      </div>
    );

  const image = showImage && customFields.imageURL
    && (
      <div className={imageMarginClass}>
        { renderWithLink(
          <Image
            url={customFields.imageURL}
            alt={customFields.headline}
            // small should be 3:2 aspect ratio
            {...ratios}
            breakpoints={getProperties(arcSite)?.breakpoints}
            resizerURL={getProperties(arcSite)?.resizerURL}
            resizedImageOptions={resizedImageOptions}
          />, {}, { 'aria-hidden': 'true', tabIndex: '-1' },
        )}
      </div>
    );

  const SmallManualPromoRender = () => (
    <>
      <article className="container-fluid small-promo">
        {getPromoContainer(headline, image, promoContainersStyles, imagePosition)}
      </article>
      <hr />
    </>
  );

  // base case for rendering image without even a link
  return (
    <LazyLoad enabled={customFields?.lazyLoad}>
      <SmallManualPromoRender />
    </LazyLoad>
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
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

SmallManualPromo.label = 'Small Manual Promo – Arc Block';

export default SmallManualPromo;
