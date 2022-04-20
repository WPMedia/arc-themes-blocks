import { addons } from "@storybook/addons";
import { addParameters } from "@storybook/react";
import arcTheme from "./arcTheme";

// Sort stories alphabetically
addParameters({
	options: {
		storySort: (a, b) =>
			a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
	},
});

addons.setConfig({
	theme: arcTheme,
});
