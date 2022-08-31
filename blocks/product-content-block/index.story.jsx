import React from "react";
import { ProductContentDisplay } from "./features/product-content/default";

export default {
	title: "Blocks/Product Content",
	parameters: {
		chromatic: { viewports: [320, 1200] },
		cssVariables: {
			theme: "commerce",
		},
	},
};

const mockData = {
	schema: {
		productDetails: {
			label: "Product Details",
			value:
				"<p>Crocker Sandals<br />product</p><ul><li>Bespoke knit upper</li><li>Bouncetech foam midsole</li><li>Organic rubber outsole</li><li>Made in the U.S.A.</li></ul>",
			dataType: "string",
			visible: true,
			configuration: null,
		},
	},
};

export const TitleAndContent = () => (
	<ProductContentDisplay summary={mockData.schema.productDetails.label}>
		{mockData.schema.productDetails.value}
	</ProductContentDisplay>
);
