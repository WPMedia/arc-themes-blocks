import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import '@wpmedia/shared-styles/scss/_medium-promo.scss';
import { Image } from '@wpmedia/engine-theme-sdk';

const HeadlineText = styled.h1`
  font-family: ${(props) => props.primaryFont};
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;

const MediumManualPromo = ({ customFields, arcSite }) => {
  const {
    breakpoints,
    resizerURL,
  } = getProperties(arcSite);
  const textClass = customFields.showImage ? 'col-sm-12 col-md-xl-8 flex-col' : 'col-sm-xl-12 flex-col';

  return customFields.linkURL ? (
    <article className="container-fluid medium-promo">
      <div className="row med-promo-padding-bottom">
        {(customFields.showImage && customFields.imageURL)
        && (
          <div className="col-sm-xl-4">
            <a
              href={customFields.linkURL}
              title={customFields.headline}
            >
              <Image
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
                resizerURL={resizerURL}
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
