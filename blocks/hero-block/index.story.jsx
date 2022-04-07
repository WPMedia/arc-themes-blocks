import React from "react";
import Hero from "./features/hero/default";

// for more info on storybook and using the component explorer
// https://storybook.js.org/

export default {
	title: "Blocks/Hero",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const showOverlayCenter = () => (
	<Hero
		customFields={{
			layout: "overlay",
			alignment: "center",
			variant: "light",
			imageURLDesktop: "/hero_desktop-progressive.jpeg",
			imageURLMobile: "/hero_mobile-progressive.jpeg",
			imageAltText: "Picture of man in the forest",
			headline: "All The Fall Things",
			subHeadline: "Versatile. Slightly-cooler temps and light layers.",
			description: "Versatile. Slightly-cooler temps and light layers.",
			link1Action: "/mens",
			link1Text: "Shop Men",
			link1Type: "secondary",
			link2Action: "/womans",
			link2Text: "Shop Women",
			link2Type: "secondary",
		}}
	/>
);

export const showOverlayLeft = () => (
	<Hero
		customFields={{
			layout: "overlay",
			alignment: "left",
			variant: "light",
			imageURLDesktop: "/hero_desktop-progressive.jpeg",
			imageURLMobile: "/hero_mobile-progressive.jpeg",
			imageAltText: "Picture of man in the forest",
			headline: "All The Fall Things",
			subHeadline: "Versatile. Slightly-cooler temps and light layers.",
			description: "Versatile. Slightly-cooler temps and light layers.",
			link1Action: "/mens",
			link1Text: "Shop Men",
			link1Type: "secondary",
			link2Action: "/womans",
			link2Text: "Shop Women",
			link2Type: "secondary",
		}}
	/>
);

export const showButtonVariants = () => (
	<Hero
		customFields={{
			layout: "overlay",
			alignment: "left",
			variant: "light",
			imageURLDesktop: "/hero_desktop-progressive.jpeg",
			imageURLMobile: "/hero_mobile-progressive.jpeg",
			imageAltText: "Picture of man in the forest",
			headline: "All The Fall Things",
			subHeadline: "Versatile. Slightly-cooler temps and light layers.",
			description: "Versatile. Slightly-cooler temps and light layers.",
			link1Action: "/mens",
			link1Text: "Shop Men",
			link1Type: "primary",
			link2Action: "/womans",
			link2Text: "Shop Women",
			link2Type: "secondary",
		}}
	/>
);

export const showOnlyOneButton = () => (
	<Hero
		customFields={{
			layout: "overlay",
			alignment: "left",
			variant: "light",
			imageURLDesktop: "/hero_desktop-progressive.jpeg",
			imageURLMobile: "/hero_mobile-progressive.jpeg",
			imageAltText: "Picture of man in the forest",
			headline: "All The Fall Things",
			subHeadline: "Versatile. Slightly-cooler temps and light layers.",
			description: "Versatile. Slightly-cooler temps and light layers.",
			link1Action: "/mens",
			link1Text: "Shop Men",
			link1Type: "primary",
		}}
	/>
);

export const showStackedCenter = () => (
	<Hero
		customFields={{
			layout: "stacked",
			alignment: "center",
			variant: "dark",
			imageURLDesktop: "/hero_desktop-progressive.jpeg",
			imageURLMobile: "/hero_mobile-progressive.jpeg",
			imageAltText: "Picture of man in the forest",
			headline: "All The Fall Things",
			subHeadline: "Versatile. Slightly-cooler temps and light layers.",
			description: "Versatile. Slightly-cooler temps and light layers.",
			link1Action: "/mens",
			link1Text: "Shop Men",
			link1Type: "primary",
			link2Action: "/womans",
			link2Text: "Shop Women",
			link2Type: "primary",
		}}
	/>
);
