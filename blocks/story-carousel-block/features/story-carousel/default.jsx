import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Carousel, Image, Icon, Heading, Paragraph, Stack } from "@wpmedia/arc-themes-components";
import { useContent } from "fusion:content";
import { extractImageFromStory } from "@wpmedia/resizer-image-block";
import { useFusionContext, useComponentContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

const BLOCK_CLASS_NAME = "b-story-carousel";

const StoryCarousel = ({
	customFields: {
		inheritGlobalContent = false,
		carouselContentConfig: { contentService = "", contentConfigValues = {} } = {},
		headerText,
		itemHeaderTruncationLines = 0,
		itemDescriptionTruncationLines = 0,
	},
	globalContent = {},
}) => {
	const { id } = useComponentContext();
	const { arcSite } = useFusionContext();
	const { locale = "en" } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const content = useContent({
		source: contentService,
		query: contentConfigValues,
	});

	const showGlobalContent =
		typeof inheritGlobalContent === "undefined"
			? typeof carouselContentConfig === "undefined"
			: inheritGlobalContent;
	const { content_elements: elements = [] } = showGlobalContent ? globalContent : content;

	if (!elements.length) return null;

	return (
		<Stack className={BLOCK_CLASS_NAME}>
			{headerText && headerText.trim() !== "" && (
				<Heading className={`${BLOCK_CLASS_NAME}__main-title`}>{headerText}</Heading>
			)}

			{elements && elements.length && (
				<Carousel
					id={id}
					label={phrases.t("story-carousel.aria-label")}
					nextButton={
						<Carousel.Button id={id} label={phrases.t("story-carousel.right-arrow-label")}>
							<Icon name="ChevronRight" />
						</Carousel.Button>
					}
					previousButton={
						<Carousel.Button id={id} label={phrases.t("story-carousel.left-arrow-label")}>
							<Icon name="ChevronLeft" />
						</Carousel.Button>
					}
				>
					{elements.map((item, index) => (
						<Carousel.Item
							key={item._id}
							label={`${phrases.t("story-carousel.slide-indicator", {
								current: index + 1,
								maximum: elements.length,
							})}`}
						>
							<a className={`${BLOCK_CLASS_NAME}__story-card`} href={item.canonical_url}>
								<Image alt={item.headlines.basic} src={extractImageFromStory(item)} />
								{item.headlines?.basic ? (
									<Heading
										className={`${BLOCK_CLASS_NAME}__story-card-header`}
										truncationLines={itemHeaderTruncationLines}
									>
										{item.headlines.basic}
									</Heading>
								) : null}
								{item.description?.basic ? (
									<Paragraph truncationLines={itemDescriptionTruncationLines}>
										{item.description.basic}
									</Paragraph>
								) : null}
							</a>
						</Carousel.Item>
					))}
				</Carousel>
			)}
		</Stack>
	);
};

StoryCarousel.propTypes = {
	customFields: PropTypes.shape({
		carouselContentConfig: PropTypes.contentConfig("ans-feed").tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		inheritGlobalContent: PropTypes.bool.tag({
			group: "Configure Content",
			defaultValue: false,
		}),
		headerText: PropTypes.string.tag({
			label: "Headline",
			default: "",
			description: "Add a headline for the story carousel component.",
		}),
		itemHeaderTruncationLines: PropTypes.number.tag({
			label: "Carousel item header truncation",
			default: 0,
			description:
				"Number of text lines for the carousel item header to show before being truncated",
		}),
		itemDescriptionTruncationLines: PropTypes.number.tag({
			label: "Carousel item description truncation",
			default: 0,
			description:
				"Number of lines the description in a carousel item will show before being truncated",
		}),
	}),
};

StoryCarousel.label = "Story Carousel - Arc Block";

StoryCarousel.icon = "ui-browser-slider";

export default StoryCarousel;
