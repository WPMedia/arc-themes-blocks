import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import PaymentIcon from ".";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	Icon: ({name}) => <div data-testid={name}>{name}</div>
}));

describe("Payment Icon component", () => {
	it("should render amex Icon based on type", () => {
		render(<PaymentIcon type='amex' />);
		expect(screen.getByText("Amex")).toBeInTheDocument();
	});

    it("should render applePay Icon based on type", () => {
		render(<PaymentIcon type='ApplePay' />);
		expect(screen.getByText("ApplePay")).toBeInTheDocument();
	});

    it("should render diners Icon based on type", () => {
		render(<PaymentIcon type='diners' />);
		expect(screen.getByText("Diners")).toBeInTheDocument();
	});

    it("should render GooglePay Icon based on type", () => {
		render(<PaymentIcon type='GooglePay' />);
		expect(screen.getByText("GooglePay")).toBeInTheDocument();
	});

    it("should render jcb Icon based on type", () => {
		render(<PaymentIcon type='jcb' />);
		expect(screen.getByText("Jcb")).toBeInTheDocument();
	});

    it("should render mastercard Icon based on type", () => {
		render(<PaymentIcon type='mastercard' />);
		expect(screen.getByText("Mastercard")).toBeInTheDocument();
	});

    it("should render PayPal Icon based on type", () => {
		render(<PaymentIcon type='PayPal' />);
		expect(screen.getByText("PayPal")).toBeInTheDocument();
	});

    it("should render unionpay Icon based on type", () => {
		render(<PaymentIcon type='unionpay' />);
		expect(screen.getByText("Unionpay")).toBeInTheDocument();
	});

    it("should render visa Icon based on type", () => {
		render(<PaymentIcon type='visa' />);
        const svgElement = screen.queryByTestId('Visa');
        expect(svgElement).toBeInTheDocument();
	});

    it("should render test Icon based on type", () => {
		render(<PaymentIcon type='iconTest' />);
		const svgElement = screen.queryByTestId('iconTest');
        expect(svgElement).not.toBeInTheDocument();
	});
});

