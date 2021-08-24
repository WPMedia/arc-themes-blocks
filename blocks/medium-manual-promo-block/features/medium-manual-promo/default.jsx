import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useFusionContext } from 'fusion:context';
import { LazyLoad, isServerSide } from '@wpmedia/engine-theme-sdk';
import { imageRatioCustomField } from '@wpmedia/resizer-image-block';
import { MediumPromoPresentation } from '@wpmedia/shared-styles';

const MediumManualPromo = ({ customFields }) => {
  const { isAdmin } = useFusionContext();
  if (customFields?.lazyLoad && isServerSide() && !isAdmin) { // On Server
    return null;
  }

  return (
    <LazyLoad enabled={customFields?.lazyLoad && !isAdmin}>
      <MediumPromoPresentation {...customFields} />
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

MediumManualPromo.icon = 'paragraph-bullets';

export default MediumManualPromo;
