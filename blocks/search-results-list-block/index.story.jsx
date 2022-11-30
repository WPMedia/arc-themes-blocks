import React from "react";
import SearchResultsList from "./features/search-results-list/default";

export default {
	parameters: {
		chromatic: { viewports: [640, 1280] },
	},
	title: "Blocks/Search Results List",
};

const globalContent = {
	data: [
		{
			description: { basic: "Basic Description 1" },
			display_date: "2022-01-01T00:00:00.000Z",
			headlines: { basic: "Basic Headline Text" },
			websites: {
				"story-book": {
					website_url: "#",
				},
			},
		},
		{
			description: { basic: "Basic Description 2" },
			display_date: "2022-01-01T00:00:00.000Z",
			headlines: { basic: "Basic Headline Text" },
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
	metadata: { total_hits: 3, q: "storybook search" },
};

export const allFields = () => {
	const customFields = {
		itemContentConfig: {},
		globalContent,
		inheritGlobalContent: true,
		showHeadline: true,
		showImage: true,
		showDescription: true,
		showByline: true,
		showDate: true,
	};

	return <SearchResultsList customFields={customFields} />;
};
