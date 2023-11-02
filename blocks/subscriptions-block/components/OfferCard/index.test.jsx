import React from "react";
import { mount } from "enzyme";
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

const BLOCK_CLASS_NAME = "b-offer";

describe("OfferCard", () => {
	it("renders all fields", () => {
		const wrapper = mount(<OfferCard className={BLOCK_CLASS_NAME} {...props} />);

		const headline = wrapper.find(".b-offer__card h1");
		expect(headline.text()).toEqual(props.headline);

		const subheadline = wrapper.find(".b-offer__card p");
		expect(subheadline.text()).toEqual(props.subHeadline);

		expect(wrapper.find("button").exists()).toBe(true);

		const features = wrapper.find(".b-offer__card--features li");
		expect(features.length).toBe(props.features.length);

		expect(features.at(0).text()).toBe(props.features[0].featureText);
		expect(features.at(1).text()).toBe(props.features[1].featureText);
	});

	it("does not render headline if not present", () => {
		const wrapper = mount(<OfferCard {...props} className={BLOCK_CLASS_NAME} headline={null} />);

		const headline = wrapper.find(".b-offer__card h1");
		expect(headline.exists()).toBe(false);
	});

	it("does not render subHeadline if not present", () => {
		const wrapper = mount(<OfferCard {...props} className={BLOCK_CLASS_NAME} subHeadline={null} />);

		const subheadline = wrapper.find(".b-offer__card p");
		expect(subheadline.exists()).toBe(false);
	});

	it("does not render button if no actionText and no ActionEvent", () => {
		const wrapper = mount(<OfferCard {...props} actionText={null} actionEvent={null} />);

		expect(wrapper.find("button").exists()).toBe(false);
	});

	it("does not render button if no actionText", () => {
		const wrapper = mount(<OfferCard {...props} actionText={null} />);

		expect(wrapper.find("button").exists()).toBe(false);
	});

	it("does not render button if no actionEvent", () => {
		const wrapper = mount(<OfferCard {...props} actionEvent={null} />);

		expect(wrapper.find("button").exists()).toBe(false);
	});

	it("does not render features", () => {
		const wrapper = mount(<OfferCard className={BLOCK_CLASS_NAME} headline="Headline" />);

		const features = wrapper.find(".b-offer__card--features li");
		expect(features.length).toBe(0);
	});
});
