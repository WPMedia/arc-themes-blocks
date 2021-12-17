import React, { useState } from 'react';
import Sales from '@arc-publishing/sdk-sales';
import {
  CardElement, useElements,
} from '@stripe/react-stripe-js';
import {
  PrimaryFont,
  Button,
  BUTTON_SIZES,
  BUTTON_STYLES,
} from '@wpmedia/shared-styles';

import './styles.scss';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#575757',
      fontSize: '16px',
    },
  },
};

function PaymentForm({
  orderNumber,
  successURL,
  paymentMethodID,
  clientSecret,
  stripeInstance,
  formTitle,
  formLabel,
  submitText,
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
    <PrimaryFont as="div">
      <h2 className="payment-form--title">
        {formTitle}
      </h2>
      <form onSubmit={handleSubmit} className="payment-form--form">
        <label
          className="xpmedia-form-field-label"
        >
          {formLabel}
          <CardElement options={CARD_ELEMENT_OPTIONS} name="card" />
        </label>
        <hr className="payment-form--hr" />
        <Button
          buttonSize={BUTTON_SIZES.MEDIUM}
          buttonStyle={BUTTON_STYLES.PRIMARY}
          fullWidth
          text={submitText}
          type="submit"
          disabled={formStatus === 'processing' || formStatus === 'success'}
        />
        {formStatus === 'processing' && <p>Processing...</p>}
        {formStatus === 'error' && <p>There was an error. Please try again.</p>}
        {formStatus === 'success' && <p>Payment successful!</p>}
      </form>
    </PrimaryFont>
  );
}

export default PaymentForm;
