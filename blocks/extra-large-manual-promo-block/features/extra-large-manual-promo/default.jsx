import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import '@arc-test-org/shared-styles/scss/_extra-large-promo.scss';
import { Image } from '@arc-test-org/engine-theme-sdk';

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

const ExtraLargeManualPromo = ({ customFields, arcSite }) => (customFields.linkURL ? (
  <article className="container-fluid xl-large-promo">
    <div className="row xl-promo-padding-bottom">
      {(customFields.showHeadline || customFields.showDescription
          || customFields.showOverline)
        && (
          <div className="col-sm-xl-12 flex-col">
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
                className="xl-promo-headline"
                title={customFields.headline}
              >
                <HeadlineText
                  primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
                  className="xl-promo-headline"
                >
                  {customFields.headline}
                </HeadlineText>
              </a>
            )}
            {(customFields.showImage && customFields.imageURL)
            && (
              <a
                href={customFields.linkURL}
                title={customFields.headline}
              >
                <Image
                  url={customFields.imageURL}
                  alt={customFields.headline}
                  smallWidth={400}
                  smallHeight={300}
                  mediumWidth={600}
                  mediumHeight={450}
                  largeWidth={800}
                  largeHeight={600}
                />
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
) : null);

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
    }),
    linkURL: PropTypes.string.tag({
      label: 'Link URL',
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
  }),
};

ExtraLargeManualPromo.label = 'Extra Large Manual Promo – Arc Block';

export default ExtraLargeManualPromo;
