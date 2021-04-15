import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';
import { useEditableContent } from 'fusion:content';
import { LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import { imageRatioCustomField } from '@wpmedia/resizer-image-block';
import { PromoHeadline, PromoImage } from '@wpmedia/shared-styles';

import '@wpmedia/shared-styles/scss/_large-promo.scss';

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

const LargeManualPromoItem = ({ customFields }) => {
  const { arcSite, isAdmin } = useFusionContext();
  const { searchableField } = useEditableContent();
  const textClass = customFields.showImage ? 'col-sm-12 col-md-xl-6 flex-col' : 'col-sm-xl-12 flex-col';

  return (
    <>
      <article className="container-fluid large-promo">
        <div className="row lg-promo-padding-bottom" style={{ position: isAdmin ? 'relative' : null }}>
          {(customFields.showImage && customFields.imageURL)
            ? (
              <div className="col-sm-12 col-md-xl-6" {...searchableField('imageURL')}>
                <PromoImage
                  {...customFields}
                  customImageURL={customFields.imageURL}
                  alt={customFields.headline}
                  promoSize="LG"
                />
              </div>
            ) : null}
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
                ? (
                  <PromoHeadline
                    link={customFields.linkURL}
                    text={customFields.headline}
                    newTab={customFields.newTab}
                    headingClassName="lg-promo-headline"
                    linkClassName="lg-promo-headline"
                  />
                ) : null}

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

const LargeManualPromo = ({ customFields }) => {
  const { isAdmin } = useFusionContext();
  if (customFields.lazyLoad && isServerSide() && !isAdmin) { // On Server
    return null;
  }
  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <LargeManualPromoItem customFields={{ ...customFields }} />
    </LazyLoad>
  );
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
    ...imageRatioCustomField('imageRatio', 'Art', '4:3'),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

LargeManualPromo.label = 'Large Manual Promo – Arc Block';

export default LargeManualPromo;
