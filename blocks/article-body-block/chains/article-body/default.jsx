import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getThemeStyle from "fusion:themes";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import {
	Gallery,
	ImageMetadata,
	Image,
	// presentational component does not do data fetching
	VideoPlayer as VideoPlayerPresentational,
	LazyLoad,
	isServerSide,
	videoPlayerCustomFields,
} from "@wpmedia/engine-theme-sdk";
import Header from "./_children/heading";
import HTML from "./_children/html";
import List from "./_children/list";
import Oembed from "./_children/oembed";
import Quote from "./_children/quote";
import Table from "./_children/table";
import "./_articlebody.scss";

const StyledText = styled.p`
	a {
		color: ${(props) => props.primaryColor};
	}
`;

const StyledLink = styled.a`
	border-bottom: 1px solid ${(props) => props.primaryColor};
	color: ${(props) => props.primaryColor};
`;

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

	// TODO: Split each type into a separate reusable component
	switch (type) {
		case "text": {
			return content && content.length > 0 ? (
				<StyledText
					primaryColor={getThemeStyle(arcSite)["primary-color"]}
					className="body-paragraph"
					key={key}
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			) : null;
		}
		case "copyright": {
			return content && content.length > 0 ? (
				<StyledText
					primaryColor={getThemeStyle(arcSite)["primary-color"]}
					className="body-paragraph body-copyright"
					key={key}
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			) : null;
		}
		case "divider": {
			return (
				<Fragment key={key}>
					<div className="divider">
						<hr />
					</div>
				</Fragment>
			);
		}
		case "image": {
			const {
				url,
				subtitle,
				caption,
				credits,
				alt_text: altText,
				resized_params: resizedImageOptions = {},
				vanity_credits: vanityCredits,
				// alignment not always present
				alignment = "",
				additional_properties: additionalProperties = {},
			} = item;

			// link url set in composer
			const { link = "" } = additionalProperties;

			let widthsObject = {
				small: 768,
				medium: 1024,
				large: 1440,
			};

			// only left and right float supported
			const allowedFloatValue = alignment === "left" || alignment === "right" ? alignment : "";

			let figureImageClassName = "article-body-image-container";

			if (allowedFloatValue) {
				// cut the image width in about half if left or right aligned
				// matched based on allowed widths
				// the goal was to show 50% of width
				widthsObject = {
					small: 274,
					medium: 400,
					large: 768,
				};

				// add space after initial string ' '
				figureImageClassName +=
					allowedFloatValue === "left"
						? " article-body-image-container--mobile-left-float"
						: " article-body-image-container--mobile-right-float";
			}

			if (url) {
				const ArticleBodyImage = () => (
					<Image
						resizedImageOptions={resizedImageOptions}
						url={url}
						alt={altText}
						smallWidth={widthsObject.small}
						smallHeight={0}
						mediumWidth={widthsObject.medium}
						mediumHeight={0}
						largeWidth={widthsObject.large}
						largeHeight={0}
						breakpoints={getProperties(arcSite)?.breakpoints}
						resizerURL={getProperties(arcSite)?.resizerURL}
					/>
				);

				const ArticleBodyImageContainer = ({ children }) => (
					<figure className={figureImageClassName}>
						{children}
						<figcaption>
							<ImageMetadata
								subtitle={!hideImageTitle ? subtitle : null}
								caption={!hideImageCaption ? caption : null}
								credits={!hideImageCredits ? credits : null}
								vanityCredits={!hideImageCredits ? vanityCredits : null}
							/>
						</figcaption>
					</figure>
				);

				// if link url then make entire image clickable
				if (link) {
					return (
						<ArticleBodyImageContainer key={key}>
							<a href={link}>
								<ArticleBodyImage />
							</a>
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
				<Fragment key={key}>
					<p className="interstitial-link block-margin-bottom">
						<span dangerouslySetInnerHTML={{ __html: beforeContent }} />
						<StyledLink
							href={url}
							aria-label={phrases.t("article-body-block.interstitial-link-aria-label")}
							dangerouslySetInnerHTML={{ __html: content }}
							primaryColor={getThemeStyle(arcSite)["primary-color"]}
						/>
						<span dangerouslySetInnerHTML={{ __html: afterContent }} />
					</p>
				</Fragment>
			);
		}

		case "raw_html": {
			return content && content.length > 0 ? (
				<HTML
					key={key}
					id={key}
					content={content}
					primaryColor={getThemeStyle(arcSite)["primary-color"]}
				/>
			) : null;
		}

		case "list": {
			const { list_type: listType, items: listItems } = item;
			// eslint-disable-next-line arrow-body-style
			return listItems && listItems.length > 0 ? (
				<Fragment key={key}>
					<List
						listType={listType}
						listItems={listItems}
						primaryColor={getThemeStyle(arcSite)["primary-color"]}
					/>
				</Fragment>
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
				<Fragment key={key}>
					<section className="correction">
						<h2 className="h6-primary">{labelText}</h2>
						<p>{item.text}</p>
					</section>
				</Fragment>
			) : null;
		}

		case "header":
			return item.content && item.content.length > 0 ? (
				<Header key={key} element={item} primaryColor={getThemeStyle(arcSite)["primary-color"]} />
			) : null;

		case "oembed_response": {
			return item.raw_oembed ? <Oembed key={key} element={item} /> : null;
		}

		case "table": {
			return item.rows ? <Table key={key} element={item} /> : null;
		}

		case "quote":
			switch (item.subtype) {
				case "pullquote":
					return <Quote key={key} element={item} className="pullquote" />;

				case "blockquote":
				default:
					return <Quote key={key} element={item} />;
			}
		case "video":
			return (
				<section key={key} className="block-margin-bottom">
					<VideoPlayerPresentational
						id={id}
						embedMarkup={item.embed_html}
						shrinkToFit={customFields?.shrinkToFit}
						viewportPercentage={customFields?.viewportPercentage}
						displayTitle={!hideVideoTitle}
						displayCaption={!hideVideoCaption}
						displayCredits={!hideVideoCredits}
						subtitle={item?.headlines?.basic}
						caption={item?.description?.basic}
						credits={item.credits}
					/>
				</section>
			);
		case "gallery":
			return (
				<section key={key} className="block-margin-bottom gallery">
					<Gallery
						galleryElements={item.content_elements}
						resizerURL={getProperties(arcSite)?.resizerURL}
						ansId={item._id}
						ansHeadline={item.headlines.basic ? item.headlines.basic : ""}
						autoplayPhraseLabels={{
							start: phrases.t("global.gallery-autoplay-label-start"),
							stop: phrases.t("global.gallery-autoplay-label-stop"),
						}}
						controlsFont={getThemeStyle(arcSite)["primary-font-family"]}
						expandPhrase={phrases.t("global.gallery-expand-button")}
						autoplayPhrase={phrases.t("global.gallery-autoplay-button")}
						pausePhrase={phrases.t("global.gallery-pause-autoplay-button")}
						pageCountPhrase={
							/* istanbul ignore next */ (current, total) =>
								phrases.t("global.gallery-page-count-text", { current, total })
						}
						displayTitle={!hideGalleryTitle}
						displayCaption={!hideGalleryCaption}
						displayCredits={!hideGalleryCredits}
					/>
				</section>
			);
		default:
			return null;
	}
}

const ArticleBody = styled.article`
	font-family: ${(props) => props.secondaryFont};

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	figcaption,
	table {
		font-family: ${(props) => props.primaryFont};
	}

	.body-paragraph,
	.interstitial-link,
	ol,
	ul,
	blockquote p,
	blockquote {
		font-family: ${(props) => props.secondaryFont};
	}
`;

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

	return (
		<ArticleBody
			className="article-body-wrapper"
			primaryFont={getThemeStyle(arcSite)["primary-font-family"]}
			secondaryFont={getThemeStyle(arcSite)["secondary-font-family"]}
		>
			{articleBody}
		</ArticleBody>
	);
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
