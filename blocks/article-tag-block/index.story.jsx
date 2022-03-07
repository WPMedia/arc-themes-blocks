import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { ArticleTagItems } from "./features/tag/default";

export default {
	title: "Blocks/Tags Bar",
	decorators: [withKnobs],
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 1200] },
	},
};

const data = {
	taxonomy: {
		tags: [
			{
				description: "dogs",
				slug: "dogs slug",
				text: "dogs text",
			},
			{
				description: "cats",
				slug: "cats slug",
				text: "cats text",
			},
		],
	},
};

export const showAllFields = () => {
	const allData = data;
	return <ArticleTagItems content={allData} arcSite="story-book" />;
};

export const noTags = () => {
	const noData = {
		taxonomy: {
			tags: [],
		},
	};
	return <ArticleTagItems content={noData} arcSite="story-book" />;
};

export const noDescription = () => {
	const noDescriptionFieldData = {
		taxonomy: {
			tags: [
				{
					slug: "cats slug",
					text: "cats text",
				},
			],
		},
	};
	return <ArticleTagItems content={noDescriptionFieldData} arcSite="story-book" />;
};

export const noSlug = () => {
	const noSlugFieldData = {
		taxonomy: {
			tags: [
				{
					description: "cats",
					text: "cats text",
				},
			],
		},
	};
	return <ArticleTagItems content={noSlugFieldData} arcSite="story-book" />;
};

export const noText = () => {
	const noTextFieldData = {
		taxonomy: {
			tags: [
				{
					description: "cats",
					slug: "cats slug",
				},
			],
		},
	};

	return <ArticleTagItems content={noTextFieldData} arcSite="story-book" />;
};

export const manyTags = () => {
	const tenTags = Array(10)
		.fill(0)
		.map((x, i) => ({
			description: `tag ${i}`,
			slug: `tag-${i}`,
			text: `tag ${i} text`,
		}));

	const tenData = {
		taxonomy: {
			tags: tenTags,
		},
	};

	return <ArticleTagItems content={tenData} arcSite="story-book" />;
};

export const reallyLongTagText = () => {
	const reallyLongTagTextData = {
		description: "description",
		slug: "slug",
		text: "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch news and features of the day here in this town",
	};

	const reallyLongTagData = {
		taxonomy: {
			tags: [reallyLongTagTextData],
		},
	};

	return <ArticleTagItems content={reallyLongTagData} arcSite="story-book" />;
};
