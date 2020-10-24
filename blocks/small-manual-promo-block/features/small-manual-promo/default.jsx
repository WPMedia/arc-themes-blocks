import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import getPromoContainer from './_children/promo_container';
import getPromoStyle from './_children/promo_style';
import PromoManualHeadline from './_children/promo_manual_headline';
import PromoManualImage from './_children/promo_manual_image';

import '@wpmedia/shared-styles/scss/_small-promo.scss';

const SmallManualPromo = ({ customFields }) => {
  const imagePosition = customFields?.imagePosition || 'right';

  const headline = customFields.showHeadline && customFields.headline
    && (<PromoManualHeadline customFields={customFields} />);

  const image = customFields.showImage && customFields.imageURL
          && (<PromoManualImage customFields={customFields} />);

  const promoContainersStyles = {
    containerClass: getPromoStyle(imagePosition, 'container'),
    headlineClass: customFields.showImage
      ? 'col-sm-xl-8'
      : 'col-sm-xl-12 no-image-padding',
    imageClass: 'col-sm-xl-4',
  };

  return (
    <>
      <article className="container-fluid small-promo">
        {getPromoContainer(imagePosition, headline, image, promoContainersStyles)}
      </article>
      <hr />
    </>
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
  }),
};

SmallManualPromo.label = 'Small Manual Promo – Arc Block';

export default SmallManualPromo;
