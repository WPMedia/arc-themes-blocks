import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { Image } from '@wpmedia/engine-theme-sdk';
import { useContent } from 'fusion:content';

import '@wpmedia/shared-styles/scss/_large-promo.scss';

const HeadlineText = styled.h1`
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

const OverlineHeader = styled.h1`
  font-family: ${(props) => props.primaryFont};
  font-weight: bold;
  text-decoration: none;
`;

const LargeManualPromo = ({ customFields }) => {
  const { arcSite } = useFusionContext();
  const textClass = customFields.showImage ? 'col-sm-12 col-md-xl-6 flex-col' : 'col-sm-xl-12 flex-col';

  const resizedImageOptions = useContent({
    source: 'resize-image-api',
    query: { raw_image_url: customFields.imageURL, 'arc-site': arcSite },
  });

  return customFields.linkURL ? (
    <article className="container-fluid large-promo">
      <div className="row lg-promo-padding-bottom">
        {(customFields.showImage && customFields.imageURL)
        && (
          <div className="col-sm-12 col-md-xl-6">
            <a
              href={customFields.linkURL}
              title={customFields.headline}
              target={customFields.newTab ? '_blank' : '_self'}
              rel={customFields.newTab ? 'noreferrer noopener' : ''}
            >
              <Image
                url={customFields.imageURL}
                alt={customFields.headline}
                // large promo has 4:3
                smallWidth={274}
                smallHeight={206}
                mediumWidth={274}
                mediumHeight={206}
                largeWidth={377}
                largeHeight={283}
                breakpoints={getProperties(arcSite)?.breakpoints}
                resizerURL={getProperties(arcSite)?.resizerURL}
                resizedImageOptions={resizedImageOptions}
              />
            </a>
          </div>
        )}
        {(customFields.showHeadline || customFields.showDescription
          || customFields.showOverline)
        && (
          <div className={textClass}>
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
            && (
              <a
                href={customFields.linkURL}
                className="lg-promo-headline"
                title={customFields.headline}
                target={customFields.newTab ? '_blank' : '_self'}
                rel={customFields.newTab ? 'noreferrer' : ''}
              >
                <HeadlineText
                  primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
                  className="lg-promo-headline"
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
          </div>
        )}
      </div>
    </article>
  ) : null;
};

LargeManualPromo.propTypes = {
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
    showOverline: PropTypes.bool.tag({
      label: 'Show overline',
      defaultValue: true,
      group: 'Show promo elements',
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
    showDescription: PropTypes.bool.tag({
      label: 'Show description',
      defaultValue: true,
      group: 'Show promo elements',
    }),
  }),
};

LargeManualPromo.label = 'Large Manual Promo – Arc Block';

export default LargeManualPromo;
