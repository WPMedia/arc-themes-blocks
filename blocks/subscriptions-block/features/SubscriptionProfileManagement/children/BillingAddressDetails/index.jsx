import React from "react";
import { usePhrases, Paragraph } from "@wpmedia/arc-themes-components";

const BillingAddressDetails = ({sub, className}) => {

const phrases = usePhrases();

  const generateAddressString = (address) => {
    let addressString = "";
    if(address?.line1) {
      addressString = addressString.concat(address?.line1);
      if(address?.line2) {
        addressString = addressString.concat(" ", address?.line2);
      }
      addressString = addressString.concat(", ");
    }
    if(address?.locality) {
      addressString = addressString.concat(address?.locality, ", ")
    }
    if(address?.region) {
      addressString = addressString.concat(address?.region, " ")
    }
    if(address?.postal) {
      addressString = addressString.concat(address?.postal)
    }
    if(address?.country) {
      addressString = addressString.concat(" ", address?.country)
    }
    return addressString;
  }
  
  const addressString = generateAddressString(sub?.billingAddress);
  return <div className={className}>
    <span className={`${className}-subtitle`}>{phrases.t("subscriptions-block.subscription-profile-management-billing-address")}</span>
    <Paragraph>{addressString}</Paragraph>
  </div>
};

export default BillingAddressDetails;