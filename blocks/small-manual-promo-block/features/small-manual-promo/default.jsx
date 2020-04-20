import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import '@wpmedia/shared-styles/scss/_small-promo.scss';
import { Image } from '@wpmedia/engine-theme-sdk';

const HeadlineText = styled.h1`
  font-family: ${(props) => props.primaryFont};
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
              href={customFields.linkURL}
              title={customFields.headline}
            >
              <Image
                url={customFields.imageURL}
                alt={customFields.headline}
                // small should be 3:2 aspect ratio
                smallWidth={274}
                smallHeight={183}
                mediumWidth={274}
                mediumHeight={183}
                largeWidth={400}
                largeHeight={267}
                breakpoints={getProperties(arcSite)?.breakpoints}
                resizerURL={getProperties(arcSite)?.resizerURL}
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
