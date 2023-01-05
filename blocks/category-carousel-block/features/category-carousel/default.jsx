import React, { Fragment } from "react";
import { useFusionContext } from "fusion:context";
import { useContent, useEditableContent } from "fusion:content";
import { RESIZER_APP_VERSION } from "fusion:environment";
import PropTypes from "@arc-fusion/prop-types";
import {
	Carousel,
	Heading,
	HeadingSection,
	Link,
	Icon,
	Image,
	Stack,
	usePhrases,
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
		[`imageAlt_${index}`]: PropTypes.string.tag({
			hidden: true,
		}),
		[`imageAuth_${index}`]: PropTypes.string.tag({
			hidden: true,
		}),
		[`imageId_${index}`]: PropTypes.string.tag({
			hidden: true,
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

const CategoryImage = ({ imageAlt, imageAuth, imageId, imageUrl }) => {
	const imageAuthToken = useContent(
		!imageAuth && imageId
			? {
					source: "signing-service",
					query: { id: imageId },
			  }
			: {}
	);

	const imageAuthTokenObj = {};
	if (imageAuthToken?.hash) {
		imageAuthTokenObj[RESIZER_APP_VERSION] = imageAuthToken.hash;
	}

	const imageParams =
		imageId && imageUrl
			? {
					ansImage: {
						_id: imageId,
						url: imageUrl,
						auth: imageAuth ? JSON.parse(imageAuth) : imageAuthTokenObj,
					},
					alt: imageAlt,
					aspectRatio: "3:2",
					resizedOptions: {
						smart: true,
					},
					responsiveImages: [200, 400],
					width: 400,
			  }
			: {
					src: imageUrl,
					alt: imageAlt,
			  };

	return <Image {...imageParams} />;
};

function CategoryCarousel({ customFields }) {
	const { headerText } = customFields;
	const { searchableField } = useEditableContent();
	const { id, isAdmin } = useFusionContext();
	const phrases = usePhrases();
	const Wrapper = headerText ? HeadingSection : Fragment;

	const validCategoryData = customFieldGroups
		.map((fieldDefinition, index) => {
			const categoryData = Object.keys(fieldDefinition)
				.map((field) => ({ [field.replace(/_\d+$/, "")]: customFields[field] }))
				.reduce(mergeObjectArray);
			categoryData.origIndex = index;
			return categoryData;
		})
		.filter((fields) => (fields.imageUrl || isAdmin) && fields.label && fields.linkUrl);

	return validCategoryData.length >= MIN_SLIDES ? (
		<Wrapper>
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
					{validCategoryData.map(
						(
							{ imageUrl, imageAlt, imageAuth, imageId, label, linkUrl, origIndex },
							index,
							allItems
						) => (
							<Carousel.Item
								label={`${phrases.t("category-carousel.slide-indicator", {
									current: index + 1,
									maximum: allItems.length,
								})}`}
								key={`${imageUrl}_${label}_${linkUrl}`}
							>
								{({ viewable }) => (
									<Link
										className={`${BLOCK_CLASS_NAME}__slide`}
										href={linkUrl}
										assistiveHidden={viewable ? null : true}
									>
										<Stack
											{...searchableField({
												[`imageUrl_${origIndex}`]: "url",
												[`imageId_${origIndex}`]: "_id",
												[`imageAuth_${origIndex}`]: "auth",
												[`imageAlt_${origIndex}`]: "alt_text",
											})}
											suppressContentEditableWarning
										>
											<CategoryImage
												imageAlt={imageAlt || label}
												imageAuth={imageAuth}
												imageId={imageId}
												imageUrl={imageUrl}
											/>
											<HeadingSection>
												<Heading className={`${BLOCK_CLASS_NAME}__slide-title`}>{label}</Heading>
											</HeadingSection>
										</Stack>
									</Link>
								)}
							</Carousel.Item>
						)
					)}
				</Carousel>
			</Stack>
		</Wrapper>
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
