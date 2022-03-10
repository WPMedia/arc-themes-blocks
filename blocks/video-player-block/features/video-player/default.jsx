import React, { useEffect, useRef } from "react";
import { useFusionContext } from "fusion:context";
import { useContent } from "fusion:content";
import PropTypes from "@arc-fusion/prop-types";
import styled from "styled-components";
import {
	// presentational component does not do data fetching
	VideoPlayer as VideoPlayerPresentational,
	videoPlayerCustomFields,
} from "@wpmedia/engine-theme-sdk";
import { PrimaryFont, SecondaryFont } from "@wpmedia/shared-styles";

const AlertBadge = styled.span`
	background-color: #db0a07;
	border-radius: 1.5rem;
	color: #fff;
	display: inline-block;
	padding: 0.3rem 0.8rem;
	font-size: 0.75rem;
	line-height: 1;
	font-weight: bold;
`;

function getFetchedPassedOrInheritedTitleDescriptionCaption(
	globalContent,
	inheritGlobalContent,
	title,
	description,
	doFetch,
	fetchedData
) {
	let headlineBasic;
	let descriptionBasic;

	// same logic as embed html
	// if inherit global content
	//    then use that
	// else if title and description passed in and truthy
	//    use those next
	// else if electing to use fetched data based off config
	//    use fetched data
	// else
	// 	  return empty strings for title and description
	if (inheritGlobalContent) {
		headlineBasic = globalContent?.headlines?.basic;
		descriptionBasic = globalContent?.description?.basic;
	} else if (title && description) {
		headlineBasic = title;
		descriptionBasic = description;
	} else if (doFetch) {
		headlineBasic = fetchedData?.headlines?.basic;
		descriptionBasic = fetchedData?.description?.basic;
	}

	let credits;

	// since credits can't be passed in, the fallback is to use the fetched data
	if (inheritGlobalContent) {
		credits = globalContent?.credits || {};
	} else {
		credits = fetchedData?.credits || {};
	}

	return {
		headlineBasic: headlineBasic || "",
		descriptionBasic: descriptionBasic || "",
		credits,
	};
}

const VideoPlayer = (props) => {
	const { customFields = {}, embedMarkup, enableAutoplay = false } = props;

	const {
		autoplay,
		inheritGlobalContent,
		playthrough,
		alertBadge,
		title,
		description,
		websiteURL,
		hideVideoTitle = false,
		hideVideoCaption = false,
		hideVideoCredits = false,
	} = customFields;

	const { id, globalContent = {}, arcSite } = useFusionContext();
	const videoRef = useRef(id);
	let embedHTML = "";
	let doFetch = false;

	// If it's inheriting from global content, use the html from the content
	if (inheritGlobalContent) {
		embedHTML = globalContent?.embed_html;
	} else if (embedMarkup) {
		// If there is an embed html being passed in from a parent, use that
		embedHTML = embedMarkup;
	} else {
		doFetch = true;
	}

	// In all other scenarios, fetch from the provided url and content api
	const customFieldSource = customFields?.itemContentConfig?.contentService ?? null;
	const contentConfigValues = customFields?.itemContentConfig?.contentConfigValues;
	// Support for deprecated 'websiteURL' custom field (use 'content-api' & URL for fetch)
	const fetchSource = doFetch ? (!!websiteURL && "content-api") || customFieldSource : null;
	const fetchDataQuery = websiteURL
		? {
				website_url: websiteURL,
				site: arcSite,
		  }
		: contentConfigValues || null;

	const fetchedData = useContent({
		source: fetchSource,
		query: fetchDataQuery,
	});

	embedHTML = doFetch ? fetchedData && fetchedData.embed_html : embedHTML;

	useEffect(() => {
		if (document.getElementById(`video-${videoRef.current}`)) {
			const powaEl = document.getElementById(`video-${videoRef.current}`).firstElementChild;

			if (powaEl) {
				if (window.powaBoot) window.powaBoot();
			}
		}
	});

	const { headlineBasic, descriptionBasic, credits } =
		getFetchedPassedOrInheritedTitleDescriptionCaption(
			globalContent,
			inheritGlobalContent,
			title,
			description,
			doFetch,
			fetchedData
		);

	return (
		<div className="container-fluid">
			{alertBadge && (
				<div className="padding-sm-bottom">
					<AlertBadge>{alertBadge}</AlertBadge>
				</div>
			)}
			{title && (
				<PrimaryFont as="h2" className="xl-promo-headline">
					{title}
				</PrimaryFont>
			)}
			{embedHTML && (
				<VideoPlayerPresentational
					id={id}
					embedMarkup={embedHTML}
					enableAutoplay={enableAutoplay}
					shrinkToFit={customFields?.shrinkToFit}
					viewportPercentage={customFields?.viewportPercentage}
					customFields={{
						autoplay,
						playthrough,
					}}
					displayTitle={!hideVideoTitle}
					displayCaption={!hideVideoCaption}
					displayCredits={!hideVideoCredits}
					subtitle={headlineBasic}
					caption={descriptionBasic}
					credits={credits}
				/>
			)}
			{description && (
				<SecondaryFont as="p" className="description-text">
					{description}
				</SecondaryFont>
			)}
		</div>
	);
};

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
			group: "Video Display Options",
		}),
		hideVideoCaption: PropTypes.bool.tag({
			description: "This display option applies to all Videos in the Video Center Player block",
			label: "Hide Caption",
			defaultValue: false,
			group: "Video Display Options",
		}),
		hideVideoCredits: PropTypes.bool.tag({
			description: "This display option applies to all Videos in the Video Center Player block",
			label: "Hide Credits",
			defaultValue: false,
			group: "Video Display Options",
		}),
		...videoPlayerCustomFields(),
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
	}),

	embedMarkup: PropTypes.string,
	enableAutoplay: PropTypes.bool,
};

VideoPlayer.label = "Video Center Player - Arc Block";

VideoPlayer.icon = "video-player-adjust";

export default VideoPlayer;
