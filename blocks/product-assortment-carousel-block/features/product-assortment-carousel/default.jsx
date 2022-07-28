import React, { Fragment } from "react";
import PropTypes from "@arc-fusion/prop-types";

import { useFusionContext, useComponentContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { useContent, useEditableContent } from "fusion:content";

import {
	Carousel,
	Image,
	Icon,
	Heading,
	Price,
	Stack,
	HeadingSection,
	Link,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-assortment-carousel";
const MIN_SLIDES = 4;
const MAX_SLIDES = 12;

const getProductURL = (item) => item.filter((x) => x.name === "product_url")[0]?.value || "#";

const getPrice = (type, prices) => prices.filter((x) => x.type === type)[0] || {};

const parseCondition = (condition) => {
	try {
		return JSON.parse(condition);
	} catch {
		return {};
	}
};

function ProductAssortmentCarousel({ customFields = {} }) {
	const {
		assortmentIndex,
		assortmentCondition,
		carouselLabel,
		headerText,
		itemsToDisplay = 4,
	} = customFields;
	const { id } = useComponentContext();
	const { searchableField } = useEditableContent();
	const { arcSite, isAdmin } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	// assortmentCondition is a stringified JSON object set by the Product Assortment
	// integration from PageBuilder and requires it to be parsed to an object.
	const assortmentQuery = parseCondition(assortmentCondition);

	const content =
		useContent({
			source: assortmentCondition ? "algolia-assortment" : null,
			query: assortmentCondition
				? {
						feature: "product-assortment-carousel",
						index: assortmentIndex,
						query: assortmentQuery?.pattern,
						ruleContexts: assortmentQuery?.context,
						filters: assortmentQuery?.filters,
						hitsPerPage: itemsToDisplay,
				  }
				: {},
		}) || [];

	if (isAdmin && (content.length < MIN_SLIDES || content.length > MAX_SLIDES)) {
		return (
			<p
				style={{ color: "red" }}
				{...searchableField(
					{ assortmentIndex: "index", assortmentCondition: "condition" },
					"assortment"
				)}
				suppressContentEditableWarning
			>
				This feature requires a minimum of 4 products and a maximum of 12 to display.
			</p>
		);
	}

	if (
		!content.length ||
		(!isAdmin && (content.length < MIN_SLIDES || content.length > MAX_SLIDES))
	) {
		return null;
	}

	const Wrapper = headerText ? HeadingSection : Fragment;

	return (
		<Wrapper>
			<Stack
				className={BLOCK_CLASS_NAME}
				{...searchableField(
					{ assortmentIndex: "index", assortmentCondition: "condition" },
					"assortment"
				)}
				suppressContentEditableWarning
			>
				{headerText ? (
					<Heading className={`${BLOCK_CLASS_NAME}__main-title`}>{headerText}</Heading>
				) : null}

				<Carousel
					id={id}
					label={carouselLabel || phrases.t("product-assortment-carousel.aria-label")}
					nextButton={
						<Carousel.Button
							id={id}
							label={phrases.t("product-assortment-carousel.right-arrow-label")}
						>
							<Icon name="ChevronRight" />
						</Carousel.Button>
					}
					previousButton={
						<Carousel.Button
							id={id}
							label={phrases.t("product-assortment-carousel.left-arrow-label")}
						>
							<Icon name="ChevronLeft" />
						</Carousel.Button>
					}
				>
					{content.map((item, carouselIndex) => {
						const SalePrice = getPrice("Sale", item.prices);
						const ListPrice = getPrice("List", item.prices);
						const salePriceAmount = SalePrice?.amount;
						const listPriceAmount = ListPrice?.amount;
						const isOnSale = salePriceAmount && salePriceAmount !== listPriceAmount;

						return (
							<Carousel.Item
								key={item.sku}
								label={`${phrases.t("product-assortment-carousel.slide-indicator", {
									current: carouselIndex + 1,
									maximum: content.length,
								})}`}
							>
								{({ viewable }) => (
									<Link
										className={`${BLOCK_CLASS_NAME}__product`}
										href={item.attributes ? getProductURL(item?.attributes) : "#"}
										assistiveHidden={viewable ? null : true}
									>
										<Image alt={item.name ? "" : item.name} src={item.image} />
										{item.name ? (
											<HeadingSection>
												<Heading>{item.name}</Heading>
											</HeadingSection>
										) : null}
										<Price
											className={`${
												!isOnSale ? `${BLOCK_CLASS_NAME}__product-single-price` : null
											}`}
										>
											{isOnSale ? (
												<Price.Sale>
													{new Intl.NumberFormat(SalePrice.currencyLocale, {
														style: "currency",
														currency: SalePrice.currencyCode,
														minimumFractionDigits: 2,
													}).format(salePriceAmount)}
												</Price.Sale>
											) : null}
											<Price.List>
												{new Intl.NumberFormat(ListPrice.currencyLocale, {
													style: "currency",
													currency: ListPrice.currencyCode,
													minimumFractionDigits: 2,
												}).format(listPriceAmount)}
											</Price.List>
										</Price>
									</Link>
								)}
							</Carousel.Item>
						);
					})}
				</Carousel>
			</Stack>
		</Wrapper>
	);
}

ProductAssortmentCarousel.label = "Product Assortment Carousel – Arc Block";

ProductAssortmentCarousel.icon = "ui-browser-slider";

ProductAssortmentCarousel.propTypes = {
	customFields: PropTypes.shape({
		assortmentIndex: PropTypes.string.tag({
			name: "Assortment Index",
			hidden: true,
		}),
		assortmentCondition: PropTypes.string.tag({
			name: "Assortment Condition",
			hidden: true,
		}),
		carouselLabel: PropTypes.string.tag({
			label: "Carousel Label",
			description:
				"Label is applied to the carousel to provide assistive technologies a description of what the carousel contains.",
		}),
		headerText: PropTypes.string.tag({
			label: "Headline",
			description: "Add a headline for the product carousel component.",
		}),
		itemsToDisplay: PropTypes.number.tag({
			label: "Amount of products to dispay",
			defaultValue: 4,
			min: 4,
			max: 12,
			description:
				"The Product Assortment block will display a minimum of 4 items and a maximum of 12 items",
		}),
	}),
};

export default ProductAssortmentCarousel;
