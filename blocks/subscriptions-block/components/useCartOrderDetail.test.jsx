import fetch from "node-fetch";
import {
	waitFor,
	renderHook
} from "@testing-library/react";
import "@testing-library/jest-dom";

import useCartOrderDetail from "./useCartOrderDetail";
import getItemDetails from "../utils/itemDetails";

// eslint-disable-next-line
globalThis.fetch = fetch;

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			identity: {
				origin: "http://test",
			},
			sales: {
				origin: "http://test",
			},
			retail: {
				origin: "http://test",
				endpoint: "/retail/public/v1/offer/live/",
			},
		},
	})),
);

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useSales: jest.fn(() => ({
		isInitialized: true,
	})),
	useIdentity: jest.fn(() => ({
		isInitialized: true,
		Identity: {
			isLoggedIn: jest.fn(() => false),
		},
	})),
}));

jest.mock("../utils/itemDetails");

describe("useCartOrderDetail user is not logged In Hook", () => {
	test("returns isLoggedIn false if user is not loggedIn", async () => {
		const { result } = renderHook(() => useCartOrderDetail());

		expect(result.current.isFetching).toBe(true);
		expect(result.current.isFetchingCartOrder).toBe(true);
		expect(result.current.isLoggedIn).toBe(false);
		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toBe(undefined);

		await waitFor(() => expect(result.current.isFetching).toEqual(false));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toEqual(false));
		await waitFor(() => expect(result.current.isLoggedIn).toEqual(false));
		await waitFor(() => expect(result.current.cartDetail).toEqual(undefined));
		await waitFor(() => expect(result.current.orderDetail).toEqual(undefined));
	});
});

describe("useCartOrderDetail Hook", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const cart = {
		total: 20,
		subtotal: 20,
		tax: 0,
		shipping: 0,
		items: [
			{
				sku: "test",
				quantity: 1,
				shortDescription: "<p>test-1</p>",
				name: "test product",
				price: 20,
				tax: 0,
				subtotal: 20,
				total: 20,
				priceCode: "YLE801",
				eventId: null,
				ownerClientId: null,
				attributes: [],
				gift: false,
			},
		],
		currency: "USD",
		taxSupported: true,
	};

	const mockedItemDetails = [
		{
			sku: "test",
			quantity: 1,
			shortDescription: "<p>test-1</p>",
			name: "test product",
			price: 20,
			tax: 0,
			subtotal: 20,
			total: 20,
			priceCode: "YLE801",
			eventId: null,
			ownerClientId: null,
			attributes: [],
			gift: false,
			priceName: "test price",
			priceDescription: "<p>this is the description section</p>",
			priceSummary: "<p>summary price</p>",
			rates: [
				{
					amount: "20.00",
					billingCount: 1,
					billingFrequency: "Month",
					durationCount: 1,
					duration: "UntilCancelled",
				},
			],
			taxInclusive: true,
			productAttributes: [
				{
					featureText: "<p>a lot of testing</p>",
					id: 19428,
				},
				{
					featureText: "<p>test2</p>",
					id: 19682,
				},
			],
			productDescription: "<p>test-1</p>",
		},
	];

	const pendingOrder = {
		start: 0,
		pageSize: 10,
		maxResults: 270,
		orders: [
			{
				orderNumber: "R2OMXGQBQY6SV670",
				orderDate: 1715035042000,
				orderType: "Parent",
				orderStatus: "Pending",
				totalAmount: 20,
				tax: 0,
				currency: "USD",
				products: [
					{
						sku: "test",
						name: "test product",
						quantity: 1,
					},
				],
				paymentGateway: null,
				lastFour: null,
				nameOnPayment: null,
				creditCardBrand: null,
			},
		],
	};

	const orderDetail = {
		email: "checkoutTest@gmail.com",
		orderNumber: "R2OMXGQBQY6SV670",
		orderType: "Parent",
		phone: "NA",
		status: "Pending",
		subtotal: 20,
		total: 20,
		totalTax: 0,
		shipping: 0,
		items: [
			{
				sku: "test",
				quantity: 1,
				shortDescription: "<p>test-1</p>",
				name: "test product",
				price: 20,
				tax: 0,
				subtotal: 20,
				total: 20,
				priceCode: "YLE801",
				eventId: null,
				ownerClientId: null,
				attributes: [],
				gift: false,
			},
		],
		payments: [],
		billingAddress: {
			line1: "Las terrazas 321 cs 12",
			line2: "t",
			locality: "Tlaquepaque",
			region: "Jalisco",
			country: "MX",
			postal: "45599",
		},
		shippingAddress: null,
		subscriptionIDs: [],
		currency: "USD",
		firstName: null,
		lastName: null,
		secondLastName: null,
		orderDate: 1715035042000,
		orderID: 191988,
		clientID: "01038844-815c-4dd1-8050-e4028091bba6",
	};

	test("returns cart and isLoggedIn true", async () => {

		jest.spyOn(require("@wpmedia/arc-themes-components"), "useIdentity").mockReturnValue({
			Identity: {
				isLoggedIn: jest.fn(() => true),
			},
		});

		const mockSales = {
			getCart: jest.fn(() => cart),
		};

		jest.spyOn(require("@wpmedia/arc-themes-components"), "useSales").mockReturnValue({
			Sales: mockSales,
		});

		getItemDetails.mockResolvedValue(mockedItemDetails);

		const { result } = renderHook(() => useCartOrderDetail());

		expect(result.current.isFetching).toBe(true);
		expect(result.current.isFetchingCartOrder).toBe(true);
		expect(result.current.isLoggedIn).toBe(false);
		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toBe(undefined);

		await waitFor(() => expect(result.current.isFetching).toEqual(false));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toEqual(false));
		await waitFor(() => expect(result.current.isLoggedIn).toEqual(true));
		await waitFor(() =>
			expect(result.current.cartDetail).toEqual({ ...cart, items: mockedItemDetails }),
		);
		await waitFor(() => expect(result.current.orderDetail).toEqual(undefined));
	});

	test("there is no cart in local storage, just pending order. Return last pending order", async () => {
		
		const mockSales = {
			getCart: jest.fn(() => {}),
			getOrderHistory: jest.fn(() => pendingOrder),
			getOrderDetails: jest.fn(() => orderDetail),
		};

		jest.spyOn(require("@wpmedia/arc-themes-components"), "useSales").mockReturnValue({
			Sales: mockSales,
		});

		const { result } = renderHook(() => useCartOrderDetail());

		expect(result.current.isFetching).toBe(true);
		expect(result.current.isFetchingCartOrder).toBe(true);
		expect(result.current.isLoggedIn).toBe(false);
		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toBe(undefined);

		await waitFor(() => expect(result.current.isFetching).toEqual(false));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toEqual(false));
		await waitFor(() => expect(result.current.isLoggedIn).toEqual(true));
		await waitFor(() =>expect(result.current.cartDetail).toEqual(undefined));
		await waitFor(() => expect(result.current.orderDetail).toEqual({...orderDetail, items: mockedItemDetails}));
	});

	test("There is cart in local storage and pending order, item in localstorage is more recent that pending order", async() => {
		const sku = 'test';
		const priceCode = 'YLE801';
		localStorage.setItem('ArcXP_cart', JSON.stringify({sku, priceCode, cartDate: Date.now() }));

		const mockSales = {
			getCart: jest.fn(() => {}),
			getOrderHistory: jest.fn(() => pendingOrder),
			getOrderDetails: jest.fn(() => orderDetail),
			clearCart: jest.fn(() => {}),
			addItemToCart: jest.fn(() => cart)
		};

		jest.spyOn(require("@wpmedia/arc-themes-components"), "useSales").mockReturnValue({
			Sales: mockSales,
		});

		const { result } = renderHook(() => useCartOrderDetail());

		expect(result.current.isFetching).toBe(true);
		expect(result.current.isFetchingCartOrder).toBe(true);
		expect(result.current.isLoggedIn).toBe(false);
		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toBe(undefined);

		await waitFor(() => expect(result.current.isFetching).toEqual(false));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toEqual(false));
		await waitFor(() => expect(result.current.isLoggedIn).toEqual(true));
		await waitFor(() =>expect(result.current.cartDetail).toEqual({ ...cart, items: mockedItemDetails }));
		await waitFor(() => expect(result.current.orderDetail).toEqual(undefined));
	});

	test("There is cart in local storage and pending order, pending order is more recent that pending order", async() => {
		const sku = 'test';
		const priceCode = 'YLE801';
		const newDate = new Date(2024, 0, 1);
		localStorage.setItem('ArcXP_cart', JSON.stringify({sku, priceCode, cartDate: newDate.getTime() }));

		const mockSales = {
			getCart: jest.fn(() => {}),
			getOrderHistory: jest.fn(() => pendingOrder),
			getOrderDetails: jest.fn(() => orderDetail),
			clearCart: jest.fn(() => {}),
			addItemToCart: jest.fn(() => cart)
		};

		jest.spyOn(require("@wpmedia/arc-themes-components"), "useSales").mockReturnValue({
			Sales: mockSales,
		});

		const { result } = renderHook(() => useCartOrderDetail());

		expect(result.current.isFetching).toBe(true);
		expect(result.current.isFetchingCartOrder).toBe(true);
		expect(result.current.isLoggedIn).toBe(false);
		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toBe(undefined);

		await waitFor(() => expect(result.current.isFetching).toEqual(false));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toEqual(false));
		await waitFor(() => expect(result.current.isLoggedIn).toEqual(true));
		await waitFor(() =>expect(result.current.cartDetail).toEqual(undefined));
		await waitFor(() => expect(result.current.orderDetail).toEqual({...orderDetail, items: mockedItemDetails}));
	});

	test("There are not pending orders neither cart, just cart in localStorage", async() => {
		const sku = 'test';
		const priceCode = 'YLE801';
		localStorage.setItem('ArcXP_cart', JSON.stringify({sku, priceCode, cartDate: Date.now() }));

		const mockSales = {
			getCart: jest.fn(() => {}),
			getOrderHistory: jest.fn(() => {}),
			getOrderDetails: jest.fn(() => {}),
			clearCart: jest.fn(() => {}),
			addItemToCart: jest.fn(() => cart)
		};

		jest.spyOn(require("@wpmedia/arc-themes-components"), "useSales").mockReturnValue({
			Sales: mockSales,
		});

		const { result } = renderHook(() => useCartOrderDetail());

		expect(result.current.isFetching).toBe(true);
		expect(result.current.isFetchingCartOrder).toBe(true);
		expect(result.current.isLoggedIn).toBe(false);
		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toBe(undefined);

		await waitFor(() => expect(result.current.isFetching).toEqual(false));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toEqual(false));
		await waitFor(() => expect(result.current.isLoggedIn).toEqual(true));
		await waitFor(() =>expect(result.current.cartDetail).toEqual({ ...cart, items: mockedItemDetails }));
		await waitFor(() => expect(result.current.orderDetail).toEqual(undefined));
	})

	test("returns a new cart if there is a orderNumber and paypalToken", async () => {
		localStorage.setItem('ArcXP_orderNumber', 'R2OMXGQBQY6SV670');

		const mockSales = {
			getCart: jest.fn(() => {}),
			getOrderHistory: jest.fn(() => pendingOrder),
			getOrderDetails: jest.fn(() => orderDetail),
			clearCart: jest.fn(() => {}),
			addItemToCart: jest.fn(() => cart)
		};

		jest.spyOn(require("@wpmedia/arc-themes-components"), "useIdentity").mockReturnValue({
			Identity: {
				isLoggedIn: jest.fn(() => true),
			},
		});

		jest.spyOn(require("@wpmedia/arc-themes-components"), "useSales").mockReturnValue({
			Sales: mockSales,
		});

		const { result } = renderHook(() => useCartOrderDetail('123'));

		expect(result.current.isFetching).toBe(true);
		expect(result.current.isFetchingCartOrder).toBe(true);
		expect(result.current.isLoggedIn).toBe(false);
		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toBe(undefined);

		await waitFor(() => expect(result.current.isFetching).toEqual(false));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toEqual(false));
	});
});
