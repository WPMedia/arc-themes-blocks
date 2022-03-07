import React from "react";
import { mount } from "enzyme";
import SmallPromoContainer from "./container";

describe("SmallPromoContainer", () => {
	const mockHeadline = <h1>mockHeadline</h1>;
	const mockImage = <img href="mocklink.jpg" alt="mock image" />;

	it("renders with no image", () => {
		const result = mount(<SmallPromoContainer headline={mockHeadline} imagePosition="above" />);
		expect(result).toMatchSnapshot();
	});

	it("default to headline first dom structure by default", () => {
		const result = mount(<SmallPromoContainer headline={mockHeadline} image={mockImage} />);
		expect(result).toMatchSnapshot();
	});

	it("render headline first if image position is below", () => {
		const result = mount(
			<SmallPromoContainer headline={mockHeadline} image={mockImage} imagePosition="below" />
		);
		expect(result).toMatchSnapshot();
	});

	it("render image first if image position is on left", () => {
		const result = mount(
			<SmallPromoContainer headline={mockHeadline} image={mockImage} imagePosition="left" />
		);
		expect(result).toMatchSnapshot();
	});

	it("render image first if image position is above", () => {
		const result = mount(
			<SmallPromoContainer headline={mockHeadline} image={mockImage} imagePosition="above" />
		);
		expect(result).toMatchSnapshot();
	});
});
