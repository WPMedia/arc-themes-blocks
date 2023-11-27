import React, { useEffect, useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { usePhrases, Heading, Link, useIdentity } from "@wpmedia/arc-themes-components";
import PaymentInfo from "../checkout/_children/PaymentInfo";

//test

const BLOCK_CLASS_NAME = "b-checkout";

const UpdatePaymentMethod = ({ customFields }) => {
	const { loginUrl, successURL } = customFields;

	const [loggedIn, setIsLoggedIn] = useState(false);

	const { Identity } = useIdentity();

	const getIsLoggedIn = async () => {
		const response = await Identity.isLoggedIn();
		setIsLoggedIn(response);
		if (!response) {
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
			successURL={successURL}
			className={BLOCK_CLASS_NAME}
			isUpdatePaymentMethod="true"
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
	}),
};

UpdatePaymentMethod.label = "Subscriptions Update payment method - Arc Block";
UpdatePaymentMethod.icon = "shop-cart";

export default UpdatePaymentMethod;
