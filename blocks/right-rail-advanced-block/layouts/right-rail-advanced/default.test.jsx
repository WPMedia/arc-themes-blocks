import React from "react";
import { shallow } from "enzyme";
import { useAppContext } from "fusion:context";

import RightRailAdvancedLayout from "./default";

const allRenderables = [
	{
		collection: "sections",
		props: { id: 0 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 1 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 2 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 3 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 4 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 5 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 6 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 7 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 8 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 9 },
		children: [1],
	},
	{
		collection: "feature",
		props: { id: 99 },
		children: [0],
	},
];

const renderablesNoFullWidth2 = [
	{
		collection: "sections",
		props: { id: 0 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 1 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 2 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 3 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 4 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 5 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 6 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 7 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 8 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 9 },
		children: [1],
	},
	{
		collection: "sections",
		props: { id: 10 },
		children: [], // length falsy
	},
];

describe("the right rail layout for the default output type", () => {
	it("should place the child nodes into the right places", () => {
		useAppContext.mockReturnValue({ renderables: allRenderables });
		const wrapper = shallow(
			<RightRailAdvancedLayout>
				<div id="navigation" />
				<div id="fullWidth1" />
				<div id="main" />
				<div id="main2" />
				<div id="rightRailTop" />
				<div id="rightRailMiddle" />
				<div id="rightRailBottom" />
				<div id="fullWidth2" />
				<div id="footer" />
			</RightRailAdvancedLayout>
		);

		expect(wrapper.find(".b-right-rail-advanced__navigation")).toMatchInlineSnapshot(`
		<Stack
		  alignment="unset"
		  className="b-right-rail-advanced__navigation"
		  direction="vertical"
		  divider={false}
		  inline={false}
		  justification="start"
		  role="banner"
		  wrap="nowrap"
		>
		  <div
		    id="navigation"
		    key=".0"
		  />
		</Stack>
	`);
		expect(wrapper.find("#fullWidth2").exists()).toBe(true);
		expect(wrapper.find("footer")).toMatchInlineSnapshot(`
		<footer
		  className="b-right-rail-advanced__footer"
		>
		  <div
		    id="footer"
		    key=".8"
		  />
		</footer>
	`);
	});

	it("should not show fullWidth2 section", () => {
		useAppContext.mockReturnValue({ renderables: renderablesNoFullWidth2 });
		const wrapper = shallow(
			<RightRailAdvancedLayout>
				<div id="navigation" />
				<div id="fullWidth1" />
				<div id="main" />
				<div id="main2" />
				<div id="rightRailTop" />
				<div id="rightRailMiddle" />
				<div id="rightRailBottom" />
				<div />
				<div id="footer" />
			</RightRailAdvancedLayout>
		);

		expect(wrapper.find(".b-right-rail-advanced__navigation")).toMatchInlineSnapshot(`
		<Stack
		  alignment="unset"
		  className="b-right-rail-advanced__navigation"
		  direction="vertical"
		  divider={false}
		  inline={false}
		  justification="start"
		  role="banner"
		  wrap="nowrap"
		>
		  <div
		    id="navigation"
		    key=".0"
		  />
		</Stack>
	`);
		expect(wrapper.find("#fullWidth2").exists()).toBe(false);
		expect(wrapper.find("footer")).toMatchInlineSnapshot(`
		<footer
		  className="b-right-rail-advanced__footer"
		>
		  <div
		    id="footer"
		    key=".8"
		  />
		</footer>
	`);
	});
	it("should not render a navigation component if none exists", () => {
		useAppContext.mockReturnValue({ renderables: allRenderables });
		const wrapper = shallow(<RightRailAdvancedLayout />);
		expect(wrapper.find("#navigation").exists()).toBe(false);
	});
});
