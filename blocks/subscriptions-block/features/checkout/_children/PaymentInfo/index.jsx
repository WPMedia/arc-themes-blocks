import React, { useEffect, useState } from 'react';
import {
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PaymentInfo = ({
  orderNumber,
  paymentDetails,
  paymentMethodID,
  successURL,
}) => {
  const [stripeInstance, setStripeInstance] = useState(null);

  // initialized payment doc https://redirector.arcpublishing.com/alc/docs/api/arc-sdks/interfaces/_sdk_sales_src_sdk_order_.initializedpayment.html
  const { parameter2: stripeKey, parameter1: clientSecret } = paymentDetails;

  // load stripe key via payment details stripe key string
  useEffect(() => {
    // stripe docs https://stripe.com/docs/stripe-js/react#elements-provider
    loadStripe(stripeKey)
      .then((newStripePromise) => setStripeInstance(newStripePromise));
  }, [stripeKey]);

  if (stripeInstance) {
    // elements wrapper has to contain any stripe hooks
    return (
      <Elements stripe={stripeInstance}>
        <PaymentForm
          clientSecret={clientSecret}
          orderNumber={orderNumber}
          paymentMethodID={paymentMethodID}
          successURL={successURL}
          stripeInstance={stripeInstance}
        />
      </Elements>
    );
  }

  return null;
};

export default PaymentInfo;
