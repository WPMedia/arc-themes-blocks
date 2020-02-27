/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import '@arc-test-org/shared-styles/scss/_medium-promo.scss';
import { Image } from '@arc-test-org/engine-theme-sdk';

const HeadlineText = styled.h1`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const MediumManualPromo = ({ customFields, arcSite }) => {
  const textClass = customFields.showImage ? 'col-sm-12 col-md-xl-8 flex-col' : 'col-sm-xl-12 flex-col';

  return customFields.linkURL ? (
    <article className="container-fluid medium-promo">
      <div className="row med-promo-padding-bottom">
        {(customFields.showImage && customFields.imageURL)
        && (
          <div className="col-sm-xl-4">
            <a
              href={customFields.imageURL}
              title={customFields.headline}
            >
              <Image
                url={customFields.imageURL}
                alt={customFields.headline}
                smallWidth={275}
                smallHeight={0}
                mediumWidth={275}
                mediumHeight={0}
                largeWidth={275}
                largeHeight={0}
              />
            </a>
          </div>
        )}
        {(customFields.showHeadline || customFields.showDescription)
        && (
          <div className={textClass}>
            {(customFields.showHeadline && customFields.headline)
            && (
              <a
                href={customFields.linkURL}
                className="md-promo-headline"
                title={customFields.headline}
              >
                <HeadlineText
                  primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
                  className="md-promo-headline"
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

MediumManualPromo.propTypes = {
  customFields: PropTypes.shape({
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
    headline: PropTypes.string.tag({
      name: 'Headline',
      group: 'Content',
    }),
    description: PropTypes.string.tag({
      name: 'Description',
      group: 'Content',
    }),
    imageURL: PropTypes.string.tag({
      name: 'Image URL',
      group: 'Content',
    }),
    linkURL: PropTypes.string.tag({
      name: 'Link URL',
      group: 'Content',
    }),
  }),

};

MediumManualPromo.label = 'Medium Manual Promo – Arc Block';

export default MediumManualPromo;
