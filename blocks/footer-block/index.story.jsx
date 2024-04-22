import React from "react";
import Footer from "./features/footer/default";

export default {
	title: "Blocks/Footer",
	parameters: {
		chromatic: {
			viewports: [320, 1200],
		},
	},
};

const defaultCustomFields = {
	navigationConfig: {
		contentService: "footer-service",
		contentConfigValues: {},
	},
	lazyLoad: false,
};

export const DefaultLayout = () => (
	<footer>
		<Footer
			customFields={defaultCustomFields}
		/>
	</footer>
);

export const RightToLeft = () => (
	<footer dir="rtl">
		<Footer
			customFields={defaultCustomFields}
		/>
	</footer>
);
