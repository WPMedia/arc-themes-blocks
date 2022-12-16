import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";

import { LazyLoad } from "@wpmedia/engine-theme-sdk";

import {
	Carousel,
	Conditional,
	formatCredits,
	Heading,
	HeadingSection,
	Icon,
	Image,
	isServerSide,
	Link,
	MediaItem,
	Paragraph,
	usePhrases,
	Video,
} from "@wpmedia/arc-themes-components";

import getResizeParamsFromANSImage from "./shared/get-resize-params-from-ans-image";

import Header from "./_children/heading";
import HTML from "./_children/html";
import List from "./_children/list";
import Oembed from "./_children/oembed";
import Quote from "./_children/quote";
import Table from "./_children/table";

const BLOCK_CLASS_NAME = "b-article-body";

function parseArticleItem(item, index, arcSite, phrases, id, customFields) {
	const { _id: key = index, type, content } = item;

	const {
		hideImageTitle = false,
		hideImageCaption = false,
		hideImageCredits = false,
		hideGalleryTitle = false,
		hideGalleryCaption = false,
		hideGalleryCredits = false,
		hideVideoTitle = false,
		hideVideoCaption = false,
		hideVideoCredits = false,
	} = customFields;

	switch (type) {
		case "text": {
			return content && content.length > 0 ? (
				<Paragraph key={`${type}_${index}_${key}`} dangerouslySetInnerHTML={{ __html: content }} />
			) : null;
		}
		case "copyright": {
			return content && content.length > 0 ? (
				<Paragraph
					key={`${type}_${index}_${key}`}
					className={`${BLOCK_CLASS_NAME}__copyright`}
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			) : null;
		}

		case "divider": {
			return (
				<Divider
					assistiveHidden={false}
					className={`${BLOCK_CLASS_NAME}__divider`}
					key={`${type}_${index}_${key}`}
				/>
			);
		}

		case "image": {
			const {
				additional_properties: { link = "" } = {},
				// alignment not always present
				alignment = "",
				alt_text: altText,
				caption,
				credits,
				subtitle,
				url,
				vanity_credits: vanityCredits,
			} = item;

			// only left and right float supported
			const allowedFloatValue = alignment === "left" || alignment === "right" ? alignment : "";
			const figureImageClassName = `${BLOCK_CLASS_NAME}__image${
				allowedFloatValue ? ` ${BLOCK_CLASS_NAME}__image-float-${allowedFloatValue}` : ""
			}`;

			if (url) {
				const formattedCredits = formatCredits(vanityCredits || credits);
				return (
					<MediaItem
						key={`${type}_${index}_${key}`}
						className={figureImageClassName}
						caption={!hideImageCaption ? caption : null}
						credit={!hideImageCredits ? formattedCredits : null}
						title={!hideImageTitle ? subtitle : null}
					>
						<Conditional component={Link} condition={link} href={link}>
							<Image
								{...getResizeParamsFromANSImage(
									item,
									allowedFloatValue ? 400 : 800,
									[274, 400, 768, 1024, 1440].map((w) => (allowedFloatValue ? w / 2 : w))
								)}
								alt={altText}
							/>
						</Conditional>
					</MediaItem>
				);
			}
			return null;
		}

		case "interstitial_link": {
			const { url } = item;
			// link string will have to be truthy (non-zero length string) to render below
			if (!(url && content)) return null;
			const beforeContent = "[&nbsp;";
			const afterContent = "&nbsp;]";

			return (
				<Paragraph
					key={`${type}_${index}_${key}`}
					className={`${BLOCK_CLASS_NAME}__interstitial-link`}
				>
					<span dangerouslySetInnerHTML={{ __html: beforeContent }} />
					<Link
						href={url}
						aria-label={phrases.t("article-body-block.interstitial-link-aria-label")}
					>
						{content}
					</Link>
					<span dangerouslySetInnerHTML={{ __html: afterContent }} />
				</Paragraph>
			);
		}

		case "raw_html": {
			return content && content.length > 0 ? (
				<HTML
					key={`${type}_${index}_${key}`}
					id={key}
					className={`${BLOCK_CLASS_NAME}__html`}
					content={content}
				/>
			) : null;
		}

		case "list": {
			const { _id: listId = "", list_type: listType, items: listItems } = item;
			// eslint-disable-next-line arrow-body-style
			return listItems && listItems.length > 0 ? (
				<List key={`${type}_${index}_${listId}_${key}`} listType={listType} listItems={listItems} />
			) : null;
		}

		case "correction": {
			// can either be clarification or correction
			const { correction_type: labelType } = item;
			const labelText =
				labelType === "clarification"
					? phrases.t("article-body-block.clarification")
					: phrases.t("article-body-block.correction");

			return item.text && item.text.length > 0 ? (
				<section className={`${BLOCK_CLASS_NAME}__correction`} key={`${type}_${index}_${key}`}>
					<HeadingSection>
						<Heading>{labelText}</Heading>
						<Paragraph>{item.text}</Paragraph>
					</HeadingSection>
				</section>
			) : null;
		}

		case "header":
			return item.content && item.content.length > 0 ? (
				<Header key={`${type}_${index}_${key}`} classPrefix={BLOCK_CLASS_NAME} element={item} />
			) : null;

		case "oembed_response": {
			return item.raw_oembed ? (
				<Oembed key={`${type}_${index}_${key}`} classPrefix={BLOCK_CLASS_NAME} element={item} />
			) : null;
		}

		case "table": {
			return item.rows ? (
				<Table key={`${type}_${index}_${key}`} element={item} classPrefix={BLOCK_CLASS_NAME} />
			) : null;
		}

		case "quote":
			switch (item.subtype) {
				case "pullquote":
					return (
						<Quote
							key={`${type}_${index}_${key}`}
							element={item}
							classPrefix={BLOCK_CLASS_NAME}
							type="pullquote"
						/>
					);

				case "blockquote":
				default:
					return (
						<Quote key={`${type}_${index}_${key}`} element={item} classPrefix={BLOCK_CLASS_NAME} />
					);
			}

		case "video":
			return (
				<MediaItem
					key={`${type}_${index}_${key}`}
					caption={!hideVideoCaption ? item?.description?.basic : null}
					credit={!hideVideoCredits ? formatCredits(item.credits) : null}
					title={!hideVideoTitle ? item?.headlines?.basic : null}
				>
					<Video className="video-container" embedMarkup={item.embed_html} />
				</MediaItem>
			);
		case "gallery": {
			const total = item.content_elements.length;
			return (
				<section key={`${type}_${index}_${key}`}>
					<Carousel
						id={key}
						className={`${BLOCK_CLASS_NAME}__gallery`}
						label={item?.description?.basic || "Gallery"}
						slidesToShow={1}
						additionalNextButton={
							<button type="button" className={`${BLOCK_CLASS_NAME}__gallery-additional-next`}>
								<Icon name="ChevronRight" />
							</button>
						}
						additionalPreviousButton={
							<button type="button" className={`${BLOCK_CLASS_NAME}__gallery-additional-previous`}>
								<Icon name="ChevronLeft" />
							</button>
						}
						autoplayPhraseLabels={{
							start: phrases.t("global.gallery-autoplay-label-start"),
							stop: phrases.t("global.gallery-autoplay-label-stop"),
						}}
						enableAutoplay
						enableFullScreen
						fullScreenShowButton={
							<button type="button">
								<Icon name="Fullscreen" className={`${BLOCK_CLASS_NAME}__full-screen-icon`} />
								{phrases.t("global.gallery-expand-button")}
							</button>
						}
						showAdditionalSlideControls
						showLabel
						startAutoplayIcon={<Icon name="Play" className={`${BLOCK_CLASS_NAME}__start-icon`} />}
						startAutoplayText={phrases.t("global.gallery-autoplay-button")}
						stopAutoplayIcon={<Icon name="Pause" className={`${BLOCK_CLASS_NAME}__stop-icon`} />}
						stopAutoplayText={phrases.t("global.gallery-pause-autoplay-button")}
						nextButton={
							<Carousel.Button id={key} label="Next Slide">
								<Icon name="ChevronRight" />
							</Carousel.Button>
						}
						previousButton={
							<Carousel.Button id={key} label="Previous Slide">
								<Icon name="ChevronLeft" />
							</Carousel.Button>
						}
					>
						{item.content_elements.map((i, itemIndex) => (
							<Carousel.Item
								label={phrases.t("global.gallery-page-count-text", { itemIndex, total })}
								key={`gallery-item-${i.url}`}
							>
								<MediaItem
									caption={!hideGalleryCaption ? i.caption : null}
									credit={!hideGalleryCredits ? formatCredits(i.credits) : null}
									title={!hideGalleryTitle ? i.subtitle : null}
								>
									<div className={`${BLOCK_CLASS_NAME}__image-wrapper`}>
										<Image
											{...getResizeParamsFromANSImage(i, 800, [400, 600, 800, 1600])}
											alt={i.alt_text}
										/>
									</div>
								</MediaItem>
							</Carousel.Item>
						))}
					</Carousel>
				</section>
			);
		}
		default:
			return null;
	}
}

export const ArticleBodyChainPresentation = ({ children, customFields = {}, context }) => {
	const { globalContent: items = {}, arcSite, id } = context;

	const { content_elements: contentElements = [], copyright, location } = items;
	const { elementPlacement: adPlacementConfigObj = {} } = customFields;
	const phrases = usePhrases();

	const adPlacements = Object.keys(adPlacementConfigObj).map((key) => ({
		feature: +key,
		paragraph: +adPlacementConfigObj[key],
	}));

	const paragraphTotal = contentElements.filter((element) => element.type === "text").length;

	let paragraphCounter = 0;
	const articleBody = [
		...contentElements.map((contentElement, index) => {
			if (contentElement.type === "text") {
				// Start at 1 since the ad configs use one-based array indexes
				paragraphCounter += 1;

				const adsAfterParagraph = adPlacements.filter(
					(placement) => placement.paragraph === paragraphCounter
				);

				if (
					paragraphCounter === 1 &&
					location &&
					contentElement.content.indexOf(`${location} &mdash;`) !== 0
				) {
					// eslint-disable-next-line no-param-reassign
					contentElement.content = `${location} &mdash; ${contentElement.content}`;
				}

				// The ad features should follow the content element if they exist, but not if
				// the current paragraph is the last or second-to-last paragraph.
				if (adsAfterParagraph.length && paragraphCounter < paragraphTotal - 1) {
					return [
						parseArticleItem(contentElement, index, arcSite, phrases, id, customFields),
						...adsAfterParagraph.map((placement) => children[placement.feature - 1]),
					];
				}
			}

			return parseArticleItem(contentElement, index, arcSite, phrases, id, customFields);
		}),
		...(copyright
			? [
					parseArticleItem(
						{
							type: "copyright",
							content: copyright,
						},
						"copyright-text",
						arcSite,
						null, // phrases not used by text type
						null, // id not used by text type
						{} // customFields only used in video
					),
			  ]
			: []),
	];

	return <article className={BLOCK_CLASS_NAME}>{articleBody}</article>;
};

const ArticleBodyChain = ({ children, customFields = {} }) => {
	const context = useFusionContext();
	const { isAdmin } = context;
	if (customFields?.lazyLoad && isServerSide() && !isAdmin) {
		// On Server
		return null;
	}
	return (
		<LazyLoad enabled={customFields?.lazyLoad && !isAdmin}>
			<ArticleBodyChainPresentation context={context} customFields={customFields}>
				{children}
			</ArticleBodyChainPresentation>
		</LazyLoad>
	);
};

ArticleBodyChain.propTypes = {
	customFields: PropTypes.shape({
		elementPlacement: PropTypes.kvp.tag({
			label: "Ad placements",
			group: "Inline ads",
			description:
				"Places your inline article body ads in the article body chain. For each ad feature in the chain, fill in two values below: Field 1) The position of the ad within the chain and Field 2) the paragraph number that this ad should follow in the article body. For example, entering 1 and 3 would mean that the first ad in the article body chain will be placed after the third paragraph in the article.",
		}),
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
		hideImageTitle: PropTypes.bool.tag({
			description: "This display option applies to all Images in the Article Body.",
			label: "Hide Title",
			defaultValue: false,
			group: "Image Display Options",
		}),
		hideImageCaption: PropTypes.bool.tag({
			description: "This display option applies to all Images in the Article Body.",
			label: "Hide Caption",
			defaultValue: false,
			group: "Image Display Options",
		}),
		hideImageCredits: PropTypes.bool.tag({
			description: "This display option applies to all Images in the Article Body.",
			label: "Hide Credits",
			defaultValue: false,
			group: "Image Display Options",
		}),
		hideGalleryTitle: PropTypes.bool.tag({
			description: "This display option applies to all Galleries in the Article Body",
			label: "Hide Title",
			defaultValue: false,
			group: "Gallery Display Options",
		}),
		hideGalleryCaption: PropTypes.bool.tag({
			description: "This display option applies to all Galleries in the Article Body",
			label: "Hide Caption",
			defaultValue: false,
			group: "Gallery Display Options",
		}),
		hideGalleryCredits: PropTypes.bool.tag({
			description: "This display option applies to all Galleries in the Article Body",
			label: "Hide Credits",
			defaultValue: false,
			group: "Gallery Display Options",
		}),
		hideVideoTitle: PropTypes.bool.tag({
			description: "This display option applies to all Videos in the Article Body",
			label: "Hide Title",
			defaultValue: false,
			group: "Video Display Options",
		}),
		hideVideoCaption: PropTypes.bool.tag({
			description: "This display option applies to all Videos in the Article Body",
			label: "Hide Caption",
			defaultValue: false,
			group: "Video Display Options",
		}),
		hideVideoCredits: PropTypes.bool.tag({
			description: "This display option applies to all Videos in the Article Body",
			label: "Hide Credits",
			defaultValue: false,
			group: "Video Display Options",
		}),
	}),
};

ArticleBodyChain.label = "Article Body – Arc Block";

ArticleBodyChain.icon = "arc-article";

export default ArticleBodyChain;
