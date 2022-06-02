import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { AlertBarPresentational } from "./features/alert-bar/default";

export default {
	title: "Blocks/Alert Bar",
	decorators: [withKnobs],
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: { viewports: [320, 1200] },
	},
};

const headlineText = "7 questions about traveling to Australia during catastrophic fires, answered";
const longHeadlineText =
	"This is a really long headline, especially with the longest word pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis pneumonoultramicroscopicsilicovolcanoconiosis";
const linkUrl = "https://storybook.js.org";

export const headlineAndLink = () => (
	<AlertBarPresentational
		alertRef={null}
		arcSite="story-book"
		barAriaLabel="Alert bar"
		closeAriaLabel="Close"
		hideAlertHandler={null}
		linkText={headlineText}
		url={linkUrl}
	/>
);

export const noHeadlineAndWithLink = () => (
	<AlertBarPresentational
		alertRef={null}
		arcSite="story-book"
		barAriaLabel="Alert bar"
		closeAriaLabel="Close"
		hideAlertHandler={null}
		linkText=""
		url={linkUrl}
	/>
);

export const headlineAndNoLink = () => (
	<AlertBarPresentational
		alertRef={null}
		arcSite="story-book"
		barAriaLabel="Alert bar"
		closeAriaLabel="Close"
		hideAlertHandler={null}
		linkText={headlineText}
		url=""
	/>
);

export const headlineWithReallyLongText = () => (
	<AlertBarPresentational
		alertRef={null}
		arcSite="story-book"
		barAriaLabel="Alert bar"
		closeAriaLabel="Close"
		hideAlertHandler={null}
		linkText={longHeadlineText}
		url={linkUrl}
	/>
);
