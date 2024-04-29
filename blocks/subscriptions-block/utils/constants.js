export const ARCXP_CART = "ArcXP_cart";
export const STRIPEINTENTS = "StripeIntents";
export const PAYPAL = "PayPal";
export const APPLEPAY = "ApplePay";
export const GOOGLEPAY = "GooglePay";
export const RECAPTCHA_TOKEN = 'ArcXP_captchaToken';

export const verifyJSON = (string) => {
	try {
		return JSON.parse(string);
	} catch (e) {
		return false;
	}
};