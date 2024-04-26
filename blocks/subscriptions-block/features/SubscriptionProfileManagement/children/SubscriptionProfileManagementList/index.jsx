import React, { useState } from 'react';
import { Button, Paragraph, useSales, usePhrases } from "@wpmedia/arc-themes-components";
import SubscriptionCard from "../SubscriptionCard";
import SubscriptionOverlay from "../../../../components/SubscriptionOverlay";

const Modal = ({title, children, primaryBtnText, secondaryBtnText, primaryAction, secondaryAction, className }) => (
    <div className={`${className}-modal`}>
      <h2 className={`${className}-modal-title`}>{title}</h2>
      {children}
      <div className={`${className}-modal-button-div`}>
        <Button variant="secondary" onClick={secondaryAction}>{secondaryBtnText}</Button>
        <Button variant="primary" onClick={primaryAction}>{primaryBtnText}</Button>
      </div>
    </div>
  )

const SubscriptionProfileManagementList = ({subscriptions, fetchSubs, className, customFields}) => {
  const {Sales} = useSales();
  const phrases = usePhrases();
  const filteredList = subscriptions.filter(sub => {
    const paymentPartner = sub?.currentPaymentMethod?.paymentPartner;
    const nonPaidTypes = ["EmailGroupSubPaymentProvider", "Gift", "Free", "Linked", "Sharing", "SwG"]
    if(paymentPartner && !nonPaidTypes.includes(paymentPartner)) {
      return true;
    }
    return false;
  })
  const [selectedSub, setSelectedSub] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState();
  const [isResubModalOpen, setIsResubModalOpen] = useState();

  const cancelSub = async () => {
    try {
      await Sales.cancelSubscription(selectedSub?.subscriptionID);
      setIsCancelModalOpen(false);
      fetchSubs();
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  }

  const reSubscribe = async () => {
    try {
      await Sales.rescueSubscription(selectedSub?.subscriptionID);
      setIsResubModalOpen(false);
      fetchSubs();
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  }

  const nextPaymentDate = new Date(selectedPrice?.paymentDate).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})
  const closeCancelModal = () => {
    setSelectedSub(null);
    setIsCancelModalOpen(false);
    setSelectedPrice(null);
  }
  const closeResubModal = () => {
    setSelectedSub(null);
    setIsResubModalOpen(false);
    setSelectedPrice(null);
  }

  return (
    <div>
      {filteredList.map((sub) => (
        <SubscriptionCard 
          className={className} 
          sub={sub} 
          key={sub?.subscriptionID} 
          customFields={customFields} 
          setSelectedSub={setSelectedSub} 
          setIsCancelModalOpen={setIsCancelModalOpen} 
          setIsResubModalOpen={setIsResubModalOpen}
          setSelectedPrice={setSelectedPrice}
        />
      ))}
      {isCancelModalOpen && <SubscriptionOverlay usePortal className={className}>
        <Modal 
          title={phrases.t("subscriptions-block.subscription-profile-management-basic-subscription-details-link-active")} 
          className={className}
          primaryAction={cancelSub}
          primaryBtnText={phrases.t("subscriptions-block.subscription-profile-management-cancel-modal-primary-button-text")}
          secondaryAction={closeCancelModal}
          secondaryBtnText={phrases.t("subscription-block.shared-No")}
        >
          <Paragraph>{phrases.t("subscriptions-block.subscription-profile-management-cancel-modal-paragraph1", {productName: selectedSub?.productName})}</Paragraph>
          <Paragraph>{phrases.t("subscriptions-block.subscription-profile-management-cancel-modal-paragraph2")}</Paragraph>
        </Modal>
      </SubscriptionOverlay>}
      {isResubModalOpen && nextPaymentDate && <SubscriptionOverlay usePortal className={className}>
        <Modal 
          title={phrases.t("subscriptions-block.subscription-profile-management-resub-modal-title")}
          className={className}
          primaryAction={reSubscribe}
          primaryBtnText={phrases.t("subscriptions-block.subscription-profile-management-resub-modal-primary-button-text")}
          secondaryAction={closeResubModal}
          secondaryBtnText={phrases.t("subscription-block.shared-No")}
        >
          <Paragraph>{`The subscription will be active and you can continue using it. The next charge will take place on ${nextPaymentDate}.`}</Paragraph>
          <Paragraph>{phrases.t("subscriptions-block.subscription-profile-management-resub-modal-paragraph2")}</Paragraph>
        </Modal>
      </SubscriptionOverlay>}
    </div>
  );
}

export default SubscriptionProfileManagementList;