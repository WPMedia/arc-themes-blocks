import React from "react";

export const PAYPAL = "paypal";
export const APPLEPAY = "applepay";
export const GOOGLEPAY = "googlepay";
export const VISA = "visa";
export const MASTERCARD = "mastercard";
export const AMERICANEXPRESS = "amex";
export const DISCOVER = "discover";
export const DINERS = "diners";
export const JCB = "jcb";
export const UNIONPAY = "unionpay";

// brands supported by StripeIntents https://docs.stripe.com/testing

const PaymentIcon = ({ type }) => {
	const lowerCasedType = type?.toLowerCase();
	switch (lowerCasedType) {
		case PAYPAL:
			return <img src={require("./Icons/paypal-icon.svg")} alt="Buy now with PayPal" height={20} />;
		case APPLEPAY:
			return (
				<img src={require("./Icons/applePay-icon.svg")} alt="Buy now with Apple Pay" height={19} />
			);
		case GOOGLEPAY:
			return (
				<img
					src={require("./Icons/googlePay-icon.svg")}
					alt="Buy now with Google Pay"
					height={19}
				/>
			);
		case VISA: {
			return <img src={require("./Icons/visa-icon.svg")} alt={VISA} height={16} />;
		}
		case MASTERCARD: {
			return <img src={require("./Icons/mastercard-icon.svg")} alt={MASTERCARD} height={16} />;
		}
		case AMERICANEXPRESS: {
			return <img src={require("./Icons/amex-icon.svg")} alt={AMERICANEXPRESS} height={16} />;
		}
		case DISCOVER: {
			return <img src={require("./Icons/discover-icon.svg")} alt={DISCOVER} height={16} />;
		}
		case DINERS: {
			return <img src={require("./Icons/diners-icon.svg")} alt={DINERS} height={16} />;
		}
		case JCB: {
			return <img src={require("./Icons/jcb-icon.svg")} alt={JCB} height={16} />;
		}
		case UNIONPAY: {
			return <img src={require("./Icons/unionpay-icon.svg")} alt={UNIONPAY} height={16} />;
		}
		default:
			return null;
	}
};

export default PaymentIcon;
