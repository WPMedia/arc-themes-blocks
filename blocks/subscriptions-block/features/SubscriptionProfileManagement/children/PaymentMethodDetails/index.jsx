import React, {useState, useEffect} from 'react';
import { usePhrases, Paragraph } from "@wpmedia/arc-themes-components";
import usePrice from "../../../../components/usePrice";
import {getNextRate} from "../../../../components/utils";
import {NextRate} from "../../../../components/PriceRates";
import PaymentIcon from "../../../../components/PaymentIcons";

const PaymentString = ({sub}) => {
  const phrases = usePhrases();
  const expDate = sub?.currentPaymentMethod?.expiration;
  const expDateString = expDate ?`${expDate.slice(0,2)}/${expDate.slice(2)}` : '';
  const creditCardType = sub?.currentPaymentMethod?.creditCardType;
  const lastFour = sub?.currentPaymentMethod?.lastFour;
  if (!creditCardType || !lastFour || !expDateString) return "";
  return <span>{phrases.t("subscriptions-block.subscription-profile-management-payment-method-details-payment-string", { creditCardType, lastFour, exp: expDateString })}</span>;
}

const NextBillStatement = ({price}) => {
  const phrases = usePhrases();
  const currency = price?.pricingStrategy?.currencyCode;
  const amount = `${currency === "USD" ? "$" : `${currency} `}${price?.price}`;
  const date = new Date(price?.paymentDate).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})
  return <Paragraph>{phrases.t("subscriptions-block.subscription-profile-management-payment-method-details-billing-statement", { amount, date })}</Paragraph>
};

const PaymentMethodDetails = ({sub, className, setPrice}) => {
  const phrases = usePhrases();
  const [nextRate, setNextRate] = useState(null);
  const startDate = sub?.events?.find(e => e?.eventType === "START_SUBSCRIPTION")?.eventDateUTC;
  const { price } = usePrice({priceCode: sub?.priceCode, cycleIndex: sub?.currentRetailCycleIDX, startDate});

  useEffect(() => {
    setPrice(price);
  }, [price, setPrice]);
  
  useEffect(() => {
    if(price && sub) {
      const rate = getNextRate(sub?.currentRetailCycleIDX, price?.pricingStrategy);
      setNextRate(rate);
    }
  }, [price, sub]);

  return (
    <div className={`${className}-container`}>
      <div className={`${className}-title`}>
        <span className={`${className}-title-span`}>
          {phrases.t("subscription-block.shared-Payment-method")}
          <div className={`${className}-title-payment-info`}>
            <PaymentIcon type={sub?.currentPaymentMethod?.creditCardType}/>
            <Paragraph><PaymentString sub={sub} /></Paragraph>
          </div>
        </span>
      </div>
      <div className={`${className}-next-bill`}>{phrases.t("subscriptions-block.subscription-profile-management-payment-method-details-next-bill")}<NextBillStatement price={price} /></div>
      <em className={`${className}-billing-frequency`}>
        {nextRate && 
          <span>
            <NextRate nextRate={nextRate} />
          </span>
        }
      </em>
    </div>
  )
}

export default PaymentMethodDetails;