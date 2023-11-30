import { useState, useEffect } from "react";
import useSales from "./useSales";

export const usePaymentRedirect = (
	paymentMethodType,
	orderNumber,
	token,
	redirectURLParameterName = "parameter1",
	successURL,
) => {
	const { Sales } = useSales();

	const [error, setError] = useState();
	const [currentOrder, setCurrentOrder] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const orderDetails = await Sales.getOrderDetails(orderNumber);
				setCurrentOrder(orderDetails);
			} catch (e) {
				setError(e);
			}
		};
		fetchData();
	}, []);
	
	useEffect(() => {
		const initPayment = async () => {
			try {
				const payment = await Sales.initializePayment(
					currentOrder?.orderNumber,
					paymentMethodType.paymentMethodID,
				);
				window.location.href = payment[redirectURLParameterName];
			} catch (e) {
				setError(e);
			}
		};

		const finalizePayment = async () => {
			try {
				await Sales.finalizePayment(
					currentOrder?.orderNumber,
					paymentMethodType.paymentMethodID,
					token,
					null,
				);
				window.location.href = successURL;
			} catch (e) {
				setError(e);
			}
		};

		if (currentOrder?.orderNumber && paymentMethodType?.paymentMethodID) {
			if (!token) {
				initPayment();
			}

			if (token) {
				finalizePayment();
			}
		}
	}, [currentOrder, paymentMethodType, token]);

	return { error };
};
