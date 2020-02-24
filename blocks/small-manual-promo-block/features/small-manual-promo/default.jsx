import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import './small-promo.scss';
import { Image } from '@arc-test-org/engine-theme-sdk';

const HeadlineText = styled.h1`
  font-family: ${props => props.primaryFont};
`;

const SmallManualPromo = ({ customFields, arcSite }) => {
  const headlineClass = customFields.showImage ? 'col-sm-xl-8' : 'col-sm-xl-12 no-image-padding';

  return customFields.linkURL ? (
    <article className="container-fluid small-promo">
      <div className="row sm-promo-padding-btm">
        {(customFields.showHeadline && customFields.headline)
        && (
          <div className={headlineClass}>
            <a
              href={customFields.linkURL}
              className="sm-promo-headline"
              title={customFields.headline}
            >
              <HeadlineText
                primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
                className="sm-promo-headline"
              >
                {customFields.headline}
              </HeadlineText>
            </a>
          </div>
        )}
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
                smallWidth={800}
                smallHeight={0}
                mediumWidth={800}
                mediumHeight={0}
                largeWidth={800}
                largeHeight={0}
              />
            </a>
          </div>
        )}
      </div>
    </article>
  ) : null;
};

SmallManualPromo.propTypes = {
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
    headline: PropTypes.string.tag({
      name: 'Headline',
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

SmallManualPromo.label = 'Small Manual Promo – Arc Block';

export default SmallManualPromo;
