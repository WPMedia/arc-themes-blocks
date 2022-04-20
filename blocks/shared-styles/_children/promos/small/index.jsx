import React from "react";
import PropTypes from "prop-types";
import { useEditableContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import {
	PromoHeadline,
	PromoImage,
	SmallPromoContainer,
	SmallPromoStyles,
} from "@wpmedia/shared-styles";

const SmallPromoPresentation = ({
	content,
	headline,
	imagePosition,
	imageRatio,
	imageURL,
	imageOverrideURL,
	lazyLoad,
	linkURL,
	newTab,
	showHeadline,
	showImage,
}) => {
	const { searchableField } = useEditableContent();
	const { isAdmin } = useFusionContext();
	const headlineMarginClass = SmallPromoStyles(imagePosition, "headlineMargin");
	const imageSearchField = content ? "imageOverrideURL" : "imageURL";
	const promoImageURL = content ? imageOverrideURL : imageURL;

	const headlineOutput = showHeadline ? (
		<PromoHeadline
			content={content}
			text={headline}
			link={linkURL}
			className={headlineMarginClass}
			linkClassName="sm-promo-headline"
			headingClassName="sm-promo-headline"
			newTab={newTab}
		/>
	) : null;

	const image = showImage ? (
		<div style={{ position: isAdmin ? "relative" : null }}>
			<div {...searchableField(imageSearchField)} suppressContentEditableWarning>
				<PromoImage
					content={content}
					customImageURL={promoImageURL}
					alt={headline}
					promoSize="SM"
					imageRatio={imageRatio}
					linkURL={linkURL}
					newTab={newTab}
					lazyLoad={lazyLoad}
				/>
			</div>
		</div>
	) : null;

	return (
		<SmallPromoContainer headline={headlineOutput} image={image} imagePosition={imagePosition} />
	);
};

SmallPromoPresentation.defaultProps = {
	content: null,
	showHeadline: true,
	showImage: true,
	imagePosition: "right",
};

SmallPromoPresentation.propTypes = {
	content: PropTypes.object,
	showHeadline: PropTypes.bool,
	showImage: PropTypes.bool,
	imagePosition: PropTypes.string,
	imageRatio: PropTypes.string,
	lazyLoad: PropTypes.bool,
	linkURL: PropTypes.string,
	newTab: PropTypes.bool,
	headline: PropTypes.string,
	imageURL: PropTypes.string,
	imageOverrideURL: PropTypes.string,
};

export default SmallPromoPresentation;
