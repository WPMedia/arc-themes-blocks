import React from "react";
import TopTableListWrapper from "./features/top-table-list/default";

export default {
	title: "Blocks/Top Table List",
	parameters: {
		chromatic: { viewports: [320, 768, 1200] },
	},
};

const config = {
	showOverlineXL: true,
	showHeadlineXL: true,
	showImageXL: true,
	showDescriptionXL: true,
	showBylineXL: true,
	showDateXL: true,
	showOverlineLG: true,
	showHeadlineLG: true,
	showImageLG: true,
	showDescriptionLG: true,
	showBylineLG: true,
	showDateLG: true,
	showHeadlineMD: true,
	showImageMD: true,
	showDescriptionMD: true,
	showBylineMD: true,
	showDateMD: true,
	showHeadlineSM: true,
	showImageSM: true,
	imagePositionSM: "right",
};

export const noStories = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			extraLarge: 0,
			large: 0,
			medium: 0,
			small: 0,
		}}
	/>
);

export const allSizes = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			extraLarge: 1,
			large: 1,
			medium: 1,
			small: 2,
		}}
	/>
);

export const allSizesNoOverline = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			extraLarge: 1,
			large: 1,
			medium: 1,
			small: 2,
			showOverlineXL: false,
			showOverlineLG: false,
		}}
	/>
);

export const allSizesNoHeadlines = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			extraLarge: 1,
			large: 1,
			medium: 1,
			small: 2,
			showHeadlineXL: false,
			showHeadlineLG: false,
			showHeadlineMD: false,
			showHeadlineSM: false,
		}}
	/>
);

export const allSizesNoDescriptions = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			extraLarge: 1,
			large: 1,
			medium: 1,
			small: 2,
			showDescriptionXL: false,
			showDescriptionLG: false,
			showDescriptionMD: false,
		}}
	/>
);

export const allSizesNoImages = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			extraLarge: 1,
			large: 1,
			medium: 1,
			small: 2,
			showImageXL: false,
			showImageLG: false,
			showImageMD: false,
			showImageSM: false,
		}}
	/>
);

export const allSizesNoByLines = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			extraLarge: 1,
			large: 1,
			medium: 1,
			small: 2,
			showBylineXL: false,
			showBylineLG: false,
			showBylineMD: false,
		}}
	/>
);

export const allSizesNoByDates = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			extraLarge: 1,
			large: 1,
			medium: 1,
			small: 2,
			showDateXL: false,
			showDateLG: false,
			showDateMD: false,
		}}
	/>
);

export const oneExtraLarge = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			extraLarge: 1,
		}}
	/>
);

export const oneLarge = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			large: 1,
		}}
	/>
);

export const oneMedium = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			medium: 1,
		}}
	/>
);

export const fourMediumStories = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			medium: 4,
		}}
	/>
);

export const fourMediumStoriesNoBorder = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			medium: 4,
			showBottomBorderMD: false,
		}}
	/>
);

export const oneSmall = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			small: 1,
		}}
	/>
);

export const fourSmallStoriesOnePerRow = () => (
	<div>
		<TopTableListWrapper
			customFields={{
				...config,
				small: 4,
				storiesPerRowSM: 1,
			}}
		/>
		<TopTableListWrapper
			customFields={{
				...config,
				small: 4,
				storiesPerRowSM: 1,
				imagePositionSM: "below",
			}}
		/>
		<TopTableListWrapper
			customFields={{
				...config,
				small: 4,
				storiesPerRowSM: 1,
				imagePositionSM: "left",
			}}
		/>
		<TopTableListWrapper
			customFields={{
				...config,
				small: 4,
				storiesPerRowSM: 1,
				imagePositionSM: "above",
			}}
		/>
	</div>
);

export const fourSmallStoriesPerRow = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			small: 8,
			storiesPerRowSM: 4,
		}}
	/>
);

export const fourSmallStoriesPerRowNoBorder = () => (
	<TopTableListWrapper
		customFields={{
			...config,
			small: 8,
			storiesPerRowSM: 4,
			showBottomBorderSM: false,
		}}
	/>
);
