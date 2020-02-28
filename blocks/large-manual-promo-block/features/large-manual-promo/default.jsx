/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import '@arc-test-org/shared-styles/scss/_large-promo.scss';
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

const LargeManualPromo = ({ customFields, arcSite }) => {
  const textClass = customFields.showImage ? 'col-sm-12 col-md-xl-6 flex-col' : 'col-sm-xl-12 flex-col';

  return customFields.linkURL ? (
    <article className="container-fluid large-promo">
      <div className="row lg-promo-padding-bottom">
        {(customFields.showImage && customFields.imageURL)
        && (
          <div className="col-sm-12 col-md-xl-6">
            <a
              href={customFields.linkURL}
              title={customFields.headline}
            >
              <Image
                url={customFields.imageURL}
                alt={customFields.headline}
                smallWidth={274}
                smallHeight={148}
                mediumWidth={274}
                mediumHeight={148}
                largeWidth={377}
                largeHeight={272}
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
      name: 'Headline',
      group: 'Configure Content',
    }),
    description: PropTypes.string.tag({
      name: 'Description',
      group: 'Configure Content',
    }),
    overline: PropTypes.string.tag({
      name: 'Overline',
      group: 'Configure Content',
    }),
    overlineURL: PropTypes.string.tag({
      name: 'Overline URL',
      group: 'Configure Content',
    }),
    imageURL: PropTypes.string.tag({
      name: 'Image URL',
      group: 'Configure Content',
    }),
    linkURL: PropTypes.string.tag({
      name: 'Link URL',
      group: 'Configure Content',
    }),
    showOverline: PropTypes.bool.tag(
      {
        name: 'Show overline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showHeadline: PropTypes.bool.tag(
      {
        name: 'Show headline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showImage: PropTypes.bool.tag(
      {
        name: 'Show image',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showDescription: PropTypes.bool.tag(
      {
        name: 'Show description',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
  }),

};

LargeManualPromo.label = 'Large Manual Promo – Arc Block';

export default LargeManualPromo;
