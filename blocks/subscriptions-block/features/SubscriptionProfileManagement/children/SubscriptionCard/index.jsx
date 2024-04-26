import React, {useEffect, useState} from 'react';
import { Divider, Button, Paragraph, useSales, usePhrases } from "@wpmedia/arc-themes-components";
import BasicSubscriptionDetail from '../BasicSubscriptionDetail';
import PaymentMethodDetails from '../PaymentMethodDetails';
import BillingAddressDetails from "../BillingAddressDetails";

const SubscriptionCard = ({className, sub, customFields, setSelectedSub, setIsCancelModalOpen, setIsResubModalOpen, setSelectedPrice}) => {
  const [price, setPrice] = useState();
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
      />
      <Divider/>
      <PaymentMethodDetails sub={sub} setPrice={setPrice} className={`${className}-detail-payment`}/>
      <Divider/>
      <BillingAddressDetails sub={sub} className={`${className}-detail-billing`}/>
    </div>
  )
}

export default SubscriptionCard;