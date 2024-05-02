import React from "react";

import { Icon } from "@wpmedia/arc-themes-components";

export const AMERICANEXPRESS = "amex";
export const APPLEPAY = "ApplePay";
export const DINERS = "diners";
export const DISCOVER = "discover";
export const GOOGLEPAY = "GooglePay";
export const JCB = "jcb";
export const MASTERCARD = "mastercard";
export const PAYPAL = "PayPal";
export const UNIONPAY = "unionpay";
export const VISA = "visa";

const PaymentIcon = ({ type }) => {

	switch (type) {
		case AMERICANEXPRESS:
			return <Icon name={"Amex"} width={24} height={16} viewBox="0 0 24 16" />;
		case APPLEPAY:
			return <Icon name={APPLEPAY} width={48} height={20} viewBox="0 0 48 20" />;
		case DINERS:
			return <Icon name={"Diners"} width={24} height={16} viewBox="0 0 24 16" />;
		case DISCOVER:
			return <Icon name={"Discover"} width={24} height={16} viewBox="0 0 24 16" />;
		case GOOGLEPAY:
			return <Icon name={GOOGLEPAY} width={50} height={21} viewBox="0 0 50 21" />;
		case JCB:
			return <Icon name={"Jcb"} width={23} height={16} viewBox="0 0 23 16" />;
		case MASTERCARD:
			return <Icon name={"Mastercard"} width={24} height={16} viewBox="0 0 24 16" />;
		case PAYPAL:
			return <Icon name={PAYPAL} width={86} height={22} viewBox="0 0 86 22" />;
		case UNIONPAY:
			return <Icon name={"Unionpay"} width={22} height={14} viewBox="0 0 22 14" />;
		case VISA:
			return <Icon name={"Visa"} width={24} height={16} viewBox="0 0 24 16" />;
		default:
			return null;
	}
};

export default PaymentIcon;
