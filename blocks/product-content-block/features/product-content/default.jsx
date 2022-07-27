import React from "react";
import PropTypes from "@arc-fusion/prop-types";

import { useFusionContext } from "fusion:context";

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
	const { globalContent = {} } = useFusionContext();

	if (!Object.keys(globalContent).length || contentType === undefined) {
		return null;
	}

	const productData = getNestedObject(globalContent, contentMapping[contentType]);

	const data = {
		summary: headline || productData.label,
		open,
		children: productData.value,
	};

	return <ProductContentDisplay {...data} />;
};

ProductContent.label = "Product Content – Arc Block";

ProductContent.icon = "shopping-bag-smile";

ProductContent.propTypes = {
	customFields: PropTypes.shape({
		contentType: PropTypes.oneOf(["description", "details"]).tag({
			labels: {
				description: "Product Description",
				details: "Product Details",
			},
			defaultValue: "description",
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
