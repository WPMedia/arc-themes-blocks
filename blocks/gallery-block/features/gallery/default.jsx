import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext, useAppContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

import { LazyLoad, isServerSide } from "@wpmedia/engine-theme-sdk";
import { Carousel, Icon, Image, MediaItem } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-gallery";

export const GalleryPresentation = ({
	arcSite,
	customFields: {
		inheritGlobalContent,
		galleryContentConfig,
		hideTitle = false,
		hideCaption = false,
		hideCredits = false,
	} = {},
	globalContent = {},
}) => {
	let AdBlock;

	try {
		const { default: AdFeature } = require("@wpmedia/ads-block/features/ads/default");
		AdBlock = () => (
			<AdFeature
				customFields={{
					adType: "300x250_gallery",
					displayAdLabel: true,
				}}
			/>
		);
	} catch (e) {
		AdBlock = () => <p>Ad block not found</p>;
	}

	const { resizerURL, galleryCubeClicks, locale = "en" } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);
	const content = useContent(
		galleryContentConfig
			? {
					source: galleryContentConfig.contentService,
					query: galleryContentConfig.contentConfigValues,
			  }
			: {}
	);

	const showGlobalContent =
		typeof inheritGlobalContent === "undefined"
			? typeof galleryContentConfig === "undefined"
			: inheritGlobalContent;
	const {
		content_elements: contentElements = [],
		headlines = {},
		id = "",
	} = showGlobalContent ? globalContent : content;

	const interstitialClicks = parseInt(galleryCubeClicks, 10);

	const galleryLength = contentElements.length;

	return (
		<Carousel
			className={BLOCK_CLASS_NAME}
			showLabel
			slidesToShow={1}
			// todo: add headline
			// ansHeadline={headlines?.basic ? headlines.basic : ""}
			showAdditionalSlideControls
			pageCountPhrase={
				/* istanbul ignore next */ (current, total) =>
					phrases.t("global.gallery-page-count-text", { current, total })
			}
			enableAutoplay
			startAutoplayIcon={<Icon name="Play" />}
			startAutoplayText={phrases.t("global.gallery-autoplay-button")}
			stopAutoplayIcon={<Icon name="Pause" />}
			stopAutoplayText={phrases.t("global.gallery-pause-autoplay-button")}
			autoplayPhraseLabels={{
				start: phrases.t("global.gallery-autoplay-label-start"),
				stop: phrases.t("global.gallery-autoplay-label-stop"),
			}}
			enableFullScreen
			fullScreenShowButton={
				<button type="button">
					<Icon name="Fullscreen" />
					{phrases.t("global.gallery-expand-button")}
				</button>
			}
			fullScreenMinimizeButton={
				<button type="button">
					<Icon name="Close" />
				</button>
			}
			adElement={/* istanbul ignore next */ () => <AdBlock />}
			adInterstitialClicks={interstitialClicks}
			nextButton={
				<Carousel.Button id={id} label="Next Slide">
					<Icon className={`${BLOCK_CLASS_NAME}__track-icon`} fill="white" name="ChevronRight" />
				</Carousel.Button>
			}
			previousButton={
				<Carousel.Button id={id} label="Previous Slide">
					<Icon className={`${BLOCK_CLASS_NAME}__track-icon`} name="ChevronLeft" />
				</Carousel.Button>
			}
		>
			{contentElements.map((galleryItem, itemIndex) => (
				<Carousel.Item
					label={phrases.t("global.gallery-page-count-text", { itemIndex, galleryLength })}
					key={`gallery-item-${galleryItem.url}`}
				>
					<MediaItem>
						<Image src={galleryItem.url} />
					</MediaItem>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

const GalleryFeature = ({ customFields = {} }) => {
	const { arcSite, isAdmin } = useFusionContext();
	const { globalContent } = useAppContext();

	if (customFields.lazyLoad && isServerSide() && !isAdmin) {
		// On Server
		return null;
	}
	return (
		<LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
			<GalleryPresentation
				arcSite={arcSite}
				customFields={customFields}
				globalContent={globalContent}
			/>
		</LazyLoad>
	);
};

GalleryFeature.propTypes = {
	customFields: PropTypes.shape({
		galleryContentConfig: PropTypes.contentConfig().tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		inheritGlobalContent: PropTypes.bool.tag({
			group: "Configure Content",
			defaultValue: true,
		}),
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
		hideTitle: PropTypes.bool.tag({
			label: "Hide Title",
			defaultValue: false,
			group: "Display Options",
		}),
		hideCaption: PropTypes.bool.tag({
			name: "Hide Caption",
			defaultValue: false,
			group: "Display Options",
		}),
		hideCredits: PropTypes.bool.tag({
			label: "Hide Credits",
			defaultValue: false,
			group: "Display Options",
		}),
	}),
};

GalleryFeature.label = "Gallery - Arc Block";

GalleryFeature.icon = "picture-polaroid-landscape";

export default GalleryFeature;
