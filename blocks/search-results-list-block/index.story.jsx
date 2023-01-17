import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import SearchResultsList from "./features/search-results-list/default";

export default {
	parameters: {
		chromatic: { viewports: [640, 1280] },
	},
	title: "Blocks/Search Results List",
	decorators: [withKnobs],
};

const globalContent = {
	data: [
		{
			description: { basic: "Basic Description 1" },
			display_date: "2022-01-01T00:00:00.000Z",
			headlines: { basic: "Basic Headline Text" },
			promo_items: {
				basic: {
					_id: "HY6LDPEW4BBFDLBYD4S3S7LZ3E",
					auth: {
						2: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
					},
					type: "image",
					url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
				},
			},
			websites: {
				"story-book": {
					website_url: "#",
				},
			},
		},
		{
			description: {
				basic:
					"Basic Long Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			},
			display_date: "2022-01-01T00:00:00.000Z",
			headlines: { basic: "Basic Headline Text" },
			promo_items: {
				basic: {
					_id: "EM5DTGYGABDJZODV7YVFOC2DOM",
					auth: {
						2: "75f6b4c64c7889dc8eadf6a328999d522be2e2397c7b9a5a0704f6d9afa60fcf",
					},
					type: "image",
					url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/EM5DTGYGABDJZODV7YVFOC2DOM.jpeg",
				},
			},
			websites: {
				"story-book": {
					website_url: "#",
				},
			},
		},
		{
			description: { basic: "Basic Description 3" },
			display_date: "2022-01-01T00:00:00.000Z",
			headlines: { basic: "Basic Headline Text" },
			websites: {
				"story-book": {
					website_url: "#",
				},
			},
		},
	],
	metadata: { total_hits: 130, q: "Example Query" },
};

export const allFields = () => {
	const customFields = {
		globalContent,
		itemContentConfig: {},
		listContentConfig: {
			contentService: null,
			contentConfigValues: {
				offset: 0,
				size: 17,
			},
		},
		inheritGlobalContent: true,
		showHeadline: true,
		showImage: true,
		showDescription: true,
		showByline: true,
		showDate: true,
		imageRatio: "16:9",
	};

	return (
		<>
			<SearchResultsList customFields={customFields} />
		</>
	);
};
