import React from "react";
import {usePaymentRedirect} from "../usePaymentRedirect"

export const PaypalCheckout = ({orderNumber}) => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  // because paypal can't pass back the orderNumber to us (like payment express does), we store it in local storage
  if (orderNumber) {
    localStorage.setItem('ArcSubs_OrderNumber', orderNumber);
  } else {
    orderNumber = localStorage.ArcSubs_OrderNumber;
  }

  const { error } = usePaymentRedirect(10, orderNumber, token, 'parameter1');

  return (
    <>
      <div>{token ? 'Processing...' : 'Redirecting to paypal page...'}</div>
      <pre>{error && JSON.stringify(error, null, 2)}</pre>
    </>
  );
};

PaypalCheckout.displayName = 'PaypalCheckout';

export default PaypalCheckout;