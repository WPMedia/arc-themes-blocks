import React from "react";
import VideoPlayer from "./features/video-player/default";

export default {
	title: "Blocks/Video Player",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

const embedMarkup =
	'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943" data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943" data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

const customFields = {
	alertBadge: "Alert Badge",
	title: "Video Title",
	description: "Video description would be rendered here",
};

export const noProps = () => <VideoPlayer />;

export const videoOnly = () => <VideoPlayer embedMarkup={embedMarkup} />;

export const alertTitleAndDescription = () => (
	<VideoPlayer embedMarkup={embedMarkup} customFields={customFields} />
);

export const alertBadge = () => (
	<VideoPlayer embedMarkup={embedMarkup} customFields={{ alertBadge: customFields.alertBadge }} />
);

export const withTitle = () => (
	<VideoPlayer embedMarkup={embedMarkup} customFields={{ title: customFields.title }} />
);

export const withDescription = () => (
	<VideoPlayer embedMarkup={embedMarkup} customFields={{ description: customFields.description }} />
);

export const featureVideoOnly = () => (
	<VideoPlayer embedMarkup={embedMarkup} customFields={{ displayStyle: "featureVideo" }} />
);

export const featureAlertTitleAndDescription = () => (
	<VideoPlayer
		embedMarkup={embedMarkup}
		customFields={{ ...customFields, displayStyle: "featureVideo" }}
	/>
);

export const featureAlertBadge = () => (
	<VideoPlayer
		embedMarkup={embedMarkup}
		customFields={{ alertBadge: customFields.alertBadge, displayStyle: "featureVideo" }}
	/>
);

export const featureWithTitle = () => (
	<VideoPlayer
		embedMarkup={embedMarkup}
		customFields={{ title: customFields.title, displayStyle: "featureVideo" }}
	/>
);

export const featureWithDescription = () => (
	<VideoPlayer
		embedMarkup={embedMarkup}
		customFields={{ description: customFields.description, displayStyle: "featureVideo" }}
	/>
);
