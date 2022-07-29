import React from "react";
import PropTypes from "@arc-fusion/prop-types";

import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

import { Details, Icon } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-content";

const contentMapping = {
	description: "description",
	details: "schema.productDetails",
};

const getNestedObject = (obj, path) => path.split(".").reduce((value, el) => value[el], obj);

export const ProductContentDisplay = ({ children, summary, open }) => (
	<div className={`${BLOCK_CLASS_NAME}`}>
		<Details summary={summary} open={open} icon={<Icon name="ChevronDown" />} childrenHTML>
			{children}
		</Details>
	</div>
);

const ProductContent = ({ customFields }) => {
	const { contentType, headline, open } = customFields;
	const { arcSite, globalContent = {} } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	if (!Object.keys(globalContent).length || contentType === undefined) {
		return null;
	}

	const productData = getNestedObject(globalContent, contentMapping[contentType]);
	const visible =
		typeof productData === "object" && Object.prototype.hasOwnProperty.call(productData, "visible")
			? productData?.visible
			: true;

	if (!visible) {
		return null;
	}

	const data = {
		summary: headline || phrases.t(`product-content.${contentType}`),
		open,
		children: contentType === "description" ? productData : productData.value,
	};

	return <ProductContentDisplay {...data} />;
};

ProductContent.label = "Product Content – Arc Block";

ProductContent.icon = "content-browser-edit";

ProductContent.propTypes = {
	customFields: PropTypes.shape({
		contentType: PropTypes.oneOf(["description", "details"]).tag({
			labels: {
				description: "Product Description",
				details: "Product Details",
			},
		}),
		headline: PropTypes.string.tag({
			name: "Customize Headline",
			description: "By adding a custom headline, the default headline will be overridden.",
		}),
		open: PropTypes.boolean.tag({
			name: "Collapsed on page load",
			defaultValue: false,
		}),
	}),
};

export default ProductContent;
