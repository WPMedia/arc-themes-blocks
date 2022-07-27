import React from "react";
import { ProductContentDisplay } from "./features/product-content/default";

export default {
	title: "Blocks/Product Content",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

const mockData = {
	schema: {
		productDetails: {
			label: "Product Details",
			value: "Crocker Sandals<br />product",
			dataType: "string",
			visible: true,
			configuration: null,
		},
	},
};

export const TitleAndContent = () => (
	<ProductContentDisplay summary="Product Details">
		{mockData.schema.productDetails.value}
	</ProductContentDisplay>
);
