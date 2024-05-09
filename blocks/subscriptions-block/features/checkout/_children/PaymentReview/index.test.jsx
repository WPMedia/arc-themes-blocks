import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useRecaptcha } from "@wpmedia/arc-themes-components";

import PaymentReview from ".";

jest.mock("@stripe/react-stripe-js", () => ({
	Elements: ({ children }) => <div>{children}</div>,
}));

jest.mock("@stripe/stripe-js", () => ({
	loadStripe: jest.fn(() => Promise.resolve({})),
}));

const initPayment = {
	orderNumber: "CCYO99EBAVG7E1U3",
	parameter1: "pi_3PDfiBCB9PxBy8pM0bnvZCx7_secret_pip6edSbRcJlOoHrG4Ahu1Q9V",
	parameter2: "pk_test_8lcJamYhIriBdJGHuRYBVjXA00t0PB03Yw",
	parameter3: "pi_3PDfiBCB9PxBy8pM0bnvZCx7",
	parameter4: null,
};

const paymentOptions = {
	stripeIntents: {
		paymentMethodType: 18,
		paymentMethodID: 4336,
	},
	paypal: {
		paymentMethodType: 10,
		paymentMethodID: 4339,
	},
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	usePhrases: jest.fn(() => ({
		t: jest.fn((phrase) => phrase),
	})),
	useIdentity: jest.fn(() => ({
		isInitialized: true,
		Identity: {
			isLoggedIn: jest.fn(() => true),
		},
	})),
    useRecaptcha: jest.fn(async () => ({
		isRecaptchaEnabled: true, 
	})),
	useSales: jest.fn(() => ({
		isInitialized: true,
		Sales: {
			initializePayment: jest.fn(async () => initPayment),
		},
	})),
	Heading: ({ dangerouslySetInnerHTML, children }) =>
		dangerouslySetInnerHTML ? (
			<h1 dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
		) : (
			<div>{children}</div>
		),
	Stack: ({ children }) => <div>{children}</div>,
	Divider: () => <div>-----</div>,
	Button: ({ onClick, actionText, ariaLabel }) => (
		<button type="submit" onClick={onClick} aria-label={ariaLabel}>
			<span dangerouslySetInnerHTML={{ __html: actionText }} />
		</button>
	),
	BotChallengeProtection: () => <div>Bot challenge protection</div>,
	Icon: () => <div>Icon</div>,
}));

const customFields = {
	loginURL: "/account/login/",
	offerURL: "/offer/",
	successURL: "/success/",
	termsOfSaleURL: "/terms-of-sale/",
	termsOfServiceURL: "/terms-of-service/",
	titleApplePayGooglePay: "Arc XP",
};

jest.mock("../../../../components/OrderInformation", () => () => <div>Order Information</div>);
jest.mock("../../../../components/RenewalInformation", () => () => <div>Renewal Information</div>);

describe("Payment Review component", () => {
	test("renders PaymentReview component", () => {
		render(
			<PaymentReview
				paymentOptions={paymentOptions}
				isOpen={{ account: false, billingAddress: true, payment: true, review: false }}
				isComplete={{ account: true, billingAddress: true, payment: false, review: false }}
			/>,
		);

		expect(screen.getByText("3. checkout-block.payment")).toBeInTheDocument();
		expect(screen.getByText("4. checkout-block.review")).toBeInTheDocument();
	});

	test("renders BotChallengeProtection component if error?.code === 130001 or error?.code === 010122 or error?.code === 010125", async () => {
        useRecaptcha.mockImplementation(() => ({
			isRecaptchaEnabled: true,
		}));

		render(
			<PaymentReview
                className=".b-checkout"
				paymentOptions={paymentOptions}
				isOpen={{ account: false, billingAddress: false, payment: false, review: true }}
				isComplete={{ account: true, billingAddress: true, payment: true, review: false }}
				error={{ code: "130001" }}
				customFields={customFields}
			/>,
		);		

        expect(screen.getByText("Bot challenge protection")).toBeInTheDocument();
	});
});
