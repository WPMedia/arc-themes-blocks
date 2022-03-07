import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import { LazyLoad, isServerSide } from "@wpmedia/engine-theme-sdk";
import { imageRatioCustomField } from "@wpmedia/resizer-image-block";
import { SmallPromoPresentation } from "@wpmedia/shared-styles";

const SmallManualPromo = ({
	customFields = { showImage: true, showHeadline: true, imageRatio: "3:2" },
}) => {
	const { isAdmin } = useFusionContext();
	const shouldLazyLoad = customFields?.lazyLoad && !isAdmin;
	if (customFields.lazyLoad && isServerSide() && !isAdmin) {
		// On Server
		return null;
	}

	return (
		<LazyLoad enabled={shouldLazyLoad}>
			<SmallPromoPresentation {...customFields} />
		</LazyLoad>
	);
};

SmallManualPromo.propTypes = {
	customFields: PropTypes.shape({
		headline: PropTypes.string.tag({
			label: "Headline",
			group: "Configure Content",
		}),
		imageURL: PropTypes.string.tag({
			label: "Image URL",
			group: "Configure Content",
			searchable: "image",
		}),
		linkURL: PropTypes.string.tag({
			label: "Link URL",
			group: "Configure Content",
		}),
		newTab: PropTypes.bool.tag({
			label: "Open in new tab",
			defaultValue: false,
			group: "Configure Content",
		}),
		showHeadline: PropTypes.bool.tag({
			label: "Show headline",
			defaultValue: true,
			group: "Show promo elements",
		}),
		showImage: PropTypes.bool.tag({
			label: "Show image",
			defaultValue: true,
			group: "Show promo elements",
		}),
		imagePosition: PropTypes.oneOf(["right", "left", "above", "below"]).tag({
			defaultValue: "right",
			label: "Image Position",
			group: "Image",
			labels: {
				right: "Image Right",
				left: "Image Left",
				above: "Image Above",
				below: "Image Below",
			},
		}),
		...imageRatioCustomField("imageRatio", "Art", "3:2"),
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
	}),
};

SmallManualPromo.label = "Small Manual Promo – Arc Block";

SmallManualPromo.icon = "paragraph-bullets";

export default SmallManualPromo;
