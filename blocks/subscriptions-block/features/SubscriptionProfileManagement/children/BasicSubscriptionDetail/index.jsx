import React, {useState} from "react";
import { usePhrases, Stack, Button, Badge, Icon, Paragraph } from "@wpmedia/arc-themes-components";
import { getLocalDateString } from "../../../../components/utils";

export const ACTIVE = "Active";
export const CANCELED = "Canceled";
export const TERMINATED = "Terminated";

const StatusBadge = ({status, className}) => {
  const phrases = usePhrases();

  if(status === ACTIVE) {
    return <Badge variant="success">{phrases.t("subscriptions-block.subscription-profile-management-basic-subscription-details-statusBadge-active")}</Badge>
  }
  if(status === CANCELED) {
    return <Badge className={`${className}-cancel-badge`}>{phrases.t("subscriptions-block.subscription-profile-management-basic-subscription-details-statusBadge-canceled")}</Badge>
  }
  if(status === TERMINATED) {
    return <Badge variant="light">{phrases.t("subscriptions-block.subscription-profile-management-basic-subscription-details-statusBadge-terminated")}</Badge>
  }
  return null;
};

const LinkButton = ({status, sub, setSelectedSub, customFields, setIsCancelModalOpen, setIsResubModalOpen, className, setSelectedPrice, price}) => {
  const { showCancelLink, showResubscribeLink, offerURL } = customFields;
  const phrases = usePhrases();

  const viewSubOnClick = () => {
    window.location.href = offerURL;
  }

  const cancelSub = () => {
    setSelectedSub(sub);
    setIsCancelModalOpen(true);
    setSelectedPrice(price);
  }

  const reSubscribe = () => {
    setSelectedSub(sub);
    setIsResubModalOpen(true);
    setSelectedPrice(price);
  }

  if(status === ACTIVE && showCancelLink) return <Button onClick={cancelSub} className={`${className}-cancel`}>{phrases.t("subscriptions-block.subscription-profile-management-basic-subscription-details-link-active")}</Button>;
  if(status === CANCELED && showResubscribeLink) return <Button onClick={reSubscribe} className={`${className}-cancel`}>{phrases.t("subscriptions-block.subscription-profile-management-basic-subscription-details-link-canceled")}</Button>;
  if(status === TERMINATED) return <Button onClick={viewSubOnClick} className={`${className}-cancel`}>{phrases.t("subscriptions-block.subscription-profile-management-basic-subscription-details-link-terminated")}</Button>;
  return null;
}

const BasicSubscriptionDetail = ({sub, customFields, setSelectedSub, className, setIsCancelModalOpen, setIsResubModalOpen, setSelectedPrice, price, status }) => {
  const phrases = usePhrases();
  const [showCancelInfo, setShowCancelInfo] = useState(true);
  const startEvent = sub?.events?.find(s => s?.eventType === "START_SUBSCRIPTION");
  const startDate = startEvent?.eventDateUTC;
  const dateString = getLocalDateString(startDate);
  const cancelEvent = sub?.events?.find(s => s?.eventType === "CANCEL_SUBSCRIPTION");

  const cancelDateString = getLocalDateString(cancelEvent?.eventDateUTC);
  const nextEventDateString = getLocalDateString(sub?.nextEventDateUTC);

  return (
    <Stack  className={`${className}-div`}>
      <div className={`${className}-title-div`}>
        <span className={`${className}-title-sub-info`}>
          <span className={`${className}-title`}>{sub?.productName}</span>
          <span className={`${className}-subID`}>{`#${sub?.subscriptionID}`}</span>
          <em className={`${className}-startDate`}>{phrases.t("subscriptions-block.subscription-profile-management-basic-subscription-details-sub-start", {dateString})}</em>
        </span>
        <span>
          <LinkButton status={status} customFields={customFields} sub={sub} setSelectedSub={setSelectedSub} className={className} setIsCancelModalOpen={setIsCancelModalOpen} setIsResubModalOpen={setIsResubModalOpen} setSelectedPrice={setSelectedPrice} price={price}/>
          <StatusBadge status={status} className={className}/>
        </span>
      </div>
      {status === CANCELED && showCancelInfo && cancelDateString &&
        <div className={`${className}-cancel-info`}>
          <Paragraph>{phrases.t("subscriptions-block.subscription-profile-management-basic-subscription-details-sub-cancel", {cancelDateString, nextEventDateString})}</Paragraph>
          <button aria-label="cancel" type="button" className={`${className}-cancel-info-button`} onClick={() => setShowCancelInfo(false)}><Icon name="Close" /></button>
        </div>
      }
    </Stack>
  )
};

export default BasicSubscriptionDetail;