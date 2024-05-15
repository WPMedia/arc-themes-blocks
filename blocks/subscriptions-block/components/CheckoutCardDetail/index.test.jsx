import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CheckoutCardDetail from "./index";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	Paragraph: ({ children }) => <p>{children}</p>,
  Divider: () => <div>-----</div>,
	usePhrases: jest.fn(() => ({
		t: jest.fn((phrase) => phrase),
	})),
  Stack: ({children}) => <div>{children}</div>,
  Heading: ({children}) => <div>{children}</div>
}));

describe("CheckoutCardDetail component", () => {
	it("summary is shown when card is open", async () => {
		render(
			<CheckoutCardDetail type="Account" isOpen>
				<p>Account placeholder</p>
			</CheckoutCardDetail>,
		);
		expect(screen.getByText("1. checkout-block.account")).toHaveTextContent(
			"1. checkout-block.account",
		);
		expect(screen.getByText("Account placeholder")).toHaveTextContent("Account placeholder");
	});
	it("do not show summary if card is closed", async () => {
		render(
			<CheckoutCardDetail type="Account" isOpen={false}>
				<p>Account placeholder</p>
			</CheckoutCardDetail>,
		);
		expect(screen.getByText("1. checkout-block.account")).toHaveTextContent(
			"1. checkout-block.account",
		);
		expect(screen.queryByText("Account placeholder")).toBe(null);
	});
	it("renders billing address card", async () => {
		render(<CheckoutCardDetail type="Billing Address" isOpen />);
		expect(screen.getByText("2. checkout-block.billingAddress")).toHaveTextContent(
			"2. checkout-block.billingAddress",
		);
	});
	it("renders payment card", async () => {
		render(<CheckoutCardDetail type="Payment" isOpen />);
		expect(screen.getByText("3. checkout-block.payment")).toHaveTextContent(
			"3. checkout-block.payment",
		);
	});
	it("renders review card", async () => {
		render(<CheckoutCardDetail type="Review" isOpen />);
		expect(screen.getByText("4. checkout-block.review")).toHaveTextContent(
			"4. checkout-block.review",
		);
	});
});
