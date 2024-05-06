import React, { useState, useEffect } from 'react';
import { Divider, Paragraph, usePhrases } from "@wpmedia/arc-themes-components";
import BasicSubscriptionDetail, {ACTIVE, CANCELED, TERMINATED } from '../BasicSubscriptionDetail';
import PaymentMethodDetails from '../PaymentMethodDetails';
import BillingAddressDetails from "../BillingAddressDetails";

const getStatus = (sub) => {
  if(sub?.status === 1 || sub?.status === 4 || sub?.status === 6 || sub?.status === 7) return ACTIVE;
  if(sub?.status === 2) return TERMINATED;
  if(sub?.status === 3) return CANCELED;
  return ""
};

const SubscriptionCard = ({className, sub, customFields, setSelectedSub, setIsCancelModalOpen, setIsResubModalOpen, setSelectedPrice}) => {
  const phrases = usePhrases();
  const [price, setPrice] = useState();
  const [status, setStatus] = useState();

  const startEvent = sub?.events?.find(e => e?.eventType === "START_SUBSCRIPTION");
  const terminateEvent = sub?.events?.find(e => e?.eventType === "TERMINATE_SUBSCRIPTION");
  const startDate = new Date(startEvent?.eventDateUTC).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})
  const terminateDate = new Date(terminateEvent?.eventDateUTC).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})

  useEffect(() => {
    setStatus(getStatus(sub));
  }, [sub])

  return(
    <div className={`${className}-card`}>
      <BasicSubscriptionDetail 
        sub={sub} 
        customFields={customFields} 
        setSelectedSub={setSelectedSub} 
        className={`${className}-detail`} 
        setIsCancelModalOpen={setIsCancelModalOpen} 
        setIsResubModalOpen={setIsResubModalOpen}
        setSelectedPrice={setSelectedPrice}
        price={price}
        status={status}
      />
      { status !== TERMINATED ? 
        <>
          <Divider/>
          <PaymentMethodDetails sub={sub} setPrice={setPrice} className={`${className}-detail-payment`}/>
          <Divider/>
          <BillingAddressDetails sub={sub} className={`${className}-detail-billing`}/>
        </>
        :
          <div>
            <div className={`${className}-detail-inactive-sub`}>
              {phrases.t("subscriptions-block.subscription-profile-management-subscription-period-text")}
              <Paragraph>{` ${startDate} - ${terminateDate}`}</Paragraph>
            </div>
            <em><Paragraph className={`${className}-detail-inactive-sub-paragraph`}>{phrases.t("subscriptions-block.subscription-profile-management-subscription-period-paragraph", {terminateDate})}</Paragraph></em>
          </div>
        }
    </div>
  )
}

export default SubscriptionCard;