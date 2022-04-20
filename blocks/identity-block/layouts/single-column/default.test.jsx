import React from "react";
import { shallow } from "enzyme";
import { useAppContext } from "fusion:context";

import SingleColumnLayout from "./default";

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
];

describe("Single Column Layout", () => {
	it("should place the child nodes into the right places", () => {
		useAppContext.mockReturnValue({ renderables: allRenderables });
		const wrapper = shallow(
			<SingleColumnLayout>
				<div id="navigation" />
				<div id="main" />
				<div id="footer" />
			</SingleColumnLayout>
		);

		expect(wrapper.find("header")).toHaveHTML(
			'<header class="page-header"><div id="navigation"></div></header>'
		);
		expect(wrapper.find("#main").exists()).toBe(true);
		expect(wrapper.find("footer")).toHaveHTML('<footer><div id="footer"></div></footer>');
	});
});
