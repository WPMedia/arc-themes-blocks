import React from "react";
import { shallow } from "enzyme";
import NavLogo from "./nav-logo";

describe("<NavLogo/>", () => {
	it("renders logo", () => {
		const wrapper = shallow(
			<NavLogo
				blockClassName="b-header-nav-chain"
				imageSource="resources/images/logo.png"
				imageAltText="NavBar logo"
			/>
		);

		const navLogo = wrapper.find(".b-header-nav-chain__logo");
		expect(navLogo).toHaveLength(1);
	});

	it("renders SVG logo", () => {
		const wrapper = shallow(
			<NavLogo
				blockClassName="b-header-nav-chain"
				imageSource="resources/images/logo.svg"
				imageAltText="NavBar SVG logo"
			/>
		);

		const navLogo = wrapper.find(".b-header-nav-chain__logo");
		expect(navLogo).toHaveLength(1);

		const navLogoLink = navLogo.find("Link");
		expect(navLogoLink.prop("href")).toEqual("/");
		expect(navLogoLink.prop("title")).toEqual("NavBar SVG logo");

		const navLogoImg = navLogoLink.find("img");
		expect(navLogoImg).toHaveLength(1);
		expect(navLogoImg.prop("src")).toEqual("resources/images/logo.svg");
		expect(navLogoImg.prop("alt")).toEqual("NavBar SVG logo");
	});
});
