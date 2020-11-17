import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { Image } from '@wpmedia/engine-theme-sdk';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useContent } from 'fusion:content';
import getPromoContainer from './_children/promo_container';
import getPromoStyle from './_children/promo_style';

import '@wpmedia/shared-styles/scss/_small-promo.scss';

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const SmallManualPromo = ({ customFields }) => {
  const { arcSite } = useFusionContext();
  const imagePosition = customFields?.imagePosition || 'right';

  const headlineMarginClass = getPromoStyle(imagePosition, 'headlineMargin');

  const imageMarginClass = getPromoStyle(imagePosition, 'margin');
  const resizedImageOptions = useContent({
    source: 'resize-image-api',
    query: { raw_image_url: customFields.imageURL, 'arc-site': arcSite },
  });

  const promoContainersStyles = {
    containerClass: getPromoStyle(imagePosition, 'container'),
    headlineClass: customFields.showImage
      ? 'col-sm-xl-8'
      : 'col-sm-xl-12 no-image-padding',
    imageClass: 'col-sm-xl-4',
  };

  const renderWithLink = useCallback((element, props) => (
    <a
      href={customFields.linkURL || '#'}
      className={(props && props.className) || ''}
      title={customFields.headline}
      target={customFields.newTab ? '_blank' : '_self'}
      rel={customFields.newTab ? 'noreferrer noopener' : ''}
      onClick={!customFields.linkURL ? (evt) => {
        evt.preventDefault();
      } : undefined}
    >
      {element}
    </a>
  ), [customFields.linkURL, customFields.headline, customFields.newTab]);

  const headline = customFields.showHeadline && customFields.headline
    && (
      <div className={`promo-headline ${headlineMarginClass}`}>
        { renderWithLink((
          <HeadlineText
            primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
            className="sm-promo-headline"
          >
            {customFields.headline}
          </HeadlineText>
        ), { className: 'sm-promo-headline' }) }
      </div>
    );

  const image = customFields.showImage && customFields.imageURL
    && (
      <div className={imageMarginClass}>
        { renderWithLink(
          <Image
            url={customFields.imageURL}
            alt={customFields.headline}
            // small should be 3:2 aspect ratio
            smallWidth={105}
            smallHeight={70}
            mediumWidth={105}
            mediumHeight={70}
            largeWidth={105}
            largeHeight={70}
            breakpoints={getProperties(arcSite)?.breakpoints}
            resizerURL={getProperties(arcSite)?.resizerURL}
            resizedImageOptions={resizedImageOptions}
          />,
        )}
      </div>
    );

  return customFields.linkURL ? (
    <>
      <article className="container-fluid small-promo">
        {getPromoContainer(headline, image, promoContainersStyles, imagePosition)}
      </article>
      <hr />
    </>
  ) : null;
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
  }),
};

SmallManualPromo.label = 'Small Manual Promo – Arc Block';

export default SmallManualPromo;
