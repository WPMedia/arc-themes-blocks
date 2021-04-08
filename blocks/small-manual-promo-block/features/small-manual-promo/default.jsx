import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useEditableContent } from 'fusion:content';
import { LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import { imageRatioCustomField } from '@wpmedia/resizer-image-block';
import {
  PromoHeadline, PromoImage, SmallPromoContainer, SmallPromoStyles,
} from '@wpmedia/shared-styles';

const SmallManualPromoItem = ({ customFields }) => {
  const { searchableField } = useEditableContent();
  const { isAdmin } = useFusionContext();

  const imagePosition = customFields?.imagePosition || 'right';
  const headlineMarginClass = SmallPromoStyles(imagePosition, 'headlineMargin');

  const headlineOutput = customFields.showHeadline && customFields.headline
    && (
      <PromoHeadline
        text={customFields.headline}
        link={customFields.linkURL}
        className={headlineMarginClass}
        linkClassName="sm-promo-headline"
        headingClassName="sm-promo-headline"
      />
    );

  const image = customFields?.showImage && customFields.imageURL
    && (
      <div style={{ position: isAdmin ? 'relative' : null }}>
        <div {...searchableField('imageOverrideURL')}>
          <PromoImage
            customImageURL={customFields.imageURL}
            alt={customFields.headline}
            promoSize="SM"
            imageRatio={customFields.imageRatio}
            linkURL={customFields.linkURL}
            newTab={customFields.newTab}
          />
        </div>
      </div>
    );

  return SmallPromoContainer(headlineOutput, image, imagePosition);
};

const SmallManualPromo = ({ customFields = { showImage: true, showHeadline: true, imageRatio: '3:2' } }) => {
  const { isAdmin } = useFusionContext();
  if (customFields.lazyLoad && isServerSide() && !isAdmin) { // On Server
    return null;
  }
  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <SmallManualPromoItem customFields={{ ...customFields }} />
    </LazyLoad>
  );
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
    imagePosition: PropTypes.oneOf([
      'right', 'left', 'above', 'below',
    ]).tag({
      defaultValue: 'right',
      label: 'Image Position',
      group: 'Image',
      labels: {
        right: 'Image Right',
        left: 'Image Left',
        above: 'Image Above',
        below: 'Image Below',
      },
    }),
    ...imageRatioCustomField('imageRatio', 'Art', '3:2'),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

SmallManualPromo.label = 'Small Manual Promo – Arc Block';

export default SmallManualPromo;
