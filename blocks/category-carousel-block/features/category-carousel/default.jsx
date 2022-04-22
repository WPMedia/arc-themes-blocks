import React from "react";
import { useComponentContext, useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

import PropTypes from "@arc-fusion/prop-types";
import {
	Carousel,
	Heading,
	HeadingSection,
	Icon,
	Image,
	Stack,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-category-carousel";
const MIN_SLIDES = 4;
const MAX_SLIDES = 12;

const customFieldGroups = Array(MAX_SLIDES)
	.fill(MIN_SLIDES)
	.map((minimum, index) => ({
		[`imageUrl_${index}`]: PropTypes.string.tag({
			label: "Image",
			description: "Select an image for this item.",
			searchable: "image",
			group: `Category ${index + 1}${index < minimum ? " (required)" : ""}`,
			required: index < minimum,
		}),
		[`label_${index}`]: PropTypes.string.tag({
			label: "Label",
			description: "Enter a category label for this item.",
			group: `Category ${index + 1}${index < minimum ? " (required)" : ""}`,
			required: index < minimum,
		}),
		[`linkUrl_${index}`]: PropTypes.string.tag({
			label: "Link Url",
			description: "Enter a url to navigate to when selected.",
			group: `Category ${index + 1}${index < minimum ? " (required)" : ""}`,
			required: index < minimum,
		}),
	}));

const mergeObjectArray = (accumulator, item) => ({ ...accumulator, ...item });

function CategoryCarousel({ customFields }) {
	const { headerText } = customFields;

	const { id } = useComponentContext();
	const { arcSite } = useFusionContext();
	const { locale = "en" } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const validCategoryData = customFieldGroups
		.map((fieldDefinition) =>
			Object.keys(fieldDefinition)
				.map((field) => ({ [field.replace(/_\d+$/, "")]: customFields[field] }))
				.reduce(mergeObjectArray)
		)
		.filter((fields) => fields.imageUrl && fields.label && fields.linkUrl);

	return validCategoryData.length >= MIN_SLIDES ? (
		<HeadingSection>
			<Stack className={BLOCK_CLASS_NAME}>
				{headerText ? (
					<Heading className={`${BLOCK_CLASS_NAME}__title`}>{headerText}</Heading>
				) : null}
				<Carousel
					id={id}
					label={phrases.t("category-carousel.aria-label")}
					nextButton={
						<Carousel.Button id={id} label={phrases.t("category-carousel.right-arrow-label")}>
							<Icon name="ChevronRight" />
						</Carousel.Button>
					}
					previousButton={
						<Carousel.Button id={id} label={phrases.t("category-carousel.left-arrow-label")}>
							<Icon name="ChevronLeft" />
						</Carousel.Button>
					}
				>
					{validCategoryData.map(({ imageUrl, label, linkUrl }, index, allItems) => (
						<Carousel.Item
							label={`${phrases.t("category-carousel.slide-indicator", {
								current: index + 1,
								maximum: allItems.length,
							})}`}
							key={`${imageUrl}_${label}_${linkUrl}`}
						>
							<a className={`${BLOCK_CLASS_NAME}__slide`} href={linkUrl}>
								<Stack>
									<Image src={imageUrl} alt="" />
									{label ? (
										<HeadingSection>
											<Heading className={`${BLOCK_CLASS_NAME}__slide-title`}>{label}</Heading>
										</HeadingSection>
									) : null}
								</Stack>
							</a>
						</Carousel.Item>
					))}
				</Carousel>
			</Stack>
		</HeadingSection>
	) : null;
}

CategoryCarousel.label = "Category Carousel – Arc Block";

CategoryCarousel.icon = "ui-browser-slider";

CategoryCarousel.propTypes = {
	customFields: PropTypes.shape({
		headerText: PropTypes.string.tag({
			label: "Header",
		}),
		...customFieldGroups.reduce(mergeObjectArray),
	}),
};

export default CategoryCarousel;
