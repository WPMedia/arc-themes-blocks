import { useState, useEffect } from "react";
import Identity from "@arc-publishing/sdk-identity";
import useSales from "./useSales";

export const usePaymentRedirect = (
	paymentMethodType,
	orderNumber,
	isUpdatePaymentMethod = false,
	token,
	redirectURLParameterName = "parameter1",
  successURL,
  successUpdateURL,
  isInitialized
) => {
	const { Sales } = useSales();

	const [error, setError] = useState();
	const [currentMerchantId, setCurrentMerchantId] = useState();
	const [currentOrder, setCurrentOrder] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const orderDetails = await Sales.getOrderDetails(orderNumber);
				setCurrentOrder(orderDetails);
				setCurrentMerchantId(paymentMethodType.paymentMethodID);
			} catch (e) {
				setError(e);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const initPayment = async () => {
			const config = await Sales.getConfig();

			try {
				if (
					currentOrder &&
					currentOrder.orderNumber
				) {
					const payment = await Sales.initializePayment(
						currentOrder.orderNumber,
						currentMerchantId,
					);
					console.log(payment[redirectURLParameterName]);
					window.location.href = payment[redirectURLParameterName];
				}
			} catch (e) {
				setError(e);
			}
		};

		const finalizePayment = async () => {
			try {
				await Sales.finalizePayment(orderNumber, currentMerchantId, token, null);
				window.location.href = successURL;
			} catch (e) {
				setError(e);
			}
		};

		if (currentOrder && currentMerchantId) {
			if (!token) {
				initPayment();
			}

			if (token) {
        finalizePayment();
			}
		}
	}, [currentOrder, currentMerchantId, token]);

	return { error };
};
