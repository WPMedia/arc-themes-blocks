import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { Image } from '@wpmedia/engine-theme-sdk';
import { useContent } from 'fusion:content';

import '@wpmedia/shared-styles/scss/_medium-promo.scss';

const HANDLE_COMPRESSED_IMAGE_PARAMS = false;

const HeadlineText = styled.h1`
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
  return customFields.linkURL ? (
    <>
      <article className="container-fluid medium-promo">
        <div className={`medium-promo-wrapper ${hasImage ? 'md-promo-image' : ''}`}>
          {hasImage && (
            <a
              className="image-link"
              href={customFields.linkURL}
              title={customFields.headline}
              target={customFields.newTab ? '_blank' : '_self'}
              rel={customFields.newTab ? 'noreferrer noopener' : ''}
            >
              <Image
                compressedThumborParams={HANDLE_COMPRESSED_IMAGE_PARAMS}
                // medium is 16:9
                url={customFields.imageURL}
                alt={customFields.headline}
                smallWidth={274}
                smallHeight={154}
                mediumWidth={274}
                mediumHeight={154}
                largeWidth={400}
                largeHeight={225}
                breakpoints={breakpoints}
                resizerURL={getProperties(arcSite)?.resizerURL}
                resizedImageOptions={resizedImageOptions}
              />
            </a>
          )}
          {(customFields.showHeadline || customFields.showDescription)
          && (
            <>
              {(customFields.showHeadline && customFields.headline)
              && (
                <a
                  href={customFields.linkURL}
                  className="md-promo-headline"
                  title={customFields.headline}
                  target={customFields.newTab ? '_blank' : '_self'}
                  rel={customFields.newTab ? 'noreferrer' : ''}
                >
                  <HeadlineText
                    primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
                    className="md-promo-headline-text"
                  >
                    {customFields.headline}
                  </HeadlineText>
                </a>
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
  ) : null;
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
  }),
};

MediumManualPromo.label = 'Medium Manual Promo – Arc Block';

export default MediumManualPromo;
