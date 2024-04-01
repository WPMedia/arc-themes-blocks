import React from "react";
import { render, screen } from "@testing-library/react";
import OfferCard from ".";

const props = {
	headline: "All Access Annual",
	subHeadline: "Save $40 by subscribing annually",
	actionText: "Subscribe for $68 for one year",
	actionEvent: () => {},
	features: [
		{ featureText: "Unlimited access to The Daily Intelligencer" },
		{ featureText: "Save $40" },
	],
};

const BLOCK_CLASS_NAME = "test-block";

describe("OfferCard", () => {
	it("renders all fields", () => {
		render(<OfferCard className={BLOCK_CLASS_NAME} {...props} />);

		expect(screen.getByText(props.headline)).not.toBeNull();
		expect(screen.getByText(props.subHeadline)).not.toBeNull();

		expect(screen.getByRole("button")).not.toBeNull();

		const ul = screen.getByRole("list");
		expect(ul.childElementCount).toBe(2); // eslint-disable-line

		const ulByClass = document.getElementsByClassName("test-block__card--features--feature-item"); // eslint-disable-line
		expect(ulByClass.length).toBe(2);

		expect(screen.getByText(props.features[0].featureText)).not.toBeNull(); // eslint-disable-line
		expect(screen.getByText(props.features[1].featureText)).not.toBeNull(); // eslint-disable-line
	});

	it("does not render headline if not present", () => {
		render(
			<OfferCard {...props} className={BLOCK_CLASS_NAME} headline={null} />,
		);

		const headingElement = document.getElementsByClassName('.b-offer__card h1'); // eslint-disable-line
		expect(headingElement.length).toBe(0)
	});

	it("does not render subHeadline if not present", () => {
		render(
			<OfferCard {...props} className={BLOCK_CLASS_NAME} subHeadline={null} />,
		);

		const headingElement = document.getElementsByClassName('.b-offer__card p');  // eslint-disable-line
		expect(headingElement.length).toBe(0)
	});

	it("does not render button if no actionText and no ActionEvent", () => {
		render(<OfferCard {...props} actionText={null} actionEvent={null} />);

		const button = screen.queryByRole("button");
  		expect(button).toBeNull();
	});

	it("does not render button if no actionText", () => {
		render(<OfferCard {...props} actionText={null} />);

		const button = screen.queryByRole("button");
  		expect(button).toBeNull();
	});

	it("does not render button if no actionEvent", () => {
		render(<OfferCard {...props} actionEvent={null} />);

		const button = screen.queryByRole("button");
  		expect(button).toBeNull();
	});

	it("does not render features", () => {
		render(<OfferCard className={BLOCK_CLASS_NAME} headline="Headline" />);

		const ulByClass = document.getElementsByClassName("test-block__card--features--feature-item"); // eslint-disable-line
		expect(ulByClass.length).toBe(0);
	});
});
