import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { Image, LazyLoad } from '@wpmedia/engine-theme-sdk';
import { imageRatioCustomField, ratiosFor } from '@wpmedia/resizer-image-block';
import { useContent } from 'fusion:content';

import '@wpmedia/shared-styles/scss/_medium-promo.scss';

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const MediumManualPromo = ({ customFields }) => {
  const { arcSite } = useFusionContext();

  const resizedImageOptions = useContent({
    source: 'resize-image-api',
    query: { raw_image_url: customFields.imageURL, 'arc-site': arcSite },
  });

  const {
    breakpoints,
  } = getProperties(arcSite);

  const hasImage = customFields.showImage && customFields.imageURL;
  const ratios = ratiosFor('MD', customFields.imageRatio);

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

  const MediumManualPromoRender = () => (
    <>
      <article className="container-fluid medium-promo">
        <div className={`medium-promo-wrapper ${hasImage ? 'md-promo-image' : ''}`}>
          {hasImage && renderWithLink(
            <Image
              // medium is 16:9
              url={customFields.imageURL}
              alt={customFields.headline}
              {...ratios}
              breakpoints={breakpoints}
              resizerURL={getProperties(arcSite)?.resizerURL}
              resizedImageOptions={resizedImageOptions}
            />, { className: 'image-link' }, { 'aria-hidden': 'true', tabIndex: '-1' },
          )}
          {(customFields.showHeadline || customFields.showDescription)
          && (
            <>
              {(customFields.showHeadline && customFields.headline)
              && renderWithLink(
                <HeadlineText
                  primaryFont={getThemeStyle(arcSite)['primary-font-family']}
                  className="md-promo-headline-text"
                >
                  {customFields.headline}
                </HeadlineText>,
                { className: 'md-promo-headline' },
              )}
              {(customFields.showDescription && customFields.description)
              && (
                <DescriptionText
                  secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
                  className="description-text"
                >
                  {customFields.description}
                </DescriptionText>
              )}
            </>
          )}
        </div>
      </article>
      <hr />
    </>
  );

  return (
    <LazyLoad enabled={customFields?.lazyLoad}>
      <MediumManualPromoRender />
    </LazyLoad>
  );
};

MediumManualPromo.propTypes = {
  customFields: PropTypes.shape({
    headline: PropTypes.string.tag({
      label: 'Headline',
      group: 'Configure Content',
    }),
    description: PropTypes.string.tag({
      label: 'Description',
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
    showHeadline: PropTypes.bool.tag(
      {
        label: 'Show headline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showImage: PropTypes.bool.tag(
      {
        label: 'Show image',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showDescription: PropTypes.bool.tag(
      {
        label: 'Show description',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
    }),
    ...imageRatioCustomField('imageRatio', 'Art', '3:2'),
  }),
};

MediumManualPromo.label = 'Medium Manual Promo – Arc Block';

export default MediumManualPromo;
