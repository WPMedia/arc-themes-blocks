import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SubscriptionDialog from ".";

const defaultProps = {
	linkText: "Log In",
	linkUrl: "/account/login",
};

describe("SubscriptionDialog", () => {
	it("renders the login link", () => {
		render(<SubscriptionDialog {...defaultProps} />);
		expect(screen.getByText("Log In").closest("a")).toHaveAttribute("href", "/account/login");
	});

	it("renders the action button when both actionText and actionUrl are provided", () => {
		render(<SubscriptionDialog {...defaultProps} actionText="Subscribe" actionUrl="/offer/" />);
		expect(screen.getByText("Subscribe")).not.toBeNull();
	});

	it("does not render the action button when actionUrl is missing", () => {
		render(<SubscriptionDialog {...defaultProps} actionText="Subscribe" />);
		expect(screen.queryByText("Subscribe")).toBeNull();
	});

	it("does not render the action button when actionText is missing", () => {
		render(<SubscriptionDialog {...defaultProps} actionUrl="/offer/" />);
		expect(screen.queryByRole("button")).toBeNull();
	});

	it("renders headline when provided", () => {
		render(<SubscriptionDialog {...defaultProps} headline="Subscribe Now" />);
		expect(screen.getByText("Subscribe Now")).not.toBeNull();
	});

	it("does not render headline when not provided", () => {
		const { container } = render(<SubscriptionDialog {...defaultProps} />);
		expect(container.querySelector("h2")).toBeNull();
	});

	it("renders subheadline when provided", () => {
		render(<SubscriptionDialog {...defaultProps} subHeadline="Get full access" />);
		expect(screen.getByText("Get full access")).not.toBeNull();
	});

	it("renders reasonPrompt when provided", () => {
		render(<SubscriptionDialog {...defaultProps} reasonPrompt="Subscribe to continue reading." />);
		expect(screen.getByText("Subscribe to continue reading.")).not.toBeNull();
	});

	it("renders linkPrompt when provided", () => {
		render(<SubscriptionDialog {...defaultProps} linkPrompt="Already a subscriber?" />);
		expect(screen.getByText("Already a subscriber?")).not.toBeNull();
	});

	it("does not render the login link section when isLoggedIn is true", () => {
		render(<SubscriptionDialog {...defaultProps} isLoggedIn />);
		expect(screen.queryByText("Log In")).toBeNull();
	});
});
