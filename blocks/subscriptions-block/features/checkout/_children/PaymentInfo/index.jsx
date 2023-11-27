import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useSales from "../../../../components/useSales";

import { usePhrases, Button, Paragraph } from "@wpmedia/arc-themes-components";

import PaymentForm from "../../../../components/PaymentForm";
import PayPal from "../../../../components/PayPal";

const PaymentInfo = ({ successURL, className, userInfo, offerURL, paypal }) => {
	const {Sales} = useSales();

	const [stripeInstance, setStripeInstance] = useState(null);
	const [isStripe, setIsStripe] = useState(false);
	const [isPayPal, setIsPayPal] = useState(false);
	// initialized payment doc https://redirector.arcpublishing.com/alc/en/arc-xp-subscriptions-sdks?id=kb_article_view&sys_kb_id=7770d58747447990eee38788436d4362&spa=1
	const [orderNumber, setOrderNumber] = useState();
	const [payment, setPayment] = useState({});
	const [paymentMethodID, setPaymentMethodID] = useState();
	const phrases = usePhrases();

	const formErrorText = phrases.t("subscriptions-block.payment-error");
	const formLabel = phrases.t("subscriptions-block.credit-card-information");
	const formTitle = phrases.t("subscriptions-block.payment-information");
	const submitText = phrases.t("subscriptions-block.submit-payment");

	// load stripe key via payment details stripe key string
	const { parameter2: stripeKey, parameter1: clientSecret } = payment;

	useEffect(() => {
		if(isStripe) {
			const STRIPE_PAYMENT_METHOD_ID = 18;
			Sales.getCart().then((cart) => {
			if (!cart?.items?.length) {
				window.location.href = offerURL;
				return;
			}else{
				const {country, email} = userInfo;
				Sales.createNewOrder({ country }, email).then((order) => {
					setOrderNumber(order.orderNumber);
					Sales.getPaymentOptions().then((paymentOptions) => {
						if(paymentOptions){
							const stripe = paymentOptions?.find(opts => opts?.paymentMethodType === STRIPE_PAYMENT_METHOD_ID);
							Sales.initializePayment(order.orderNumber, stripe?.paymentMethodID).then(
								(paymentObject) => {
									setPayment(paymentObject);
									setPaymentMethodID(stripe?.paymentMethodID);
								},
							);
						}
					});
				}).catch(e => console.error(e));
			}
		});
		}
	}, [isStripe]);

	useEffect(() => {
		if(isStripe && stripeKey) {
			// stripe docs https://stripe.com/docs/stripe-js/react#elements-provider
			loadStripe(stripeKey).then((newStripePromise) => setStripeInstance(newStripePromise));
		}
	}, [isStripe, stripeKey])

	const handlePayPal = () => {
		setIsPayPal(true)
		Sales.getCart().then((cart) => {
			if (!cart?.items?.length) {
				window.location.href = offerURL;
				return;
			}else{
				const {country, email} = userInfo;
				Sales.createNewOrder({ country }, email).then((order) => {
					setOrderNumber(order.orderNumber);
				}).catch(e => console.error(e));
		}
	})
	}

		return (
			<div className={`${className}__payment-info`}>
				<Paragraph>{formLabel}</Paragraph>
			{paypal && <Button onClick={handlePayPal}>PayPal</Button>}
			{isPayPal && <PayPal orderNumber={orderNumber}/>}
			{isStripe && stripeInstance ?
				<Elements stripe={stripeInstance}>

					<PaymentForm
						clientSecret={clientSecret}
						formErrorText={formErrorText}
						formLabel={formLabel}
						formTitle={formTitle}
						orderNumber={orderNumber}
						paymentMethodID={paymentMethodID}
						stripeInstance={stripeInstance}
						submitText={submitText}
						successURL={successURL}
						className={className}
					/>
				</Elements> :
				<Button onClick={() => setIsStripe(true)}>Stripe</Button>
			}
			</div>
		);
};

export default PaymentInfo;