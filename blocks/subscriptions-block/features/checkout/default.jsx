import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { PrimaryFont } from '@wpmedia/shared-styles';
import useIdentity from '@wpmedia/identity-block/components/Identity';
import Cart from '../../components/Cart';
import ContactInfo from '../../components/ContactInfo';

import './styles.scss';

const Checkout = ({
  customFields,
}) => {
  const {
    offerURL,
  } = customFields;

  const { Identity } = useIdentity();
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const isLoggedIn = async () => {
      setIsLoggedIn(await Identity.isLoggedIn());
    };

    isLoggedIn();
  }, [Identity]);

  useEffect(() => {
    let isActive = true;

    if (loggedIn) {
      Identity.getUserProfile().then((userProfile) => {
        if (isActive) {
          setUser(userProfile);
        }
      }).catch(() => {
        setUser(false);
      });
    }

    // cancel subscription to useEffect
    return () => { isActive = false; return null; };
  }, [Identity, loggedIn]);

  const contactCallback = (contactInfo) => {
    console.log('Contact info returned from user: ', contactInfo);
  };

  const logoutCallback = () => {
    Identity.logout().then(() => {
      setUser(false);
    });
  };

  const { arcSite } = useFusionContext();
  const phrases = getTranslatedPhrases(getProperties(arcSite).locale || 'en');

  return (
    <PrimaryFont as="div" className="xpmedia-subscriptions-checkout">
      <PrimaryFont as="h1">{phrases.t('checkout-block.headline')}</PrimaryFont>
      <a href={offerURL} className="xpmedia-subscriptions-checkout--backlink">{phrases.t('checkout-block.back-to-offer-page')}</a>

      <Cart offerURL={offerURL} />
      <ContactInfo
        callback={contactCallback}
        user={user}
        logoutCallback={logoutCallback}
      />

    </PrimaryFont>
  );
};

Checkout.label = 'Checkout - Arc Block';

Checkout.icon = 'shop-cart';

Checkout.propTypes = {
  customFields: PropTypes.shape({
    offerURL: PropTypes.string.tag({
      defaultValue: '/offer/',
    }),
  }),
};

export default Checkout;
