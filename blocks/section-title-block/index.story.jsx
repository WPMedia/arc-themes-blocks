import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import SectionTitle from "./features/section-title/_children/section-title";

export default {
	title: "Blocks/Section Title",
	decorators: [withKnobs],
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 1200] },
	},
};

const allData = {
	_id: "/",
	name: "Section Title",
	children: [
		{
			_id: "/news",
			name: "News",
			children: [],
		},
	],
};

export const sectionWithNestedChildren = () => {
	const dataWithChildren = {
		...allData,
		children: [allData, allData],
	};

	return <SectionTitle content={dataWithChildren} />;
};

export const sectionWithTripleNestedChildren = () => {
	const dataWithChildren = {
		...allData,
		children: [allData, allData],
	};

	const dataWithChildren2 = {
		...dataWithChildren,
		children: [dataWithChildren, dataWithChildren],
	};

	return <SectionTitle content={dataWithChildren2} />;
};

export const sectionWithNoChildren = () => {
	const dataWithNoChildren = {
		...allData,
		children: [],
	};
	return <SectionTitle content={dataWithNoChildren} />;
};

export const sectionWithNoTopLevelTitleWithChildren = () => {
	const dataWithNoName = {
		...allData,
		name: "",
	};
	return <SectionTitle content={dataWithNoName} />;
};

export const childWithNoNameFirst = () => {
	const dataWithNoName = {
		...allData,
		children: [
			{
				...allData,
				name: "",
			},
			allData,
		],
	};
	return <SectionTitle content={dataWithNoName} />;
};

export const childWithNoNameLast = () => {
	const dataWithNoName = {
		...allData,
		children: [
			allData,
			{
				...allData,
				name: "",
			},
		],
	};
	return <SectionTitle content={dataWithNoName} />;
};

export const sectionTitleWithReallyLongName = () => {
	const dataWithReallyLongName = {
		...allData,
		name: "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch long name area news",
	};
	return <SectionTitle content={dataWithReallyLongName} />;
};

export const sectionChildWithReallyLongName = () => {
	const dataWithReallyLongName = {
		...allData,
		children: [
			{
				...allData,
				name: "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch long name area news",
			},
			{
				...allData,
				name: "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch long name area news",
			},
			{
				...allData,
				name: "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch long name area news",
			},
			{
				...allData,
				name: "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch long name area news",
			},
			{
				...allData,
				name: "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch long name area news",
			},
			allData,
		],
	};
	return <SectionTitle content={dataWithReallyLongName} />;
};
