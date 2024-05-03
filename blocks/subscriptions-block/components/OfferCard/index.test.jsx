import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import OfferCard from ".";

const props = {
	headline: "All Access Annual",
	subHeadline: "Save $40 by subscribing annually",
	actionText: "Subscribe for $68 for one year",
	actionEvent: () => {},
	features: [
		{ featureText: "Unlimited access to The Daily Intelligencer", id: "feat1" },
		{ featureText: "Save $40", id: "feat2" },
	],
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	Heading: ({ dangerouslySetInnerHTML }) => (
		<h1 dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
	),
	Paragraph: ({ dangerouslySetInnerHTML }) => (
		<div dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
	),
	Button: ({ onClick, actionText }) => <button onClick={onClick}><span dangerouslySetInnerHTML={{ __html: actionText }} /></button>,
	Stack: ({ children }) => <div>{children}</div>,
	Icon: () => <svg>'Icon'</svg>,
}));

const BLOCK_CLASS_NAME = "test-block";

describe("OfferCard", () => {
	it("renders all fields", () => {
		render(<OfferCard className={BLOCK_CLASS_NAME} {...props} />);

		expect(screen.getByText(props.headline)).not.toBeNull();
		expect(screen.getByText(props.subHeadline)).not.toBeNull();

		expect(screen.getByRole("button")).not.toBeNull();

		const ul = screen.getByRole("list");
		expect(ul).toBeInTheDocument();

		expect(screen.getByText(props.features[0].featureText)).not.toBeNull();
		expect(screen.getByText(props.features[1].featureText)).not.toBeNull();
	});

	it("does not render headline if not present", () => {
		const { container } = render(
			<OfferCard {...props} className={BLOCK_CLASS_NAME} headline={null} />,
		);

		expect(container.querySelector(".b-offer__card h1")).not.toBeInTheDocument();
	});

	it("does not render subHeadline if not present", () => {
		const { container } = render(
			<OfferCard {...props} className={BLOCK_CLASS_NAME} subHeadline={null} />,
		);

		expect(container.querySelector(".b-offer__card p")).not.toBeInTheDocument();
	});

	it("does not render button if no actionText and no ActionEvent", () => {
		render(<OfferCard {...props} actionText={null} actionEvent={null} />);

        expect(screen.queryByText(props.actionText)).not.toBeInTheDocument();
	});

	it("does not render button if no actionText", () => {
		render(<OfferCard {...props} actionText={null} />);

        expect(screen.queryByText(props.actionText)).not.toBeInTheDocument();
	});

	it("does not render button if no actionEvent", () => {
		render(<OfferCard {...props} actionEvent={null} />);

        expect(screen.queryByText(props.actionText)).not.toBeInTheDocument();
	});

	it("does not render features", () => {
		const { container } = render(<OfferCard className={BLOCK_CLASS_NAME} headline="Headline" />);

		const features = container.querySelectorAll(".b-offer__card--features li");
		expect(features?.length).toBe(0);
	});
});
