import React, { Fragment } from "react";
import PropTypes from "@arc-fusion/prop-types";
import {
	Carousel,
	Image,
	Icon,
	Heading,
	Link,
	Paragraph,
	Stack,
	HeadingSection,
	getImageFromANS,
} from "@wpmedia/arc-themes-components";
import { useContent } from "fusion:content";
import { useFusionContext, useComponentContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

const BLOCK_CLASS_NAME = "b-story-carousel";

const StoryCarousel = ({
	customFields: {
		carouselContentConfig: { contentService = "", contentConfigValues = {} } = {},
		headerText,
	},
}) => {
	const { id } = useComponentContext();
	const { arcSite, isAdmin } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);
	const content =
		useContent({
			source: contentService,
			query: {
				...contentConfigValues,
				feature: "story-carousel",
			},
			filter: `content_elements{
      _id
      description {
        basic
      }
      headlines {
        basic
      }
      promo_items {
        type
        url
        lead_art {
          type
          promo_items {
            basic {
              type
              url
            }
          }
        }
        basic {
          type
          url
        }
      }
      websites {
        ${arcSite} {
          website_url
        }
      }
    }`,
		}) || [];

	const { content_elements: elements = [] } = content;
	if (!elements.length) return null;
	// if fewer than 4 elements, then render error message to admin
	if (elements.length < 4 && isAdmin) {
		return <p style={{ color: "red" }}>This feature requires 4 stories to display.</p>;
	}

	// if fewer than 4 elements, then render nothing to reader
	if (elements.length < 4) {
		return null;
	}

	const Wrapper = headerText ? HeadingSection : Fragment;

	return (
		<Wrapper>
			<Stack className={BLOCK_CLASS_NAME}>
				{headerText ? (
					<Heading className={`${BLOCK_CLASS_NAME}__main-title`}>{headerText}</Heading>
				) : null}

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
					{elements.map((item, index) => {
						const {
							headlines: { basic: headlineText = null } = {},
							description: { basic: descriptionText = null } = {},
							websites,
						} = item;
						const imageURL = getImageFromANS(item)?.url;

						if (!websites[arcSite]) {
							return null;
						}
						const url = websites[arcSite].website_url;

						return (
							<Carousel.Item
								key={item._id}
								label={`${phrases.t("story-carousel.slide-indicator", {
									current: index + 1,
									maximum: elements.length,
								})}`}
							>
								{({ viewable }) => (
									<Link
										className={`${BLOCK_CLASS_NAME}__story-card`}
										href={url}
										assistiveHidden={viewable ? null : true}
									>
										<Image alt={headlineText ? "" : headlineText} src={imageURL} />
										{headlineText ? (
											<HeadingSection>
												<Heading className={`${BLOCK_CLASS_NAME}__story-card-header`}>
													{headlineText}
												</Heading>
											</HeadingSection>
										) : null}
										{descriptionText ? <Paragraph>{descriptionText}</Paragraph> : null}
									</Link>
								)}
							</Carousel.Item>
						);
					})}
				</Carousel>
			</Stack>
		</Wrapper>
	);
};

StoryCarousel.propTypes = {
	customFields: PropTypes.shape({
		carouselContentConfig: PropTypes.contentConfig("ans-feed").tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		headerText: PropTypes.string.tag({
			label: "Headline",
			default: "",
			description: "Add a headline for the story carousel component.",
		}),
	}),
};

StoryCarousel.label = "Story Carousel - Arc Block";

StoryCarousel.icon = "ui-browser-slider";

export default StoryCarousel;
