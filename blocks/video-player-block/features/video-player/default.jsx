import React from "react";

import { useFusionContext } from "fusion:context";
import { useContent } from "fusion:content";

import PropTypes from "@arc-fusion/prop-types";

import {
	formatCredits,
	formatPowaVideoEmbed,
	getAspectRatio,
	Heading,
	HeadingSection,
	MediaItem,
	Paragraph,
	Badge,
	Stack,
	Video,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-video-player";

const videoLayouts = {
	inlineVideo: ({
		alertBadge,
		aspectRatio,
		viewportPercentage,
		caption,
		credit,
		description,
		embedMarkup,
		captionTitle,
		hideVideoTitle,
		title,
		borderRadius,
	}) => (
		<Stack className={`${BLOCK_CLASS_NAME} ${BLOCK_CLASS_NAME}__inline`}>
			{alertBadge ? <Badge variant="danger">{alertBadge}</Badge> : null}
			{title ? (
				<HeadingSection>
					<Heading>{title}</Heading>
				</HeadingSection>
			) : null}
			<MediaItem caption={caption} credit={credit} title={!hideVideoTitle && captionTitle}>
				<Video
					aspectRatio={aspectRatio}
					viewportPercentage={viewportPercentage}
					className="video-container"
					embedMarkup={embedMarkup}
					borderRadius={borderRadius}
				/>
			</MediaItem>
			{description ? <Paragraph>{description}</Paragraph> : null}
		</Stack>
	),
	featureVideo: ({
		alertBadge,
		aspectRatio,
		viewportPercentage,
		caption,
		credit,
		description,
		embedMarkup,
		captionTitle,
		hideVideoTitle,
		title,
		borderRadius,
	}) => (
		<Stack className={`${BLOCK_CLASS_NAME} ${BLOCK_CLASS_NAME}__feature`}>
			<MediaItem caption={caption} credit={credit} title={!hideVideoTitle && captionTitle}>
				<Video
					aspectRatio={aspectRatio}
					viewportPercentage={viewportPercentage}
					className="video-container"
					embedMarkup={embedMarkup}
					borderRadius={borderRadius}
				/>
			</MediaItem>
			<Stack className={`${BLOCK_CLASS_NAME}__feature-meta`}>
				{alertBadge ? <Badge variant="danger">{alertBadge}</Badge> : null}
				{title ? (
					<HeadingSection>
						<Heading>{title}</Heading>
					</HeadingSection>
				) : null}
				{description ? <Paragraph>{description}</Paragraph> : null}
			</Stack>
		</Stack>
	),
};

function VideoPlayer({ customFields = {}, embedMarkup }) {
	const {
		alertBadge,
		autoplay,
		aspectRatio: videoAspectRatio,
		viewportPercentage = 65,
		description,
		displayStyle = "inlineVideo",
		hideVideoCaption,
		hideVideoCredits,
		hideVideoTitle,
		inheritGlobalContent,
		playthrough,
		borderRadius,
		title,
		websiteURL,
	} = customFields;

	const { globalContent = {}, arcSite } = useFusionContext();

	const fetchQuery = websiteURL
		? { website_url: websiteURL, site: arcSite }
		: customFields?.itemContentConfig?.contentConfigValues || null;

	// Support for deprecated 'websiteURL' custom field (use 'content-api' & URL for fetch)
	const fetchSource = websiteURL
		? "content-api"
		: customFields?.itemContentConfig?.contentService || null;

	const fetchedData = useContent({
		query: inheritGlobalContent ? null : fetchQuery,
		source: inheritGlobalContent ? null : fetchSource,
	});

	const contentSource = inheritGlobalContent ? globalContent : fetchedData;

	const captionTitle = inheritGlobalContent
		? contentSource?.headlines?.basic
		: (description && title) || contentSource?.headlines?.basic;

	const captionDescription = inheritGlobalContent
		? contentSource?.description?.basic
		: (title && description) || contentSource?.description?.basic;

	let aspectRatio = videoAspectRatio;

	// Make sure that the content source exists and has an existing promo item
	if (
		!aspectRatio &&
		contentSource &&
		contentSource.promo_items &&
		contentSource.promo_items.basic
	) {
		// Get the width and height of the promo item and calculate the aspect ratio
		const width = contentSource?.promo_items.basic.width;
		const height = contentSource?.promo_items.basic.height;

		// Assign the calculated value to aspectRatio if it is non-null, otherwise assign default 16:9
		aspectRatio = getAspectRatio(width, height) || "16:9";
	}

	const renderVideoLayout = videoLayouts[displayStyle];
	const powaMarkup = contentSource?.embed_html || embedMarkup;

	return powaMarkup
		? renderVideoLayout({
				alertBadge,
				aspectRatio,
				viewportPercentage,
				caption: !hideVideoCaption ? captionDescription : null,
				credit: !hideVideoCredits ? formatCredits(contentSource?.credits) : null,
				description,
				embedMarkup: formatPowaVideoEmbed(powaMarkup, {
					autoplay,
					playthrough,
				}),
				captionTitle,
				hideVideoTitle,
				title,
				borderRadius,
		  })
		: null;
}

VideoPlayer.propTypes = {
	customFields: PropTypes.shape({
		websiteURL: PropTypes.string.tag({
			label: "Display Content Info",
			hidden: true,
			group: "Configure Content",
		}),
		itemContentConfig: PropTypes.contentConfig("ans-item").tag({
			label: "Video Content",
			group: "Configure Content",
		}),
		inheritGlobalContent: PropTypes.bool.tag({
			label: "Inherit global content",
			defaultValue: true,
			group: "Configure Content",
		}),
		autoplay: PropTypes.bool.tag({
			label: "Autoplay",
			defaultValue: false,
			group: "Video Settings",
		}),
		playthrough: PropTypes.bool.tag({
			label: "Playthrough",
			defaultValue: false,
			group: "Video Settings",
		}),
		hideVideoTitle: PropTypes.bool.tag({
			description: "This display option applies to all Videos in the Video Center Player block",
			label: "Hide Title",
			defaultValue: false,
			group: "Video Subtext Options",
		}),
		hideVideoCaption: PropTypes.bool.tag({
			description: "This display option applies to all Videos in the Video Center Player block",
			label: "Hide Caption",
			defaultValue: false,
			group: "Video Subtext Options",
		}),
		hideVideoCredits: PropTypes.bool.tag({
			description: "This display option applies to all Videos in the Video Center Player block",
			label: "Hide Credits",
			defaultValue: false,
			group: "Video Subtext Options",
		}),
		aspectRatio: PropTypes.oneOf(["16:9", "9:16", "1:1", "4:3"]).tag({
			label: "Player Aspect Ratio",
			defaultValue: "16:9",
			group: "Display settings",
			labels: {
				"16:9": "16:9",
				"9:16": "9:16",
				"1:1": "1:1",
				"4:3": "4:3",
			},
		}),
		viewportPercentage: PropTypes.number.tag({
			description:
				"Percentage of vertical space the player grabs of the viewport (Applies only for 9:16 videos)",
			defaultValue: 65,
			group: "Display settings",
		}),
		title: PropTypes.string.tag({
			label: "Title",
			group: "Display settings",
		}),
		description: PropTypes.string.tag({
			label: "Description",
			group: "Display settings",
		}),
		alertBadge: PropTypes.string.tag({
			label: "Alert Badge",
			group: "Display settings",
		}),
		displayStyle: PropTypes.oneOf(Object.keys(videoLayouts)).tag({
			defaultValue: "inlineVideo",
			label: "Video Display Style",
			labels: {
				inlineVideo: "Inline Video",
				featureVideo: "Feature Video",
			},
			group: "Display settings",
		}),
		borderRadius: PropTypes.bool.tag({
			label: "Round player edges",
			defaultValue: false,
			group: "Display settings",
		}),
	}),
	embedMarkup: PropTypes.string,
};

VideoPlayer.label = "Video Center Player - Arc Block";

VideoPlayer.icon = "video-player-adjust";

export default VideoPlayer;
