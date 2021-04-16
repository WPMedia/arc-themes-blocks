import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useEditableContent } from 'fusion:content';
import { LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import { imageRatioCustomField } from '@wpmedia/resizer-image-block';
import { PromoDescription, PromoHeadline, PromoImage } from '@wpmedia/shared-styles';

import '@wpmedia/shared-styles/scss/_medium-promo.scss';

const MediumManualPromoItem = ({ customFields }) => {
  const { isAdmin } = useFusionContext();
  const { searchableField } = useEditableContent();

  const hasImage = customFields.showImage && customFields.imageURL;

  return (
    <>
      <article className="container-fluid medium-promo" style={{ position: isAdmin ? 'relative' : null }}>
        <div
          className={`medium-promo-wrapper ${hasImage ? 'md-promo-image' : ''}`}
          {...searchableField('imageURL')}
        >
          {(customFields.showImage && customFields.imageURL)
            ? (
              <div className="image-link">
                <PromoImage
                  {...customFields}
                  customImageURL={customFields.imageURL}
                  alt={customFields.headline}
                  promoSize="MD"
                />
              </div>
            ) : null}

          {(customFields.showHeadline || customFields.showDescription)
          && (
            <>
              {(customFields.showHeadline)
                ? (
                  <PromoHeadline
                    link={customFields.linkURL}
                    text={customFields.headline}
                    newTab={customFields.newTab}
                    headingClassName="md-promo-headline-text"
                    className="md-promo-headline"
                  />
                ) : null}
              {(customFields.showDescription && customFields.description)
                ? (
                  <PromoDescription
                    className="description-text"
                    text={customFields.description}
                  />
                ) : null}
            </>
          )}
        </div>
      </article>
      <hr />
    </>
  );
};

const MediumManualPromo = ({ customFields }) => {
  const { isAdmin } = useFusionContext();
  if (customFields.lazyLoad && isServerSide() && !isAdmin) { // On Server
    return null;
  }
  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <MediumManualPromoItem customFields={{ ...customFields }} />
    </LazyLoad>
  );
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
    ...imageRatioCustomField('imageRatio', 'Art', '16:9'),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

MediumManualPromo.label = 'Medium Manual Promo – Arc Block';

export default MediumManualPromo;
