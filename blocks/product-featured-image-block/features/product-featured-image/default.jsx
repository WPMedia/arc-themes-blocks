import React from "react";
import PropTypes from "@arc-fusion/prop-types";

import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

// Arc Themes Components - Base set of components used to compose blocks
// https://github.com/WPMedia/arc-themes-components/
import { Heading } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-featured-image";

function ProductFeaturedImage({ customFields }) {
	// for intro material on consuming react props
	// https://reactjs.org/docs/components-and-props.html
	const { showHeading } = customFields;

	// get properties from context for using translations in intl.json
	// See document for more info https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2538275032/Lokalise+and+Theme+Blocks
	const { arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	return (
		<div className={`${BLOCK_CLASS_NAME}`}>
			{showHeading ? (
				<Heading>{phrases.t("product-featured-image-block.hello-text")}</Heading>
			) : null}
		</div>
	);
}

ProductFeaturedImage.label = "Product Featured Image – Arc Block";

// find matching icon in https://redirector.arcpublishing.com/pagebuilder/block-icon-library
ProductFeaturedImage.icon = "shopping-bag-smile";

ProductFeaturedImage.propTypes = {
	customFields: PropTypes.shape({
		showHeading: PropTypes.boolean.tag({
			name: "Show Heading?",
			defaultValue: false,
		}),
	}),
};

export default ProductFeaturedImage;
