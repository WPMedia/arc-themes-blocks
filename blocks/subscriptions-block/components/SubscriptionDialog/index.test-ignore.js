import React from "react";
import { render } from "@testing-library/react";

import SubscriptionDialog from ".";

describe("SubscriptionDialog", () => {
	it("renders with minimal required properties", () => {
		render(<SubscriptionDialog linkText="Log in" linkUrl="/" />);

        expect(screen.getByText('Log In.').closest('a')).toHaveAttribute('href', '/');
	});

	it("renders the button as a link", () => {
		render(
			<SubscriptionDialog linkText="Log in" linkUrl="/" actionText="Press Me!" actionUrl="/" />
		);

        expect(screen.getByText('Press Me!').closest('a')).toHaveAttribute('href', '/');
	});

	it("does not render if required action part is missing", () => {
		render(
			<SubscriptionDialog linkText="Log in" linkUrl="/" actionText="Press Me!" />
		);

		expect(screen.getByText('Log in').closest('a')).toHaveAttribute('href', '/');
	});

	it("does not render if other required action part is missing", () => {
		render(<SubscriptionDialog linkText="Log in" linkUrl="/" actionUrl="/" />);

		expect(screen.getByText('Log in').closest('a')).toHaveAttribute('href', '/');
	});

	it("renders the headline", () => {
		render(
			<SubscriptionDialog linkText="Log in" linkUrl="/" headline="Headline 1" />
		);

        expect(screen.getByText("Headline")).not.toBeNull();
	});

	it("renders the subheadlines", () => {
		render(
			<SubscriptionDialog linkText="Log in" linkUrl="/" subHeadline="Headline 2" />
		);

        expect(screen.getByText("Headline 2")).not.toBeNull();
	});

	it("renders the reason", () => {
		render(
			<SubscriptionDialog linkText="Log in" linkUrl="/" reasonPrompt="You need to do this." />
		);

        expect(screen.getByText("You need to do this.")).not.toBeNull();
	});

	it("renders the link prompt text", () => {
		render(
			<SubscriptionDialog linkText="Log in" linkUrl="/" linkPrompt="You should log in." />
		);

		expect(screen.getByText("You should log in.")).not.toBeNull();
	});
});