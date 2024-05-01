import { useEffect, useState } from "react";

import { useIdentity, useSales } from "@wpmedia/arc-themes-components";
import getProperties from "fusion:properties";
import { useFusionContext } from "fusion:context";

import { ARCXP_CART, ARCXP_ORDERNUMBER, verifyJSON } from "../utils/constants";

const getPricingStrategy = async ({ origin, priceCode }) => {
	const dateMidnight = new Date();
	dateMidnight.setUTCHours(0, 0, 0, 0);

	return fetch(
		`${origin}/retail/public/v1/pricing/paymentInfo/${priceCode}/1/${dateMidnight.getTime()}`,
		{},
	).then((res) => res.json());
};

const getProduct = async ({ origin, sku }) =>
	fetch(`${origin}/retail/public/v1/product/${sku}`, {}).then((res) => res.json());

export const getItemDetails = async (origin, items) => {
	let itemDetails = items;

	const fetchPricingStrategy = (priceCode) =>
		getPricingStrategy({
			origin,
			priceCode,
		});

	const fetchProduct = (sku) =>
		getProduct({
			origin,
			sku,
		});

	await Promise.all(
		itemDetails.map((item) =>
			fetchPricingStrategy(item?.priceCode).then((priceSummary) => ({
				...item,
				priceName: priceSummary?.pricingStrategy?.name,
				priceDescription: priceSummary?.pricingStrategy?.description,
				priceSummary: priceSummary?.pricingStrategy?.summary,
				rates: priceSummary?.pricingStrategy?.rates,
				taxInclusive: priceSummary?.pricingStrategy?.taxInclusive,
			})),
		),
	).then((results) => {
		itemDetails = results;
	});

	await Promise.all(
		itemDetails.map((item) =>
			fetchProduct(item?.sku).then((productSummary) => ({
				...item,
				productAttributes:
					typeof productSummary?.attributes !== "undefined" &&
					productSummary?.attributes?.length !== 0
						? productSummary?.attributes.map((feature) => ({
								featureText: feature.value,
								id: feature?.id,
							}))
						: [],
				productDescription: productSummary?.description,
			})),
		),
	).then((results) => {
		itemDetails = results;
	});

	return itemDetails;
};

const useCartOrderDetail = (paypalToken) => {
	const { Identity } = useIdentity();
	const { Sales } = useSales();

	const [isFetching, setIsFetching] = useState(true);
	const [isFetchingCartOrder, setIsFetchingCartOrder] = useState(true);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [orderDetail, setOrderDetail] = useState();
	const [cartDetail, setCartDetail] = useState();

	const { arcSite } = useFusionContext();
	const {
		api: {
			retail: { origin },
		},
	} = getProperties(arcSite);

	useEffect(() => {
		const isUserLoggedIn = async () => {
			setIsLoggedIn(await Identity.isLoggedIn());
			setIsFetching(false);
		};

		isUserLoggedIn();
	}, [Identity]);

	const orderNumberPayPal = localStorage[ARCXP_ORDERNUMBER];

	useEffect(() => {
		const getCartDetails = async () => {
			const cartDetails = await Sales.getCart();
			return cartDetails;
		};

		const getLastPendingOrder = async () => {
			const orderHistory = await Sales.getOrderHistory();
			const lastPendingOrder = orderHistory?.orders?.find((it) => it.orderStatus === "Pending");
			return lastPendingOrder;
		};

		const getOrderDetail = async (orderNumber) => {
			const orderHistory = await Sales.getOrderDetails(orderNumber);
			return orderHistory;
		};

		const createNewCart = async (currentItemCart) => {
			await Sales.clearCart();
			const newCart = await Sales.addItemToCart([
				{
					sku: currentItemCart?.sku,
					priceCode: currentItemCart?.priceCode,
					quantity: 1,
				},
			]);
			return newCart;
		};

		const getLastestOrderOrCart = async (currentOrder, currentCart) => {
			if (currentOrder?.orderDate && !currentCart?.cartDate) {
				return { lastOrder: currentOrder, currentCart: undefined };
			}

			if (!currentOrder?.orderDate && currentCart?.cartDate) {
				const newCart = await createNewCart(currentCart);
				return { lastOrder: undefined, currentCart: newCart };
			}

			let obj;
			if (currentOrder?.orderDate && currentCart?.cartDate) {
				if (currentOrder?.orderDate >= currentCart?.cartDate) {
					obj = { lastOrder: currentOrder, currentCart: undefined };
				} else {
					const newCart = await createNewCart(currentCart);
					if (newCart?.items?.length) {
						obj = { lastOrder: undefined, currentCart: newCart };
					} else {
						obj = { lastOrder: currentOrder, currentCart: undefined };
					}
				}
			}
			return obj;
		};

		const getCartItemFromLocalstorge = () => {
			const items = localStorage.getItem(ARCXP_CART);
			const cartItem = verifyJSON(items);
			if (cartItem && cartItem?.sku && cartItem?.priceCode && cartItem?.cartDate) {
				return cartItem;
			}
			return undefined;
		};

		if (!isFetching && !isLoggedIn) {
			setIsFetchingCartOrder(false);
		}

		if (isLoggedIn) {
			const itemCart = getCartItemFromLocalstorge();

			if (orderNumberPayPal && paypalToken) {
				getLastPendingOrder().then((lastOrder) => {
					getOrderDetail(lastOrder?.orderNumber).then((lastOrderDetail) => {
						Sales.clearCart().then(() => {
							const items = lastOrderDetail.items.map((item) => {
								const { sku, priceCode, quantity } = item;
								return { sku, priceCode, quantity };
							});
							Sales.addItemToCart(items).then((newCart)=>{
								getItemDetails(origin, newCart?.items).then((newDetails) => {
									setCartDetail({ ...newCart, items: newDetails });
									setIsFetchingCartOrder(false);
								});
							});
						}).catch(()=>{
							setIsFetchingCartOrder(false);
						});
					}).catch(()=>{
						setIsFetchingCartOrder(false);
					})
				}).catch(()=>{
					setIsFetchingCartOrder(false);
				});
			} else {
				getCartDetails().then((cart) => {
					if (cart?.items?.length) {
						// There are items into the cart, we return cart
						getItemDetails(origin, cart?.items).then((newDetails) => {
							setCartDetail({ ...cart, items: newDetails });
							setIsFetchingCartOrder(false);
						});
					} else {
						// There are no items into the cart, we will check last pending order & items in localStorage
						let lastPendingOrder;
						getLastPendingOrder()
							.then((order) => {
								if (order?.orderNumber) {
									// There are pending order
									getOrderDetail(order?.orderNumber)
										.then((orderDetails) => {
											if (orderDetails?.billingAddress?.country) {
												lastPendingOrder = orderDetails;
											}

											if (lastPendingOrder?.orderNumber || itemCart?.cartDate) {
												// getting the most recent one between pending order & cart
												getLastestOrderOrCart(lastPendingOrder, itemCart).then(
													({ lastOrder, currentCart }) => {
														if (lastOrder?.items) {
															getItemDetails(origin, lastOrder?.items).then((newDetails) => {
																setOrderDetail({ ...lastOrder, items: newDetails });
																setIsFetchingCartOrder(false);
															});
														}
														if (currentCart?.items) {
															getItemDetails(origin, currentCart?.items).then((newDetails) => {
																setCartDetail({ ...currentCart, items: newDetails });
																setIsFetchingCartOrder(false);
															});
														}
													},
												);
											} else {
												setIsFetchingCartOrder(false);
											}
										})
										.catch(() => {
											if (itemCart) {
												createNewCart(itemCart)
													.then((newCart) => {
														getItemDetails(origin, newCart?.items).then((newDetails) => {
															setCartDetail({ ...newCart, items: newDetails });
															setIsFetchingCartOrder(false);
														});
													})
													.catch(() => {
														setIsFetchingCartOrder(false);
													});
											} else {
												setIsFetchingCartOrder(false);
											}
										});
								} else if (itemCart) {
									// There are no pending order
									getLastestOrderOrCart(undefined, itemCart).then(({ currentCart }) => {
										getItemDetails(origin, currentCart?.items).then((newDetails) => {
											setCartDetail({ ...currentCart, items: newDetails });
											setIsFetchingCartOrder(false);
										});
									});
								} else {
									setIsFetchingCartOrder(false);
								}
							})
							.catch(() => {
								if (itemCart) {
									createNewCart(itemCart)
										.then((newCart) => {
											getItemDetails(origin, newCart?.items).then((newDetails) => {
												setCartDetail({ ...newCart, items: newDetails });
												setIsFetchingCartOrder(false);
											});
										})
										.catch(() => {
											setIsFetchingCartOrder(false);
										});
								} else {
									setIsFetchingCartOrder(false);
								}
							});
					}
				});
			}
		}
	}, [isFetching, isLoggedIn, Sales, origin, orderNumberPayPal, paypalToken]);

	return {
		isFetching,
		isFetchingCartOrder,
		isLoggedIn,
		cartDetail,
		orderDetail,
	};
};

export default useCartOrderDetail;
