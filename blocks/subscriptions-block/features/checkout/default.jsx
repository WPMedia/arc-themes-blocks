import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { PrimaryFont } from '@wpmedia/shared-styles';
import useIdentity from '@wpmedia/identity-block/components/Identity';
import useSales from '../../components/useSales';
import Cart from '../../components/Cart';
import ContactInfo from '../../components/ContactInfo';
import PaymentInfo from './_children/PaymentInfo';

import './styles.scss';

const Checkout = ({
  customFields,
}) => {
  const {
    offerURL,
    successURL,
  } = customFields;
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [signedInIdentity, setSignedInIdentity] = useState(false);
  const [orderNumber, setOrderNumber] = useState();
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [payment, setPayment] = useState();
  const [paymentMethodID, setPaymentMethodID] = useState();

  const { Identity, getSignedInIdentity } = useIdentity();
  const { Sales } = useSales();

  const { arcSite } = useFusionContext();
  const phrases = getTranslatedPhrases(getProperties(arcSite).locale || 'en');

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
          setSignedInIdentity(getSignedInIdentity(userProfile));
        }
      }).catch(() => {
        setUser(false);
      });
    }

    // cancel subscription to useEffect
    return () => { isActive = false; return null; };
  }, [Identity, getSignedInIdentity, loggedIn]);

  const logoutCallback = () => {
    Identity.logout().then(() => {
      setUser(false);
    });
  };
  const createNewOrder = ({
    email, firstName, lastName, country,
  }) => {
    if (user) {
      Identity.updateUserProfile({ firstName, lastName });
    }
    Sales.createNewOrder({ country }, email).then((order) => {
      setOrderNumber(order.orderNumber);
      Sales.getPaymentOptions().then((paymentOptions) => {
        const newPaymentMethodID = paymentOptions[0].paymentMethodID;
        Sales.initializePayment(order.orderNumber, paymentOptions[0].paymentMethodID)
          .then((paymentObject) => {
            setPayment(paymentObject);
            // setting here but not by design
            setPaymentMethodID(newPaymentMethodID);
            setShowPaymentScreen(true);
          });
      });
    });
  };

  return (
    <PrimaryFont as="div" className="xpmedia-subscriptions-checkout">
      <PrimaryFont as="h1">{phrases.t('checkout-block.headline')}</PrimaryFont>
      <a href={offerURL} className="xpmedia-subscriptions-checkout--backlink">{phrases.t('checkout-block.back-to-offer-page')}</a>

      <Cart offerURL={offerURL} />

      {!showPaymentScreen
        ? (
          <ContactInfo
            callback={createNewOrder}
            user={user}
            signedInIdentity={signedInIdentity}
            logoutCallback={logoutCallback}
          />
        )
        : (
          <PaymentInfo
            orderNumber={orderNumber}
            paymentDetails={payment}
            paymentMethodID={paymentMethodID}
            successURL={successURL}
          />
        )}
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
    successURL: PropTypes.string.tag({
      defaultValue: '/',
      label: 'Success URL',
    }),
  }),
};

export default Checkout;
