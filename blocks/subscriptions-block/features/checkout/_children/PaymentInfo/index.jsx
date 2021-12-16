import React, { useEffect, useState } from 'react';
import Sales from '@arc-publishing/sdk-sales';
import {
  Elements, CardElement, useStripe, useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const CARD_ELEMENT_OPTIONS = {
  // style: {
  //   base: {
  //     color: '#32325d',
  //     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //     fontSmoothing: 'antialiased',
  //     fontSize: '16px',
  //     '::placeholder': {
  //       color: '#aab7c4',
  //     },
  //   },
  //   invalid: {
  //     color: '#fa755a',
  //     iconColor: '#fa755a',
  //   },
  // },
};

function PaymentForm({
  orderNumber,
  successURL,
  paymentMethodID,
  clientSecret,
}) {
  const [formStatus, setFormStatus] = useState('idle');
  const elements = useElements();
  const stripe = useStripe();

  const handleSubmit = async (
    event,
  ) => {
    event.preventDefault();

    setFormStatus('processing');
    const cardElement = elements.getElement('card');

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {}, // todo: collect other info? eg. name, email, etc.
    });

    if (error) {
      setFormStatus('error');
      return;
    }

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (result.error) {
      setFormStatus('error');
    } else {
      await Sales.finalizePayment(
        orderNumber,
        paymentMethodID,
        result.setupIntent.id,
      );
      setFormStatus('success');
      window.location.href = successURL;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} name="card" />
      <button type="submit" disabled={formStatus === 'processing' || formStatus === 'success'}>Submit</button>
      {formStatus === 'processing' && <p>Processing...</p>}
      {formStatus === 'error' && <p>There was an error. Please try again.</p>}
      {formStatus === 'success' && <p>Payment successful!</p>}
    </form>
  );
}

const PaymentInfo = ({
  successURL, paymentDetails, orderNumber, paymentMethodID,
}) => {
  const [stripePromise, setStripePromise] = useState(null);
  const { parameter2: stripeKey, parameter1: clientSecret } = paymentDetails;

  // load stripe key via payment details
  useEffect(() => {
    const initPayment = async () => {
      try {
        // looks like pk string
        loadStripe(stripeKey).then((data) => setStripePromise(data));
      } catch (e) {
        console.log(e); // todo: error handling
      }
    };
    initPayment();
  }, [stripeKey]);

  if (stripePromise) {
    return (
      <Elements stripe={stripePromise}>
        <PaymentForm
          orderNumber={orderNumber}
          successURL={successURL}
          paymentMethodID={paymentMethodID}
          clientSecret={clientSecret}
        />
      </Elements>
    );
  }

  return null;
};

export default PaymentInfo;
