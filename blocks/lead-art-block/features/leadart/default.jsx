/* eslint-disable camelcase */
import React, { useState, useRef } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import { RESIZER_APP_VERSION, RESIZER_URL } from "fusion:environment";
import getProperties from "fusion:properties";
import Static from "fusion:static";
import {
	Button,
	Carousel,
	formatCredits,
	formatPowaVideoEmbed,
	Icon,
	Image,
	imageANSToImageSrc,
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
		hideTitle = false,
		hideCaption = false,
		hideCredits = false,
		imageLoadingStrategy,
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
		AdBlock = () => <p>Ad block not found</p>;
	}

	const getLeadArtContent = (lead_art) => {
		if (lead_art.type === "raw_html") {
			return (
				<Static id={`${BLOCK_CLASS_NAME}-${lead_art._id}`}>
					<div dangerouslySetInnerHTML={{ __html: lead_art.content }} />
				</Static>
			);
		}

		if (lead_art.type === "video") {
			const embedMarkup = formatPowaVideoEmbed(lead_art?.embed_html, {
				autoplay: customFields?.enableAutoplay,
				playthrough: customFields?.playthrough,
			});
			return (
				<MediaItem
					caption={!hideCaption ? lead_art?.description?.basic : null}
					credit={!hideCredits ? formatCredits(lead_art.credits) : null}
					title={!hideTitle ? lead_art?.headlines?.basic : null}
				>
					<Video
						aspectRatio="16 / 9"
						embedMarkup={embedMarkup}
						viewportPercentage={customFields?.viewportPercentage}
					/>
				</MediaItem>
			);
		}

		if (lead_art.type === "image") {
			return (
				<MediaItem
					caption={!hideCaption ? lead_art.caption : null}
					credit={!hideCredits ? formatCredits(lead_art.credits) : null}
					title={!hideTitle ? lead_art.subtitle : null}
				>
					<Button
						iconLeft={<Icon name="Fullscreen" width="100%" height="100%" fill="#6B6B6B" />}
						label={
							!isOpen
								? phrases.t("lead-art-block.fullscreen-enter")
								: phrases.t("lead-art-block.fullscreen-exit")
						}
						onClick={toggleFullScreen}
					>
						<span>{buttonLabel}</span>
					</Button>
					<div ref={imgRef}>
						<Image
							src={imageANSToImageSrc(lead_art)}
							alt={lead_art.alt_text}
							loading={imageLoadingStrategy}
							// 16:9 aspect ratio
							width={800}
							height={450}
							responsiveImages={[800, 1600]}
							resizedOptions={{ auth: lead_art.auth[RESIZER_APP_VERSION] }}
							resizerURL={RESIZER_URL}
						/>
					</div>
				</MediaItem>
			);
		}

		if (lead_art.type === "gallery") {
			const galleryCubeClicks = getProperties(arcSite)?.galleryCubeClicks;
			const interstitialClicks = parseInt(galleryCubeClicks, 10);

			return (
				<Carousel
					id={`${BLOCK_CLASS_NAME}-${lead_art._id}`}
					showLabel
					label={lead_art?.headlines?.basic}
					slidesToShow={1}
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
					adElement={/* istanbul ignore next */ <AdBlock />}
					adInterstitialClicks={interstitialClicks}
					nextButton={
						<Carousel.Button
							id={`${BLOCK_CLASS_NAME}-${lead_art._id}`}
							label={phrases.t("global.gallery-next-label")}
						>
							<Icon
								className={`${BLOCK_CLASS_NAME}__track-icon`}
								fill="white"
								name="ChevronRight"
							/>
						</Carousel.Button>
					}
					previousButton={
						<Carousel.Button
							id={`${BLOCK_CLASS_NAME}-${lead_art._id}`}
							label={phrases.t("global.gallery-previous-label")}
						>
							<Icon className={`${BLOCK_CLASS_NAME}__track-icon`} name="ChevronLeft" />
						</Carousel.Button>
					}
				>
					{lead_art.content_elements.map((galleryItem, itemIndex) => (
						<Carousel.Item
							label={phrases.t("global.gallery-page-count-text", {
								current: itemIndex + 1,
								total: lead_art.content_elements.length,
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
										src={imageANSToImageSrc(galleryItem)}
										resizerURL={RESIZER_URL}
										resizedOptions={{ auth: galleryItem.auth[RESIZER_APP_VERSION] }}
										// 16:9 aspect ratio
										width={800}
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
		imageLoadingStrategy: PropTypes.oneOf(["lazy", "eager"]).tag({
			label: "Image Loading Strategy",
			defaultValue: "eager",
			group: "Display Options",
			labels: {
				eager: "Eager",
				lazy: "Lazy",
			},
		}),
	}),
};

export default LeadArt;
