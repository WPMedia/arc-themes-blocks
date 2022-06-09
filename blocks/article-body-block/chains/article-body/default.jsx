import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { LazyLoad, isServerSide, videoPlayerCustomFields } from "@wpmedia/engine-theme-sdk";

import {
	formatCredits,
	Carousel,
	Heading,
	HeadingSection,
	Icon,
	Image,
	Link,
	MediaItem,
	Paragraph,
	Video,
} from "@wpmedia/arc-themes-components";

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
				<Paragraph key={key} dangerouslySetInnerHTML={{ __html: content }} />
			) : null;
		}
		case "copyright": {
			return content && content.length > 0 ? (
				<Paragraph
					key={key}
					className={`${BLOCK_CLASS_NAME}__copyright`}
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			) : null;
		}

		case "divider": {
			return <hr className={`${BLOCK_CLASS_NAME}__divider`} key={key} />;
		}

		case "image": {
			const {
				url,
				subtitle,
				caption,
				credits,
				alt_text: altText,
				vanity_credits: vanityCredits,
				// alignment not always present
				alignment = "",
				additional_properties: additionalProperties = {},
			} = item;

			// link url set in composer
			const { link = "" } = additionalProperties;

			// only left and right float supported
			const allowedFloatValue = alignment === "left" || alignment === "right" ? alignment : "";

			let figureImageClassName = `${BLOCK_CLASS_NAME}__image`;

			if (allowedFloatValue) {
				// add space after initial string ' '
				figureImageClassName +=
					allowedFloatValue === "left"
						? ` ${BLOCK_CLASS_NAME}__image-float-left`
						: ` ${BLOCK_CLASS_NAME}__image-float-right`;
			}

			if (url) {
				const ArticleBodyImage = () => <Image src={url} alt={altText} />;
				const formattedCredits = formatCredits(vanityCredits || credits);

				const ArticleBodyImageContainer = ({ children }) => (
					<MediaItem
						key={key}
						className={figureImageClassName}
						caption={!hideImageCaption ? caption : null}
						credit={!hideImageCredits ? formattedCredits : null}
						title={!hideImageTitle ? subtitle : null}
					>
						{children}
					</MediaItem>
				);

				// if link url then make entire image clickable
				if (link) {
					return (
						<ArticleBodyImageContainer key={key}>
							<Link href={link}>
								<ArticleBodyImage />
							</Link>
						</ArticleBodyImageContainer>
					);
				}

				return (
					<ArticleBodyImageContainer key={key}>
						<ArticleBodyImage />
					</ArticleBodyImageContainer>
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
				<Paragraph key={key} className={`${BLOCK_CLASS_NAME}__interstitial-link`}>
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
				<HTML key={key} id={key} className={`${BLOCK_CLASS_NAME}__html`} content={content} />
			) : null;
		}

		case "list": {
			const { list_type: listType, items: listItems } = item;
			// eslint-disable-next-line arrow-body-style
			return listItems && listItems.length > 0 ? (
				<List key={key} listType={listType} listItems={listItems} />
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
				<section className={`${BLOCK_CLASS_NAME}__correction`} key={key}>
					<HeadingSection>
						<Heading>{labelText}</Heading>
						<Paragraph>{item.text}</Paragraph>
					</HeadingSection>
				</section>
			) : null;
		}

		case "header":
			return item.content && item.content.length > 0 ? (
				<Header key={key} classPrefix={BLOCK_CLASS_NAME} element={item} />
			) : null;

		case "oembed_response": {
			return item.raw_oembed ? <Oembed key={key} element={item} /> : null;
		}

		case "table": {
			return item.rows ? <Table key={key} element={item} classPrefix={BLOCK_CLASS_NAME} /> : null;
		}

		case "quote":
			switch (item.subtype) {
				case "pullquote":
					return <Quote key={key} element={item} classPrefix={BLOCK_CLASS_NAME} type="pullquote" />;

				case "blockquote":
				default:
					return <Quote key={key} element={item} classPrefix={BLOCK_CLASS_NAME} />;
			}

		case "video":
			return (
				<MediaItem
					key={key}
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
				<section key={key}>
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
										<Image src={i.url} alt={i.alt_text} width={800} />
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
	const { locale = "en" } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

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
		...videoPlayerCustomFields(),
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
