import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { Image } from '@wpmedia/engine-theme-sdk';
import { useContent } from 'fusion:content';

import '@wpmedia/shared-styles/scss/_small-promo.scss';

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const SmallManualPromo = ({ customFields }) => {
  const { arcSite } = useFusionContext();

  const resizedImageOptions = useContent({
    source: 'resize-image-api',
    query: { raw_image_url: customFields.imageURL, 'arc-site': arcSite },
  });
  const headlineClass = customFields.showImage ? 'col-sm-xl-8' : 'col-sm-xl-12 no-image-padding';

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

  return (
    <>
      <article className="container-fluid small-promo">
        <div className="row sm-promo-padding-btm">
          {(customFields.showHeadline && customFields.headline)
          && (
            <div className={headlineClass}>
              { renderWithLink((
                <HeadlineText
                  primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
                  className="sm-promo-headline"
                >
                  {customFields.headline}
                </HeadlineText>
              ), { className: 'sm-promo-headline' }) }
            </div>
          )}
          {(customFields.showImage && customFields.imageURL)
          && (
            <div className="col-sm-xl-4 right-aligned-container">
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
          )}
        </div>
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
  }),
};

SmallManualPromo.label = 'Small Manual Promo – Arc Block';

export default SmallManualPromo;
