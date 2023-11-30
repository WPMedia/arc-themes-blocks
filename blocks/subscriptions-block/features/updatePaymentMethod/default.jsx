import React, { useEffect } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useIdentity } from "@wpmedia/arc-themes-components";
import PaymentInfo from "../checkout/_children/PaymentInfo";

const BLOCK_CLASS_NAME = "b-checkout";

const UpdatePaymentMethod = ({ customFields }) => {
	const { loginUrl, successURL, stripeIntentsID } = customFields;
	const { Identity } = useIdentity();

	const getIsLoggedIn = async () => {
		const isLoggedIn = await Identity.isLoggedIn();
		if (!isLoggedIn && loginUrl) {
			const updatePaymentUrl = new URL(window.location.href);
			window.location.href = `${loginUrl}${loginUrl.indexOf("?") != -1 ? "&" : "?"}redirect=${
				updatePaymentUrl?.pathname
			}${updatePaymentUrl.search}`;
		}
	};

	useEffect(() => {
		getIsLoggedIn();
	}, [Identity]);

	return (
		<PaymentInfo
			stripeIntentsID={stripeIntentsID}
			className={BLOCK_CLASS_NAME}
			isPaymentMethodUpdate="true"
			successUpdateURL={successURL}
		/>
	);
};

UpdatePaymentMethod.propTypes = {
	customFields: PropTypes.shape({
		loginUrl: PropTypes.string.tag({
			label: "Log In link URL",
			defaultValue: "/account/login/",
		}),
		successURL: PropTypes.string.tag({
			defaultValue: "/",
			label: "Success URL",
		}),
		stripeIntentsID: PropTypes.number.tag({
			label: "Stripe Intents ID",
			description:
				"Tenant could have multiple payment providers for Stripe Intents. Set up the Stripe Intents ID to be used by default.",
		})
	}),
};

UpdatePaymentMethod.label = "Subscriptions Update payment method - Arc Block";
UpdatePaymentMethod.icon = "shop-cart";

export default UpdatePaymentMethod;
