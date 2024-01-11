/* eslint-disable react/no-children-prop */
import React from "react";
import SingleColumnRegular from "./layouts/single-column-regular/default";

export default {
	title: "Layouts/Single Column Regular",
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 960, 1200, 1600] },
	},
};

const layoutItemStyles = {
	navigation: {
		backgroundColor: "rgb(236 155 223)",
		height: "100px",
	},
	footer: {
		height: "100px",
	},
	fullWidth: {
		height: "200px",
	},
	body: {
		height: "200px",
	},
	default: {
		width: "100%",
		backgroundColor: "rgb(230 230 230)",
		textAlign: "center",
	},
};
const getStyles = (name) => {
	const defaults = layoutItemStyles.default;

	return { ...defaults, ...layoutItemStyles[name] };
};

const renderChildren = (name) => layoutItemStyles[name]?.children || null;

const layoutItem = (name) => (
	<div style={getStyles(name)}>
		{name}
		{renderChildren(name)}
	</div>
);

const layoutAreas = [
	"navigation",
	"fullWidth",
  "body",
	"footer",
];

export const basic = () => (
	<div id="fusion-app" className="layout-section">
		<SingleColumnRegular children={layoutAreas.map((name) => layoutItem(name))} />
	</div>
);

export const withRtl = () => {
	<div dir="rtl" id="fusion-app" className="layout-section">
		<SingleColumnRegular children={layoutAreas.map((name) => layoutItem(name))} />
	</div>
}
