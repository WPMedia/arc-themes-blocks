import React, { useCallback } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { imageRatioCustomField, ratiosFor } from '@wpmedia/resizer-image-block';

import '@wpmedia/shared-styles/scss/_extra-large-promo.scss';
import { Image, LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import { useContent, useEditableContent } from 'fusion:content';

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const OverlineLink = styled.a`
  font-family: ${(props) => props.primaryFont};
  font-weight: bold;
  text-decoration: none;
`;

const OverlineHeader = styled.h2`
  font-family: ${(props) => props.primaryFont};
  font-weight: bold;
  text-decoration: none;
`;

const ExtraLargeManualPromoItem = ({ customFields }) => {
  const { arcSite, isAdmin } = useFusionContext();
  const { searchableField } = useEditableContent();

  const resizedImageOptions = useContent({
    source: (customFields.lazyLoad || isAdmin) ? 'resize-image-api-client' : 'resize-image-api',
    query: { raw_image_url: customFields.imageURL, 'arc-site': arcSite },
  });
  const ratios = ratiosFor('XL', customFields.imageRatio);

  const renderWithLink = useCallback((element, props, attributes) => (
    <a
      href={customFields.linkURL || '#'}
      className={(props && props.className) || ''}
      target={customFields.newTab ? '_blank' : '_self'}
      rel={customFields.newTab ? 'noreferrer' : ''}
      onClick={!customFields.linkURL ? (evt) => {
        evt.preventDefault();
      } : undefined}
      {...attributes}
    >
      {element}
    </a>
  ), [customFields.linkURL, customFields.newTab]);

  return (
    <>
      <article className="container-fluid xl-large-promo xl-large-manual-promo">
        <div className="row">
          {(customFields.showHeadline || customFields.showDescription
            || customFields.showOverline)
          && (
            <div className="col-sm-xl-12 flex-col" style={{ position: isAdmin ? 'relative' : null }}>
              {(customFields.showOverline && customFields.overline && customFields.overlineURL)
              && (
                <OverlineLink
                  href={customFields.overlineURL}
                  primaryFont={getThemeStyle(arcSite)['primary-font-family']}
                  className="overline"
                >
                  {customFields.overline}
                </OverlineLink>
              )}
              {((customFields.showOverline && customFields.overline) && !customFields.overlineURL)
              && (
                <OverlineHeader
                  primaryFont={getThemeStyle(arcSite)['primary-font-family']}
                  className="overline"
                >
                  {customFields.overline}
                </OverlineHeader>
              )}
              {(customFields.showHeadline && customFields.headline)
              && renderWithLink(
                <HeadlineText
                  primaryFont={getThemeStyle(arcSite)['primary-font-family']}
                  className="xl-promo-headline"
                >
                  {customFields.headline}
                </HeadlineText>,
                { className: 'xl-promo-headline' },
              )}
              {(customFields.showImage && customFields.imageURL)
              && renderWithLink(
                <Image
                  url={customFields.imageURL}
                  alt={customFields.headline}
                  {...ratios}
                  breakpoints={getProperties(arcSite)?.breakpoints}
                  resizerURL={getProperties(arcSite)?.resizerURL}
                  resizedImageOptions={resizedImageOptions}
                />, {}, { 'aria-hidden': 'true', tabIndex: '-1', ...searchableField('imageURL') },
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
            </div>
          )}
        </div>
      </article>
      <hr />
    </>
  );
};

const ExtraLargeManualPromo = ({ customFields }) => {
  const { isAdmin } = useFusionContext();
  if (customFields.lazyLoad && isServerSide() && !isAdmin) { // On Server
    return null;
  }
  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <ExtraLargeManualPromoItem customFields={{ ...customFields }} />
    </LazyLoad>
  );
};

ExtraLargeManualPromo.propTypes = {
  customFields: PropTypes.shape({
    headline: PropTypes.string.tag({
      label: 'Headline',
      group: 'Configure Content',
    }),
    description: PropTypes.string.tag({
      label: 'Description',
      group: 'Configure Content',
    }),
    overline: PropTypes.string.tag({
      label: 'Overline',
      group: 'Configure Content',
    }),
    overlineURL: PropTypes.string.tag({
      label: 'Overline URL',
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
    showOverline: PropTypes.bool.tag(
      {
        label: 'Show overline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
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
    ...imageRatioCustomField('imageRatio', 'Art', '4:3'),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

ExtraLargeManualPromo.label = 'Extra Large Manual Promo – Arc Block';

export default ExtraLargeManualPromo;
