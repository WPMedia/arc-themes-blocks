import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { PrimaryFont } from '@wpmedia/shared-styles';

import Cart from '../../components/Cart';

import './styles.scss';

const Checkout = ({
  customFields,
}) => {
  const {
    offerURL,
  } = customFields;

  const { arcSite } = useFusionContext();
  const phrases = getTranslatedPhrases(getProperties(arcSite).locale || 'en');

  return (
    <PrimaryFont as="div" className="xpmedia-subscriptions-checkout">
      <PrimaryFont as="h1">{phrases.t('checkout-block.headline')}</PrimaryFont>
      <a href={offerURL} className="xpmedia-subscriptions-checkout--backlink">{phrases.t('checkout-block.back-to-offer-page')}</a>

      <Cart offerURL={offerURL} />
    </PrimaryFont>
  );
};

Checkout.label = 'Checkout - Arc Block';

Checkout.icon = 'shop-cart';

Checkout.propTypes = {
  customFields: {
    offerURL: PropTypes.string.tag({
      defaultValue: '/offer/',
    }),
  },
};

export default Checkout;
