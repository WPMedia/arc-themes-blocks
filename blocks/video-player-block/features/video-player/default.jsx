import React from "react";

import { useFusionContext } from "fusion:context";
import { useContent } from "fusion:content";

import PropTypes from "@arc-fusion/prop-types";

import {
	formatCredits,
	formatPowaVideoEmbed,
	Heading,
	HeadingSection,
	MediaItem,
	Paragraph,
	Pill,
	Stack,
	Video,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-video-player";

const videoLayouts = {
	inlineVideo: ({
		alertBadge,
		aspectRatio,
		caption,
		credit,
		description,
		embedMarkup,
		captionTitle,
		hideVideoTitle,
		title,
	}) => (
		<Stack className={`${BLOCK_CLASS_NAME}__inline`}>
			{alertBadge ? <Pill>{alertBadge}</Pill> : null}
			<Stack className={`${BLOCK_CLASS_NAME}__inline-video`}>
				{title ? (
					<HeadingSection>
						<Heading>{title}</Heading>
					</HeadingSection>
				) : null}
				<MediaItem caption={caption} credit={credit} title={!hideVideoTitle && captionTitle}>
					<Video aspectRatio={aspectRatio} className="video-container" embedMarkup={embedMarkup} />
				</MediaItem>
			</Stack>
			{description ? <Paragraph>{description}</Paragraph> : null}
		</Stack>
	),
	featureVideo: ({
		alertBadge,
		aspectRatio,
		caption,
		credit,
		description,
		embedMarkup,
		captionTitle,
		hideVideoTitle,
		title,
	}) => (
		<Stack className={`${BLOCK_CLASS_NAME}__feature`}>
			<MediaItem caption={caption} credit={credit} title={!hideVideoTitle && captionTitle}>
				<Video aspectRatio={aspectRatio} className="video-container" embedMarkup={embedMarkup} />
			</MediaItem>
			<Stack className={`${BLOCK_CLASS_NAME}__feature-meta`}>
				{alertBadge ? <Pill>{alertBadge}</Pill> : null}
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

function VideoPlayer({ customFields = {} }) {
	const {
		alertBadge,
		autoplay,
		description,
		displayStyle,
		hideVideoCaption,
		hideVideoCredits,
		hideVideoTitle,
		inheritGlobalContent,
		playthrough,
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
		? contentSource?.descriptions?.basic
		: (title && description) || contentSource?.descriptions?.basic;

	const aspectRatio = 16 / 9;
	const renderVideoLayout = videoLayouts[displayStyle];

	return contentSource?.embed_html
		? renderVideoLayout({
				alertBadge,
				aspectRatio,
				caption: !hideVideoCaption ? captionDescription : null,
				credit: !hideVideoCredits ? formatCredits(contentSource?.credits) : null,
				description,
				embedMarkup: formatPowaVideoEmbed(contentSource?.embed_html, {
					autoplay,
					playthrough,
					aspectRatio: 1 / aspectRatio,
				}),
				captionTitle,
				hideVideoTitle,
				title,
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
	}),
};

VideoPlayer.label = "Video Center Player - Arc Block";

VideoPlayer.icon = "video-player-adjust";

export default VideoPlayer;
