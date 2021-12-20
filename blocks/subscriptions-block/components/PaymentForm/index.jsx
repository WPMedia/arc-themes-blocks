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

    let result;

    // if order of $0 there's a different stripe logic
    const totalOrder = Sales.currentOrder.total;

    if (totalOrder > 0) {
      result = await stripeInstance.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
    } else {
      result = await stripeInstance.confirmCardSetup(clientSecret, {
        payment_method: paymentMethod.id,
      });
    }

    if (result.error) {
      setFormStatus('error');
      return;
    }

    if (totalOrder > 0) {
      const nonZeroPriceOutput = await Sales.finalizePayment(
        orderNumber,
        paymentMethodID,
        // using paymentIntent here for greater than 0
        result.paymentIntent.id,
      );
      // todo: remove logging once we can validate logic
      console.log('nonZeroPriceOutput', nonZeroPriceOutput);
      setFormStatus('success');
      window.location.href = successURL;
    } else {
      const zeroPriceOutput = await Sales.finalizePayment(
        orderNumber,
        paymentMethodID,
        // using setupIntent here for 0
        result.setupIntent.id,
      );
      // todo: remove logging once we can validate logic
      console.log(zeroPriceOutput, 'zeroPriceOutput');
      setFormStatus('success');
      window.location.href = successURL;
    }
  };

  return (
    <PrimaryFont as="div" className="payment-form--container">
      <h2 className="payment-form--title">
        {formTitle}
      </h2>
      <form onSubmit={handleSubmit} className="payment-form--form">
        <label
          className="xpmedia-form-field-label"
        >
          {formLabel}
        </label>
        <div className="payment-form--stripe-input-container">
          <CardElement options={CARD_ELEMENT_OPTIONS} name="card" />
        </div>
        <hr className="payment-form--hr" />
        <Button
          buttonSize={BUTTON_SIZES.MEDIUM}
          buttonStyle={BUTTON_STYLES.PRIMARY}
          fullWidth
          text={submitText}
          type="submit"
          disabled={formStatus === 'processing' || formStatus === 'success'}
        />
      </form>
    </PrimaryFont>
  );
}

export default PaymentForm;
