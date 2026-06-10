import fetch from "node-fetch";
import { waitFor, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";

import useCartOrderDetail from "./useCartOrderDetail";
import getItemDetails from "../utils/itemDetails";
import { ARCXP_CART, ARCXP_ORDERNUMBER } from "../utils/constants";

// eslint-disable-next-line
globalThis.fetch = fetch;

// ---- Mutable per-test hook state (must be prefixed with `mock` for jest.mock hoisting rules) ----
let mockIdentityState;
let mockSalesState;

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "test-site",
	})),
}));

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
	useIdentity: jest.fn(() => mockIdentityState),
	useSales: jest.fn(() => mockSalesState),
}));

jest.mock("../utils/itemDetails");

describe("useCartOrderDetail Hook", () => {
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

	const orderDate = new Date().getTime() - 60 * 60 * 24 * 1000;
	const pendingOrder = {
		start: 0,
		pageSize: 10,
		maxResults: 270,
		orders: [
			{
				orderNumber: "R2OMXGQBQY6SV670",
				orderDate,
				orderType: "Parent",
				orderStatus: "Pending",
				totalAmount: 20,
				tax: 0,
				currency: "USD",
				products: [{ sku: "test", name: "test product", quantity: 1 }],
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
		billingAddress: { country: "MX" },
		orderDate: 1715035042000,
	};

	const setOrderNumber = (value) => {
		// hook reads localStorage[ARCXP_ORDERNUMBER]
		localStorage[ARCXP_ORDERNUMBER] = value;
		// also set via setItem for consistency
		localStorage.setItem(ARCXP_ORDERNUMBER, value);
	};

	const setCartInLocalStorage = ({ sku, priceCode, cartDate }) => {
		localStorage.setItem(ARCXP_CART, JSON.stringify({ sku, priceCode, cartDate }));
	};

	beforeEach(() => {
		jest.clearAllMocks();
		localStorage.clear();

		// Default: logged out
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => false),
				extendSession: jest.fn(async () => {}),
			},
		};

		// Default Sales shape
		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => ({})),
				getOrderDetails: jest.fn(async () => ({})),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		// Default itemDetails success
		getItemDetails.mockResolvedValue(mockedItemDetails);
	});

	test("returns isLoggedIn false if user is not loggedIn", async () => {
		const { result } = renderHook(() => useCartOrderDetail());

		expect(result.current.isFetching).toBe(true);
		expect(result.current.isFetchingCartOrder).toBe(true);
		expect(result.current.isLoggedIn).toBe(false);
		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toBe(undefined);

		await waitFor(() => expect(result.current.isFetching).toBe(false));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		await waitFor(() => expect(result.current.isLoggedIn).toBe(false));
		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toBe(undefined);
	});

	test("returns cart and isLoggedIn true", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => cart),
				getOrderHistory: jest.fn(async () => ({})),
				getOrderDetails: jest.fn(async () => ({})),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetching).toBe(false));
		await waitFor(() => expect(result.current.isLoggedIn).toBe(true));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));

		expect(result.current.cartDetail).toEqual({ ...cart, items: mockedItemDetails });
		expect(result.current.orderDetail).toBe(undefined);
	});

	test("there is no cart in local storage, just pending order. Return last pending order", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => pendingOrder),
				getOrderDetails: jest.fn(async () => orderDetail),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetching).toBe(false));
		await waitFor(() => expect(result.current.isLoggedIn).toBe(true));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));

		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toEqual({ ...orderDetail, items: mockedItemDetails });
	});

	test("There is cart in local storage and pending order, item in localstorage is more recent than pending order", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		setCartInLocalStorage({ sku: "test", priceCode: "YLE801", cartDate: Date.now() });

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => pendingOrder),
				getOrderDetails: jest.fn(async () => orderDetail),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetching).toBe(false));
		await waitFor(() => expect(result.current.isLoggedIn).toBe(true));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));

		expect(result.current.cartDetail).toEqual({ ...cart, items: mockedItemDetails });
		expect(result.current.orderDetail).toBe(undefined);
	});

	test("There is cart in local storage and pending order, pending order is more recent than cart", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		const olderThan48hButWithinLogicWindow = new Date().getTime() - 60 * 60 * 24 * 10 * 1000;
		setCartInLocalStorage({ sku: "test", priceCode: "YLE801", cartDate: olderThan48hButWithinLogicWindow });

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => pendingOrder),
				getOrderDetails: jest.fn(async () => orderDetail),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetching).toBe(false));
		await waitFor(() => expect(result.current.isLoggedIn).toBe(true));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));

		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toEqual({ ...orderDetail, items: mockedItemDetails });
	});

	test("There are not pending orders neither cart, just cart in localStorage", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		setCartInLocalStorage({ sku: "test", priceCode: "YLE801", cartDate: Date.now() });

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => ({})),
				getOrderDetails: jest.fn(async () => ({})),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetching).toBe(false));
		await waitFor(() => expect(result.current.isLoggedIn).toBe(true));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));

		expect(result.current.cartDetail).toEqual({ ...cart, items: mockedItemDetails });
		expect(result.current.orderDetail).toBe(undefined);
	});

	test("There are not pending orders neither cart, just cart in localStorage, but date is older than 48 hours", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		const olderThan48h = new Date().getTime() - 60 * 60 * 24 * 3 * 1000;
		setCartInLocalStorage({ sku: "test", priceCode: "YLE801", cartDate: olderThan48h });

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => ({})),
				getOrderDetails: jest.fn(async () => ({})),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetching).toBe(false));
		await waitFor(() => expect(result.current.isLoggedIn).toBe(true));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));

		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toBe(undefined);
	});

	test("returns a new cart if there is a orderNumber and paypalToken", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		setOrderNumber("R2OMXGQBQY6SV670");

		// When orderNumberPayPal && paypalToken:
		// - getLastPendingOrder -> order
		// - getOrderDetail -> lastOrderDetail
		// - clearCart -> addItemToCart(lastOrderDetail.items) -> getItemDetails -> setCartDetail
		const mockCartFromAdd = { ...cart };

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => pendingOrder),
				getOrderDetails: jest.fn(async () => orderDetail),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => mockCartFromAdd),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail("123"));

		await waitFor(() => expect(result.current.isFetching).toBe(false));
		await waitFor(() => expect(result.current.isLoggedIn).toBe(true));
		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));

		expect(result.current.cartDetail).toEqual({ ...mockCartFromAdd, items: mockedItemDetails });
	});

	test("PayPal path: getLastPendingOrder catch sets isFetchingCartOrder false", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		setOrderNumber("R2OMXGQBQY6SV670");

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(() => Promise.reject(new Error("history error"))),
				getOrderDetails: jest.fn(async () => orderDetail),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail("paypal-token-123"));

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		expect(result.current.cartDetail).toBe(undefined);
	});

	test("PayPal path: getOrderDetail catch sets isFetchingCartOrder false", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		setOrderNumber("R2OMXGQBQY6SV670");

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => pendingOrder),
				getOrderDetails: jest.fn(() => Promise.reject(new Error("order details error"))),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail("paypal-token-123"));

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		expect(result.current.cartDetail).toBe(undefined);
	});

	test("PayPal path: clearCart catch sets isFetchingCartOrder false", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		setOrderNumber("R2OMXGQBQY6SV670");

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => pendingOrder),
				getOrderDetails: jest.fn(async () => orderDetail),
				clearCart: jest.fn(() => Promise.reject(new Error("clear cart error"))),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail("paypal-token-123"));

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		expect(result.current.cartDetail).toBe(undefined);
	});

	test("pending order exists but is less recent than a paid order - pending order discarded", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		const recentDate = new Date().getTime() - 60 * 60 * 24 * 1 * 1000;
		const olderDate = new Date().getTime() - 60 * 60 * 24 * 2 * 1000;

		const orderHistoryWithPaidOrder = {
			orders: [
				{
					orderNumber: "PENDING001",
					orderDate: olderDate,
					orderStatus: "Pending",
				},
				{
					orderNumber: "PAID001",
					orderDate: recentDate,
					orderStatus: "Paid",
				},
			],
		};

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => orderHistoryWithPaidOrder),
				getOrderDetails: jest.fn(async () => orderDetail),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		// Pending order was discarded because paid order is more recent
		expect(result.current.orderDetail).toBe(undefined);
	});

	test("pending order is older than maxAge (48h) - pending order discarded", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		const olderThan48h = new Date().getTime() - 60 * 60 * 24 * 3 * 1000;

		const orderHistoryWithOldPendingOrder = {
			orders: [
				{
					orderNumber: "OLD_PENDING001",
					orderDate: olderThan48h,
					orderStatus: "Pending",
				},
			],
		};

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => orderHistoryWithOldPendingOrder),
				getOrderDetails: jest.fn(async () => orderDetail),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		expect(result.current.orderDetail).toBe(undefined);
	});

	test("getItemDetails catch when cart has items - falls back to cart without enriched details", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => cart),
				getOrderHistory: jest.fn(async () => ({})),
				getOrderDetails: jest.fn(async () => ({})),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		getItemDetails.mockRejectedValue(new Error("item details error"));

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		// Falls back to cart without enriched details
		expect(result.current.cartDetail).toEqual(cart);
	});

	test("getOrderDetails catch with itemCart in localStorage - creates new cart", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		setCartInLocalStorage({ sku: "test", priceCode: "YLE801", cartDate: Date.now() });

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => pendingOrder),
				getOrderDetails: jest.fn(() => Promise.reject(new Error("order details failed"))),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		getItemDetails.mockResolvedValue(mockedItemDetails);

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		expect(result.current.cartDetail).toEqual({ ...cart, items: mockedItemDetails });
	});

	test("getOrderDetails catch without itemCart - just sets isFetchingCartOrder false", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		// No cart in localStorage

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => pendingOrder),
				getOrderDetails: jest.fn(() => Promise.reject(new Error("order details failed"))),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toBe(undefined);
	});

	test("getLastPendingOrder catch with itemCart - creates new cart", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		setCartInLocalStorage({ sku: "test", priceCode: "YLE801", cartDate: Date.now() });

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(() => Promise.reject(new Error("order history failed"))),
				getOrderDetails: jest.fn(async () => ({})),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		getItemDetails.mockResolvedValue(mockedItemDetails);

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		expect(result.current.cartDetail).toEqual({ ...cart, items: mockedItemDetails });
	});

	test("getLastPendingOrder catch without itemCart - sets isFetchingCartOrder false", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		// No localStorage cart

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(() => Promise.reject(new Error("order history failed"))),
				getOrderDetails: jest.fn(async () => ({})),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		expect(result.current.cartDetail).toBe(undefined);
		expect(result.current.orderDetail).toBe(undefined);
	});

	test("getLastestOrderOrCart: only order (no cart) returns lastOrder", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => pendingOrder),
				getOrderDetails: jest.fn(async () => orderDetail),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		expect(result.current.orderDetail).toEqual({ ...orderDetail, items: mockedItemDetails });
		expect(result.current.cartDetail).toBe(undefined);
	});

	test("getLastestOrderOrCart: order date >= cart date returns lastOrder (not cart)", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		// Cart date is older than order date
		const olderCartDate = orderDetail.orderDate - 1000;
		setCartInLocalStorage({ sku: "test", priceCode: "YLE801", cartDate: olderCartDate });

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => pendingOrder),
				getOrderDetails: jest.fn(async () => orderDetail),
				clearCart: jest.fn(async () => {}),
				addItemToCart: jest.fn(async () => cart),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		expect(result.current.orderDetail).toEqual({ ...orderDetail, items: mockedItemDetails });
		expect(result.current.cartDetail).toBe(undefined);
	});

	test("getLastestOrderOrCart: cart date > order date but addItemToCart returns empty items - falls back to order", async () => {
		mockIdentityState = {
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				extendSession: jest.fn(async () => {}),
			},
		};

		// Cart is more recent than order
		const newerCartDate = orderDetail.orderDate + 1000;
		setCartInLocalStorage({ sku: "test", priceCode: "YLE801", cartDate: newerCartDate });

		mockSalesState = {
			Sales: {
				getCart: jest.fn(async () => ({})),
				getOrderHistory: jest.fn(async () => pendingOrder),
				getOrderDetails: jest.fn(async () => orderDetail),
				clearCart: jest.fn(async () => {}),
				// addItemToCart returns cart with no items (empty)
				addItemToCart: jest.fn(async () => ({ items: [] })),
			},
		};

		const { result } = renderHook(() => useCartOrderDetail());

		await waitFor(() => expect(result.current.isFetchingCartOrder).toBe(false));
		// Falls back to lastOrder since newCart has no items
		expect(result.current.orderDetail).toEqual({ ...orderDetail, items: mockedItemDetails });
	});
});
