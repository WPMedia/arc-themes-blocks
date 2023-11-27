import { useState, useEffect } from 'react';
import Identity from '@arc-publishing/sdk-identity';
import useSales from "./useSales";

export const usePaymentRedirect = (
  paymentMethodType,
  orderNumber,
  token,
  redirectURLParameterName = 'parameter1',
  captchaToken
) => {
  const {Sales} = useSales();
  const [error, setError] = useState();
  const [currentMerchantId, setCurrentMerchantId] = useState();
  const [currentOrder, setCurrentOrder] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
      
        await Sales.getPaymentOptions();
        const option =
          Sales.paymentOptions.find(option => option.paymentMethodType === paymentMethodType) || {};
        setCurrentMerchantId(option.paymentMethodID);
        const loggedIn = await Identity.isLoggedIn();
        setIsLoggedIn(loggedIn);
        if (!Sales.currentOrder && !token && isLoggedIn) {
          const order = await Sales.getOrderDetails(orderNumber);
      
          setCurrentOrder(order);
        } else if (Sales.currentOrder) {
      
          setCurrentOrder(Sales.currentOrder);
        } else if (token || (!isLoggedIn && orderNumber)) {
      
          setCurrentOrder({ orderNumber });
        } else {
      
          setError('No order number found');
        }
      } catch (e) {
        console.error(e);
        setError(e);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
  
    if (token && currentMerchantId) {
      const finalizePayment = async () => {
    
        try {
          await Sales.finalizePayment(orderNumber, currentMerchantId, token, null, captchaToken);
          localStorage.setItem('captcha', '');
          window.location.href = '/success';
        } catch (e) {
          setError(e);
        }
      };

      if (currentOrder) {
        finalizePayment();
      }
    } else {
      const initPayment = async () => {
        const config = await Sales.getConfig();
    
        try {
          if (
            currentOrder &&
            currentOrder.orderNumber &&
            (!config.checkoutRecaptchaEnabled ||
              (config.checkoutRecaptchaEnabled && captchaToken && captchaToken !== 'null'))
          ) {
            const payment = await Sales.initializePayment(
              currentOrder.orderNumber,
              currentMerchantId
            );
            window.location.href = payment[redirectURLParameterName];
          }
        } catch (e) {
          setError(e);
        }
      };

      if (currentOrder && currentMerchantId) {
    
        initPayment();
      }
    }
  }, [currentOrder, currentMerchantId, captchaToken, token]);

  return { error };
};
