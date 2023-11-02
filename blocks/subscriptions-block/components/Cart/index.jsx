import React, { useEffect, useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import { usePhrases, Heading, Link } from "@wpmedia/arc-themes-components";
import useSales from "../useSales";
import currency from "../../utils/currency";
import Item from "./item";

const getPaymentInfo = ({ origin, endpoint, priceCode }) =>
	fetch(`${origin}${endpoint}${priceCode}/1/${new Date().getTime()}`, {}).then((res) => res.json());

const Cart = ({ offerURL, className }) => {
	const { arcSite } = useFusionContext();
	const phrases = usePhrases();

	const [isFetching, setIsFetching] = useState(true);
	const [cartItems, setCartItems] = useState();

	const {
		api: {
			retail: { origin },
		},
	} = getProperties(arcSite);

	const { Sales } = useSales();

	useEffect(() => {
		const fetchPaymentInfo = (priceCode) =>
			getPaymentInfo({
				origin,
				endpoint: "/retail/public/v1/pricing/paymentInfo/",
				priceCode,
			});

		const fetchCartItemSummaries = async (cartDetails) => {
			const updatedCart = cartDetails;

			if (!cartDetails.items) {
				return cartDetails;
			}

			await Promise.all(
				cartDetails.items.map((item) =>
					fetchPaymentInfo(item.priceCode).then((priceSummary) => ({
						...item,
						priceSummary,
					}))
				)
			).then((results) => {
				updatedCart.items = results;
			});

			return updatedCart;
		};

		const getAllCart = async () => {
			setCartItems(
				await Sales.getCart()
					.then(fetchCartItemSummaries)
					.catch(() => [])
			);
			setIsFetching(false);
		};

		getAllCart();
	}, [Sales, origin]);

	if (isFetching) {
		return null;
	}

	if (!cartItems?.items || !cartItems?.items.length) {
		return (
			<div className={`${className}__cart`}>
				<Link href={offerURL}>{phrases.t("checkout-block.empty-cart-message")}</Link>
			</div>
		);
	}

	return (
		<div className={`${className}__cart`}>
			<Heading>{phrases.t("checkout-block.order-summary")}</Heading>
			<div className={`${className}__cart-items`}>
				{cartItems.items.map((itemDetails) => (
					<Item
						key={itemDetails.sku}
						name={itemDetails.name}
						description={itemDetails?.priceSummary?.pricingStrategy?.summary}
						className={className}
					/>
				))}
				<Item
					name={phrases.t("checkout-block.due-today")}
					description={`${currency(cartItems.currency)}${cartItems.total}`}
					additionalInfo={phrases.t("checkout-block.plus-sales-tax")}
					className={className}
				/>
			</div>
		</div>
	);
};

Cart.propTypes = {
	offerURL: PropTypes.string.isRequired,
};

export default Cart;