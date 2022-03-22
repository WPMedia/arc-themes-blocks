/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "@arc-fusion/prop-types";
import Consumer from "fusion:consumer";
import getThemeStyle from "fusion:themes";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import Static from "fusion:static";
import {
	Gallery,
	ImageMetadata,
	Image,
	Lightbox,
	// presentational component does not do data fetching
	VideoPlayer as VideoPlayerPresentational,
	videoPlayerCustomFields,
	FullscreenIcon,
} from "@wpmedia/engine-theme-sdk";
import { PrimaryFont } from "@wpmedia/shared-styles";
import "./leadart.scss";

/**
 * @file LeadArt is a React Class Component
 * @summary React component for displaying an image along with a control to present the image in a
 * lightbox (see the lightbox component  in the +shared directory).
 * @extends Component
 */
@Consumer
class LeadArt extends Component {
	constructor(props) {
		super(props);
		const { globalContent: content, arcSite } = this.props;
		this.phrases = getTranslatedPhrases(getProperties(arcSite).locale || "en");
		this.state = {
			isOpen: false,
			buttonLabel: this.phrases.t("global.gallery-expand-button"),
			content,
		};

		this.imgRef = React.createRef();
		this.setIsOpenToFalse = this.setIsOpenToFalse.bind(this);
		this.setIsOpenToTrue = this.setIsOpenToTrue.bind(this);
	}

	setIsOpenToFalse() {
		this.setState({ isOpen: false });
	}

	setIsOpenToTrue() {
		this.setState({ isOpen: true });
	}

	lightboxImgHandler() {
		const imgParentElm = this.imgRef.current;
		const imgElm = imgParentElm.querySelector("img");
		if (imgElm) {
			// this is where it's getting the resized lightbox img
			return imgElm.dataset.lightbox;
		}
		return "";
	}

	render() {
		const { isOpen, content, buttonLabel } = this.state;

		const { arcSite, customFields, id } = this.props;
		const {
			hideTitle = false,
			hideCaption = false,
			hideCredits = false,
			imageLoadingStrategy,
		} = customFields;

		// handles empty string for selecting no option and undefined for default
		const allowedImageLoadingStrategy = imageLoadingStrategy || "eager";

		let AdBlock;

		try {
			/* istanbul ignore next */
			const { default: AdFeature } = require("@wpmedia/ads-block");
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

		if (content.promo_items && (content.promo_items.lead_art || content.promo_items.basic)) {
			const lead_art = content.promo_items.lead_art || content.promo_items.basic;
			let lightbox = null;
			let caption = null;

			if (lead_art.type === "raw_html") {
				// this could be figure and figcaption, a react component
				const mainContent = (
					<>
						<div dangerouslySetInnerHTML={{ __html: lead_art.content }} />
					</>
				);
				lightbox = (
					<>
						{isOpen && (
							<Lightbox
								mainSrc={mainContent}
								onCloseRequest={this.setIsOpenToFalse}
								showImageCaption={false}
							/>
						)}
					</>
				);

				return (
					<div className="lead-art-wrapper">
						<Static id={lead_art._id}>
							<div
								className="inner-content"
								dangerouslySetInnerHTML={{ __html: lead_art.content }}
							/>
						</Static>
						{lightbox}
					</div>
				);
			}

			if (lead_art.type === "video") {
				return (
					<VideoPlayerPresentational
						id={id}
						embedMarkup={lead_art?.embed_html}
						enableAutoplay={!!customFields?.enableAutoplay}
						shrinkToFit={customFields?.shrinkToFit}
						viewportPercentage={customFields?.viewportPercentage}
						customFields={{
							playthrough: !!customFields?.playthrough,
						}}
						displayTitle={!hideTitle}
						displayCaption={!hideCaption}
						displayCredits={!hideCredits}
						subtitle={lead_art?.headlines?.basic}
						caption={lead_art?.description?.basic}
						credits={lead_art.credits}
					/>
				);
			}

			if (lead_art.type === "image") {
				lightbox = (
					<>
						{isOpen && (
							<Lightbox
								mainSrc={this.lightboxImgHandler()}
								onCloseRequest={this.setIsOpenToFalse}
								imageCaption={!hideCaption ? lead_art.caption : null}
							/>
						)}
					</>
				);

				caption = (
					<ImageMetadata
						subtitle={!hideTitle ? lead_art.subtitle : null}
						caption={!hideCaption ? lead_art.caption : null}
						credits={!hideCredits ? lead_art.credits : null}
					/>
				);

				return (
					<figure className="lead-art-wrapper">
						<button type="button" className="btn-full-screen" onClick={this.setIsOpenToTrue}>
							<FullscreenIcon width="100%" height="100%" fill="#6B6B6B" />
							<PrimaryFont as="span">{buttonLabel}</PrimaryFont>
						</button>
						<div ref={this.imgRef}>
							<Image
								url={lead_art.url}
								alt={lead_art.alt_text}
								smallWidth={800}
								smallHeight={0}
								mediumWidth={800}
								mediumHeight={0}
								largeWidth={800}
								largeHeight={0}
								lightBoxWidth={1600}
								lightBoxHeight={0}
								breakpoints={getProperties(arcSite)?.breakpoints}
								resizerURL={getProperties(arcSite)?.resizerURL}
								resizedImageOptions={lead_art.resized_params}
								loading={allowedImageLoadingStrategy} // eager by default, otherwise lazy
							/>
						</div>
						{lightbox}
						{!hideTitle || !hideCaption || !hideCredits ? <figcaption>{caption}</figcaption> : null}
					</figure>
				);
			}
			if (lead_art.type === "gallery") {
				const galleryCubeClicks = getProperties(arcSite)?.galleryCubeClicks;
				const interstitialClicks = parseInt(galleryCubeClicks, 10);

				return (
					<Gallery
						galleryElements={lead_art.content_elements}
						resizerURL={getProperties(arcSite)?.resizerURL}
						ansId={lead_art._id}
						ansHeadline={lead_art.headlines.basic ? lead_art.headlines.basic : ""}
						expandPhrase={this.phrases.t("global.gallery-expand-button")}
						autoplayPhraseLabels={{
							start: this.phrases.t("global.gallery-autoplay-label-start"),
							stop: this.phrases.t("global.gallery-autoplay-label-stop"),
						}}
						controlsFont={getThemeStyle(arcSite)["primary-font-family"]}
						autoplayPhrase={this.phrases.t("global.gallery-autoplay-button")}
						pausePhrase={this.phrases.t("global.gallery-pause-autoplay-button")}
						pageCountPhrase={
							/* istanbul ignore next */ (current, total) =>
								this.phrases.t("global.gallery-page-count-text", {
									current,
									total,
								})
						}
						adElement={/* istanbul ignore next */ () => <AdBlock />}
						interstitialClicks={interstitialClicks}
						displayTitle={!hideTitle}
						displayCaption={!hideCaption}
						displayCredits={!hideCredits}
					/>
				);
			}

			return null;
		}
		return null;
	}
}

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
		...videoPlayerCustomFields(),
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
