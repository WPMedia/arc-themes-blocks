import React from "react";
import { render } from "@testing-library/react";
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

describe("OfferCard", () => {
	it("renders all fields", () => {
		render(<OfferCard className={BLOCK_CLASS_NAME} {...props} />);

		expect(screen.getByText(props.headline)).not.toBeNull();
		expect(screen.getByText(props.subHeadline)).not.toBeNull();

		expect(screen.getByRole("button")).not.toBeNull();

		const ul = getByRole("list");
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
		const { container } = render(<OfferCard {...props} className={BLOCK_CLASS_NAME} subHeadline={null} />);

		expect(container.querySelector(".b-offer__card p")).not.toBeInTheDocument();
	});

	it("does not render button if no actionText and no ActionEvent", () => {
		render(<OfferCard {...props} actionText={null} actionEvent={null} />);
		
		expect(screen.getByRole("button")).not.toBeNull();
	});

	it("does not render button if no actionText", () => {
		render(<OfferCard {...props} actionText={null} />);

		expect(screen.getByRole("button")).not.toBeNull();
	});

	it("does not render button if no actionEvent", () => {
		render(<OfferCard {...props} actionEvent={null} />);

		expect(screen.getByRole("button")).not.toBeNull();
	});

	it("does not render features", () => {
		const { container } = render(<OfferCard className={BLOCK_CLASS_NAME} headline="Headline" />);

		const features = expect(container.querySelector(".b-offer__card--features li"));
		expect(features.length).toBe(0);
	});
});
