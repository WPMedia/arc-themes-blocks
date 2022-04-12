import React from "react";
import PropTypes from "@arc-fusion/prop-types";

import { Carousel, Heading, Icon } from "@wpmedia/arc-themes-components";

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

	const validCategoryData = customFieldGroups
		.map((fieldDefinition) =>
			Object.keys(fieldDefinition)
				.map((field) => ({ [field.replace(/_\d+$/, "")]: customFields[field] }))
				.reduce(mergeObjectArray)
		)
		.filter((fields) => fields.imageUrl && fields.label && fields.linkUrl);

	return validCategoryData.length >= MIN_SLIDES ? (
		<div className={`${BLOCK_CLASS_NAME}`}>
			{headerText ? <Heading>{headerText}</Heading> : null}
			<Carousel
				id="category-carousel"
				label="Categories"
				slidesToShow={MIN_SLIDES}
				nextButton={<Icon name="ArrowRight">Next</Icon>}
				previousButton={<Icon name="ArrowLeft">Previous</Icon>}
			>
				{validCategoryData.map(({ imageUrl, label, linkUrl }, index, allItems) => (
					<Carousel.Item
						label={`Slide ${index + 1} of ${allItems.length}`}
						key={`${imageUrl}_${label}_${linkUrl}`}
					>
						<a href={linkUrl}>
							<img src={imageUrl} alt="" />
							{label}
						</a>
					</Carousel.Item>
				))}
			</Carousel>
		</div>
	) : null;
}

CategoryCarousel.label = "Category Carousel – Arc Block";

// find matching icon in https://redirector.arcpublishing.com/pagebuilder/block-icon-library
CategoryCarousel.icon = "arc-quad-chain";

CategoryCarousel.propTypes = {
	customFields: PropTypes.shape({
		headerText: PropTypes.string.tag({
			label: "Header",
		}),
		...customFieldGroups.reduce(mergeObjectArray),
	}),
};

export default CategoryCarousel;
