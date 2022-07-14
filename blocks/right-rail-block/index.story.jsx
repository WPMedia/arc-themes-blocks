/* eslint-disable react/no-children-prop */
import React from "react";
import RightRailBlock from "./layouts/right-rail/default";

export default {
	title: "Layouts/Right Rail",
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 960, 1200, 1600] },
	},
};

const getStyles = (name, layoutItemStyles) => {
	const defaults = layoutItemStyles.default;

	return { ...defaults, ...layoutItemStyles[name] };
};

const layoutItemStylesBasic = {
	navigation: {
		backgroundColor: "rgb(236 155 223)",
		height: "100px",
	},
	footer: {
		height: "100px",
	},
	main: {
		height: "800px",
	},
	rightRail: {
		height: "600px",
	},
	default: {
		width: "100%",
		backgroundColor: "rgb(230 230 230)",
		textAlign: "center",
	},
};

const layoutItemStylesCommerce = {
	navigation: {
		backgroundColor: "black",
		color: "white",
		height: "100px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	footer: {
		height: "300px",
	},
	fullWidth2: {
		height: "250px",
	},
	main: {
		height: "800px",
	},
	rightRail: {
		height: "600px",
	},
	default: {
		width: "100%",
		backgroundColor: "rgb(230 230 230)",
		textAlign: "center",
	},
};

const layoutItemBasic = (name) => <div style={getStyles(name, layoutItemStylesBasic)}>{name}</div>;

const layoutItemCommerce = (name) => (
	<div style={getStyles(name, layoutItemStylesCommerce)}>
		{name}
		{name === "navigation" ? <h3>Use the commerce theme when viewing this story</h3> : null}
	</div>
);

const layoutAreasBasic = ["navigation", "fullWidth1", "main", "rightRail", "fullWidth2", "footer"];

const layoutAreasCommerce = ["navigation", "", "main", "rightRail", "fullWidth2", "footer"];

export const basic = () => (
	<div id="fusion-app" className="layout-section">
		<RightRailBlock children={layoutAreasBasic.map((name) => layoutItemBasic(name))} />
	</div>
);

export const commerce = () => (
	<div id="fusion-app" className="layout-section">
		<RightRailBlock children={layoutAreasCommerce.map((name) => layoutItemCommerce(name))} />
	</div>
);
