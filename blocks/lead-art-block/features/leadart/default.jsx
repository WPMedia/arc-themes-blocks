/* eslint-disable camelcase */
import React, { useState, useRef } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import Static from "fusion:static";
import {
	Button,
	Carousel,
	formatCredits,
	formatPowaVideoEmbed,
	Icon,
	Image,
	MediaItem,
	usePhrases,
	Video,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-lead-art";

/**
 * @file LeadArt is a React Functional Component
 * @summary React component for displaying the lead art of a story whether it is an image, gallery,
 * video, or raw HTML.
 */

export const LeadArtPresentation = (props) => {
	const phrases = usePhrases();
	const [isOpen, setIsOpen] = useState(false);
	const buttonLabel = phrases.t("global.gallery-expand-button");
	const imgRef = useRef();

	const { arcSite, content, customFields } = props;
	const {
		enableAutoplay = false,
		hideTitle = false,
		hideCaption = false,
		hideCredits = false,
		imageLoadingStrategy = "eager",
		imageRatio = "16:9",
		playthrough = false,
		videoRatio = "--",
		viewportPercentage = 65
	} = customFields;

	/* istanbul ignore next  */
	const toggleFullScreen = () => {
		// the full screen element is the div wrapping a lead art of type image
		const fullScreenElement = imgRef.current;

		if (document.fullscreenEnabled) {
			if (!document.fullscreenElement) {
				fullScreenElement.requestFullscreen().then(() => setIsOpen(true));
			} else {
				document.exitFullscreen().then(() => setIsOpen(false));
			}
		} else {
			// safari needs prefix
			// eslint-disable-next-line no-lonely-if
			if (document.webkitFullscreenEnabled) {
				if (!document.webkitFullscreenElement) {
					fullScreenElement.webkitRequestFullscreen().then(() => setIsOpen(true));
				} else {
					document.webkitExitFullscreen().then(() => setIsOpen(false));
				}
			}
		}
	};

	let AdBlock;

	try {
		/* istanbul ignore next */
		const { default: AdFeature } = require("@wpmedia/ads-block/features/ads/default");
		/* istanbul ignore next */
		/* eslint-disable-next-line react/no-unstable-nested-components */
		AdBlock = () => (
			<AdFeature
				customFields={{
					adType: "300x250_gallery",
					displayAdLabel: true,
				}}
			/>
		);
	} catch (e) {
		/* istanbul ignore next */
		/* eslint-disable-next-line react/no-unstable-nested-components */
		AdBlock = () => <p>Ad block not found</p>;
	}

	const getLeadArtContent = (leadArt) => {
		if (leadArt.type === "raw_html") {
			return (
				<Static id={`${BLOCK_CLASS_NAME}-${leadArt._id}`}>
					<div dangerouslySetInnerHTML={{ __html: leadArt.content }} />
				</Static>
			);
		}

		if (leadArt.type === "video") {
			const embedMarkup = formatPowaVideoEmbed(leadArt?.embed_html, {
				autoplay: enableAutoplay,
				playthrough,
			});

			return (
				<MediaItem
					caption={!hideCaption ? leadArt?.description?.basic : null}
					credit={!hideCredits ? formatCredits(leadArt.credits) : null}
					title={!hideTitle ? leadArt?.headlines?.basic : null}
				>
					<Video
						aspectRatio={videoRatio}
						embedMarkup={embedMarkup}
						viewportPercentage={viewportPercentage}
						borderRadius={customFields?.borderRadius}
					/>
				</MediaItem>
			);
		}

		if (leadArt.type === "image") {
			return (
				<MediaItem
					caption={!hideCaption ? leadArt.caption : null}
					credit={!hideCredits ? formatCredits(leadArt.credits) : null}
					title={!hideTitle ? leadArt.subtitle : null}
				>
					<Button
						iconLeft={<Icon name="Fullscreen" />}
						accessibilityLabel={
							!isOpen
								? phrases.t("lead-art-block.fullscreen-enter")
								: phrases.t("lead-art-block.fullscreen-exit")
						}
						onClick={toggleFullScreen}
					>
						{buttonLabel}
					</Button>
					<div className={`${BLOCK_CLASS_NAME}__image-wrapper`} ref={imgRef}>
						<Image
							alt={leadArt.alt_text}
							aspectRatio={imageRatio || "16:9"}
							loading={imageLoadingStrategy}
							width={800}
							responsiveImages={[800, 1600]}
							resizedOptions={{ smart: true }}
							ansImage={leadArt}
						/>
						{isOpen ? (
							<Button
								type="button"
								onClick={toggleFullScreen}
								accessibilityLabel={phrases.t("lead-art-block.fullscreen-exit")}
							>
								<Icon name="Close" />
							</Button>
						) : null}
					</div>
				</MediaItem>
			);
		}

		if (leadArt.type === "gallery") {
			const galleryCubeClicks = getProperties(arcSite)?.galleryCubeClicks;
			const interstitialClicks = parseInt(galleryCubeClicks, 10);

			return (
				<Carousel
					className={`${BLOCK_CLASS_NAME}__carousel`}
					id={`${BLOCK_CLASS_NAME}-${leadArt._id}`}
					showLabel
					label={leadArt?.headlines?.basic}
					slidesToShow={1}
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
						<Carousel.Button label={phrases.t("global.gallery-expand-button")}>
							<Icon name="Fullscreen" />
							{phrases.t("global.gallery-expand-button")}
						</Carousel.Button>
					}
					fullScreenMinimizeButton={
						<Button
							variant="secondary-reverse"
							type="button"
							className={`${BLOCK_CLASS_NAME}__carousel__close-button`}
						>
							<Icon name="Close" />
						</Button>
					}
					adElement={/* istanbul ignore next */ <AdBlock />}
					adInterstitialClicks={interstitialClicks}
					nextButton={
						<Carousel.Button
							id={`${BLOCK_CLASS_NAME}-${leadArt._id}`}
							label={phrases.t("global.gallery-next-label")}
							className={`${BLOCK_CLASS_NAME}__carousel__track-button`}
						>
							<Icon fill="white" name="ChevronRight" />
						</Carousel.Button>
					}
					previousButton={
						<Carousel.Button
							id={`${BLOCK_CLASS_NAME}-${leadArt._id}`}
							label={phrases.t("global.gallery-previous-label")}
							className={`${BLOCK_CLASS_NAME}__carousel__track-button`}
						>
							<Icon name="ChevronLeft" />
						</Carousel.Button>
					}
				>
					{leadArt.content_elements.map((galleryItem, itemIndex) => (
						<Carousel.Item
							label={phrases.t("global.gallery-page-count-text", {
								current: itemIndex + 1,
								total: leadArt.content_elements.length,
							})}
							key={`gallery-item-${galleryItem.url}`}
						>
							<MediaItem
								caption={!hideCaption ? galleryItem.caption : null}
								credit={
									!hideCredits
										? formatCredits(galleryItem.vanityCredits || galleryItem.credits)
										: null
								}
								title={!hideTitle ? galleryItem.subtitle : null}
							>
								<div className={`${BLOCK_CLASS_NAME}__image-wrapper`}>
									<Image
										ansImage={galleryItem}
										loading={itemIndex === 0 ? imageLoadingStrategy : "lazy"}
										height={450}
										responsiveImages={[800, 1600]}
										alt={galleryItem.alt_text}
									/>
								</div>
							</MediaItem>
						</Carousel.Item>
					))}
				</Carousel>
			);
		}

		return null;
	};

	const lead_art = content?.promo_items?.lead_art || content?.promo_items?.basic || {};
	const leadArtContent = getLeadArtContent(lead_art);
	if (leadArtContent) {
		return <div className={BLOCK_CLASS_NAME}>{leadArtContent}</div>;
	}

	return null;
};

const LeadArt = ({ customFields }) => {
	const { globalContent, arcSite } = useFusionContext();
	return (
		<LeadArtPresentation customFields={customFields} content={globalContent} arcSite={arcSite} />
	);
};

LeadArt.label = "Lead Art – Arc Block";

LeadArt.icon = "picture-landscape";

LeadArt.defaultProps = {
	customFields: {
		enableAutoplay: false,
		playthrough: false,
	},
};

LeadArt.propTypes = {
	customFields: PropTypes.shape({
		enableAutoplay: PropTypes.bool.tag({
			label: "Autoplay",
			defaultValue: false,
			group: "Video",
		}),
		playthrough: PropTypes.bool.tag({
			label: "Playthrough",
			defaultValue: false,
			group: "Video",
		}),
		viewportPercentage: PropTypes.number.tag({
			description:
				"Height percentage the player takes from viewport (Applies only for 9:16 videos)",
			label: "View height percentage",
			defaultValue: 65,
			group: "Video",
		}),
		videoRatio: PropTypes.oneOf(["--", "16:9", "9:16", "1:1", "4:3"]).isRequired.tag({
			description:
				"Aspect ratio to use in player (Defaults to the aspect ratio of the resolved video)",
			label: "Player aspect ratio",
			defaultValue: "--",
			group: "Video",
			labels: {
				"--": "Video Source",
				"16:9": "16:9",
				"9:16": "9:16",
				"1:1": "1:1",
				"4:3": "4:3",
			},
		}),
		hideTitle: PropTypes.bool.tag({
			description:
				"This display option applies to Lead Art media types: Images, Gallery, and Video",
			label: "Hide Title",
			defaultValue: false,
			group: "Display Options",
		}),
		hideCaption: PropTypes.bool.tag({
			description:
				"This display option applies to Lead Art media types: Images, Gallery, and Video",
			label: "Hide Caption",
			defaultValue: false,
			group: "Display Options",
		}),
		hideCredits: PropTypes.bool.tag({
			description:
				"This display option applies to Lead Art media types: Images, Gallery, and Video",
			label: "Hide Credits",
			defaultValue: false,
			group: "Display Options",
		}),
		borderRadius: PropTypes.bool.tag({
			label: "Round player corners",
			description: "Applies only for 9:16 videos",
			defaultValue: false,
			group: "Video",
		}),
		imageLoadingStrategy: PropTypes.oneOf(["lazy", "eager"]).tag({
			label: "Image Loading Strategy",
			defaultValue: "eager",
			group: "Display Options",
			labels: {
				eager: "Eager",
				lazy: "Lazy",
			},
		}),
		imageRatio: PropTypes.oneOf(["16:9", "4:3", "3:2"]).tag({
			defaultValue: "16:9",
			label: "Image ratio",
			group: "Display Options",
			ordered: false
		}),
	}),
};

export default LeadArt;
