import React, { useEffect, useState } from "react";

import PropTypes from "@arc-fusion/prop-types";
import {
	usePhrases,
	Heading,
	useIdentity,
	useSales,
	Button,
	BotChallengeProtection,
	useRecaptcha,
} from "@wpmedia/arc-themes-components";
import CheckoutCardDetail, {
	ACCOUNT,
	BILLING_ADDRESS,
	PAYMENT,
} from "../../components/CheckoutCardDetail";
import BillingAddress from "./_children/BillingAddress";
import PaymentReview from "./_children/PaymentReview";
import OrderInformation from "../../components/OrderInformation";

import useCartOrderDetail from "../../components/useCartOrderDetail";
import usePaymentOptions from "../../components/usePaymentOptions";

export const LABEL_ORDER_NUMBER_PAYPAL = "ArcSubs_OrderNumber";
const BLOCK_CLASS_NAME = "b-checkout";

const Checkout = ({ customFields }) => {
	const { loginURL, offerURL, stripeIntentsID } = customFields;

	const initialState = {
		account: true,
		billingAddress: false,
		payment: false,
		review: false,
	};

	const { Identity } = useIdentity();
	const { Sales } = useSales();
	const phrases = usePhrases();

	const { isFetching, isFetchingCartOrder, isLoggedIn, cartDetail, orderDetail } =
		useCartOrderDetail();

	const {
		stripeIntents,
		paypal,
		error: errorPaymentOptions,
		isFetching: isFetchingPaymentOptions,
	} = usePaymentOptions(stripeIntentsID);

	const [user, setUser] = useState(false);
	const [isOpen, setIsOpen] = useState(initialState);
	const [isComplete, setIsComplete] = useState(initialState);

	const [billingAddress, setBillingAddress] = useState({});

	const [captchaToken, setCaptchaToken] = useState();
	const [captchaError, setCaptchaError] = useState();
	const [resetRecaptcha, setResetRecaptcha] = useState(true);
	const [error, setError] = useState();

	const [order, setOrder] = useState();
	const { isRecaptchaEnabled } = useRecaptcha("checkout");

	const checkoutURL = window.location.href;

	useEffect(() => {
		let isActive = true;

		if (isLoggedIn) {
			Identity.getUserProfile()
				.then((userProfile) => {
					if (isActive) {
						setUser(userProfile);
						setIsOpen((state) => ({ ...state, account: false, billingAddress: true }));
						setIsComplete((state) => ({ ...state, account: true }));
					}
				})
				.catch(() => {
					setUser(false);
				});
		}

		return () => {
			isActive = false;
			return null;
		};
	}, [Identity, isLoggedIn]);

	useEffect(() => {
		if (!isFetching) {
			if (!isLoggedIn && loginURL && checkoutURL) {
				window.location.href = `${loginURL}?redirect=${checkoutURL}`;
			}
		}
	}, [isFetching, isLoggedIn, loginURL, checkoutURL]);

	useEffect(() => {
		if (isLoggedIn && !isFetchingCartOrder) {
			if (!cartDetail?.items?.length && !orderDetail?.items?.length) {
				window.location.href = `${offerURL}?redirect=${checkoutURL}`;
			}

			if (cartDetail?.items?.length) {
				setIsOpen((state) => ({ ...state, billingAddress: true }));
			}

			if (orderDetail?.items?.length) {
				setBillingAddress(orderDetail?.billingAddress);
				setIsComplete((state) => ({ ...state, billingAddress: true }));
				setIsOpen((state) => ({ ...state, billingAddress: false, payment: true }));
				setOrder(orderDetail);
			}
		}
	}, [isLoggedIn, isFetchingCartOrder, cartDetail, orderDetail, offerURL, checkoutURL]);

	const logoutAndRedirect = () => {
		Identity.logout().then(() => {
			window.location.href = `${loginURL}?redirect=${checkoutURL}`;
		});
	};

	const editButton = (type) => {
		if (type === ACCOUNT) {
			return (
				<Button onClick={logoutAndRedirect} className={`${BLOCK_CLASS_NAME}__card-edit`}>
					{phrases.t("checkout-block.edit")}
				</Button>
			);
		}
		if (type === BILLING_ADDRESS) {
			return (
				<Button
					onClick={() => setIsOpen((state) => ({ ...state, billingAddress: true, payment: false }))}
					className={`${BLOCK_CLASS_NAME}__card-edit`}
				>
					{phrases.t("checkout-block.edit")}
				</Button>
			);
		}
		if (type === PAYMENT) {
			return (
				<Button
					onClick={() => setIsOpen((state) => ({ ...state, payment: true, review: false }))}
					className={`${BLOCK_CLASS_NAME}__card-edit`}
				>
					{phrases.t("checkout-block.edit")}
				</Button>
			);
		}
		return null;
	};

	if (!isFetchingCartOrder && !isFetchingPaymentOptions) {
		return (
			<div className={BLOCK_CLASS_NAME}>
				<div className={`${BLOCK_CLASS_NAME}${isOpen.review ? "__main-full" : "__main"}`}>
					<section className={`${BLOCK_CLASS_NAME}__section`}>
						<Heading>{phrases.t("checkout-block.headline")}</Heading>
						<CheckoutCardDetail
							className={`${BLOCK_CLASS_NAME}__card`}
							type={ACCOUNT}
							summary={user}
							link={editButton(ACCOUNT)}
							isOpen={isOpen.account}
							isComplete={isComplete.account}
						/>
						<CheckoutCardDetail
							className={`${BLOCK_CLASS_NAME}__card`}
							type={BILLING_ADDRESS}
							summary={billingAddress}
							link={editButton(BILLING_ADDRESS)}
							isOpen={isOpen.billingAddress}
							isComplete={isComplete.billingAddress}
							error={error}
						>
							<BillingAddress
								className={BLOCK_CLASS_NAME}
								user={user}
								setIsOpen={setIsOpen}
								setIsComplete={setIsComplete}
								captchaToken={captchaToken}
								resetRecaptcha={resetRecaptcha}
								setResetRecaptcha={setResetRecaptcha}
								setCaptchaError={setCaptchaError}
								setError={setError}
								setOrder={setOrder}
								billingAddress={billingAddress}
								setBillingAddress={setBillingAddress}
							>
								{isRecaptchaEnabled && (
									<div className={`${BLOCK_CLASS_NAME}__billing-address-captcha`}>
										<BotChallengeProtection
											challengeIn="checkout"
											setCaptchaToken={setCaptchaToken}
											captchaError={captchaError}
											error={error}
											setCaptchaError={setCaptchaError}
											resetRecaptcha={resetRecaptcha}
										/>
									</div>
								)}
							</BillingAddress>
						</CheckoutCardDetail>
						<PaymentReview
							className={BLOCK_CLASS_NAME}
							customFields={customFields}
							paymentOptions={{ stripeIntents, paypal, errorPaymentOptions }}
							billingAddress={billingAddress}
							order={order}
							setOrder={setOrder}
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							isComplete={isComplete}
							setIsComplete={setIsComplete}
							error={error}
							setError={setError}
							captchaToken={captchaToken}
						/>
					</section>
				</div>
				{!isOpen.review && (
					<div className={`${BLOCK_CLASS_NAME}__sidebar`}>
						<OrderInformation
							id="orderInformationSidebar"
							offerURL={offerURL}
							showOfferURL={true}
							showPriceDescription={false}
							showProductFeatures={true}
							orderDetails={order?.items ? order : cartDetail}
							className={BLOCK_CLASS_NAME}
						/>
					</div>
				)}
			</div>
		);
	}

	return null;
};

Checkout.propTypes = {
	customFields: PropTypes.shape({
		loginURL: PropTypes.string.tag({
			description:
				"In case you have multiple payment providers for stripe Intents, It determines what is the provider ID to be used by default.",
		}),
		offerURL: PropTypes.string.tag({
			defaultValue: "/offer/",
			label: "Offer URL",
		}),
		successURL: PropTypes.string.tag({
			defaultValue: "/",
			label: "Success URL",
		}),
		stripeIntentsID: PropTypes.number.tag({
			label: "Stripe Intents - Provider ID",
			description:
				"In case you have multiple payment providers for stripe Intents, It determines what is the provider ID to be used by default.",
		}),
		termsOfSaleURL: PropTypes.string.tag({
			name: "Terms of Sale URL",
			defaultValue: "/terms-of-sale/",
		}),
		termsOfServiceURL: PropTypes.string.tag({
			name: "Terms of Service URL",
			defaultValue: "/terms-of-service/",
		}),
		titleApplePayGooglePay: PropTypes.string.tag({
			name: "Title Apple Pay - Google Pay",
			defaultValue: "Arc XP",
		}),
	}),
};

Checkout.label = "Subscriptions Checkout - Arc Block";
Checkout.icon = "shop-cart";

export default Checkout;
