import React, { useState } from 'react';
import Sales from '@arc-publishing/sdk-sales';
import {
  CardElement, useElements,
} from '@stripe/react-stripe-js';

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
  stripeInstance,
}) {
  const [formStatus, setFormStatus] = useState('idle');

  // stripe hooks have to be within Elements wrapper
  // https://stripe.com/docs/stripe-js/react#useelements-hook
  const elements = useElements();

  const handleSubmit = async (
    event,
  ) => {
    event.preventDefault();

    setFormStatus('processing');
    const cardElement = elements.getElement('card');

    const { error, paymentMethod } = await stripeInstance.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {}, // todo: collect other info? eg. name, email, etc.
    });

    if (error) {
      setFormStatus('error');
      return;
    }

    const result = await stripeInstance.confirmCardSetup(clientSecret, {
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
      <button
        type="submit"
        disabled={formStatus === 'processing' || formStatus === 'success'}
      >
        Submit
      </button>
      {formStatus === 'processing' && <p>Processing...</p>}
      {formStatus === 'error' && <p>There was an error. Please try again.</p>}
      {formStatus === 'success' && <p>Payment successful!</p>}
    </form>
  );
}

export default PaymentForm;
