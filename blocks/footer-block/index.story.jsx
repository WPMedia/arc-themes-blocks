import React from "react";
import Footer from "./features/footer/default";

export default {
	title: "Blocks/Footer",
	component: Footer,
	parameters: {
		chromatic: {
			viewports: [320, 1200],
		},
	},
};

export const DefaultLayout = (
	<footer>
		<Footer
			customFields={{
				navigationConfig: {
					contentService: "footer-service",
					contentConfiguration: {},
				},
			}}
		/>
	</footer>
);

export const RightToLeft = (
	<footer dir="rtl">
		<Footer
			customFields={{
				navigationConfig: {
					contentService: "footer-service",
					contentConfiguration: {},
				},
			}}
		/>
	</footer>
);
