import React, { useState, useEffect } from "react";
import PropTypes from "@arc-fusion/prop-types";

import { Heading, Link, useIdentity, Stack } from "@wpmedia/arc-themes-components";
import useSales from "../../components/useSales";

const SubscriptionList = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [subscriptionList, setSubscriptionList] = useState([]);

	const { Identity } = useIdentity();
	const { Sales } = useSales();

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

	const getAllSubscriptions = async () => {
		const listSubs = await Sales.getAllActiveSubscriptions();
		return listSubs;
	};

	useEffect(() => {
		getIsLoggedIn();
	}, [Identity]);

	useEffect(() => {
		console.log(`isLoggedIn ${isLoggedIn}`);
		if (isLoggedIn) {
			getAllSubscriptions().then((subs) => {
				console.log(subs);
				setSubscriptionList(subs);
			});
		}
	}, [isLoggedIn, Identity]);

	console.log(subscriptionList);

	return (
		<section>
			<Heading>Active Subscriptions</Heading>
			<Stack>
				{subscriptionList.map((sub) => {
					return (
						<Link
							href={`http://localhost/pf/updatepayment/?_website=the-gazette&paymentMethodID=${sub?.paymentMethod?.paymentMethodID}`}
						>{`${sub.productName} - ${sub.subscriptionID}`}</Link>
					);
				})}
			</Stack>
		</section>
	);
};

SubscriptionList.propTypes = {
	customFields: PropTypes.shape({
		loginUrl: PropTypes.string.tag({
			label: "Log In link URL",
			defaultValue: "/account/login/",
		}),
	}),
};

SubscriptionList.label = "Subscriptions active Subscriptions - Custom Block";

export default SubscriptionList;
