import React from "react";
import { Grid, HeadingSection, Image, getImageFromANS } from "@wpmedia/arc-themes-components";

function LargePromoPresentation(props) {
	const {
		content,
		// description,
		// headline,
		// id,
		imageOverrideURL,
		// imageRatio,
		// imageURL,
		// isAdmin,
		// lazyLoad,
		// linkURL,
		// newTab,
		// overline,
		// overlineURL,
		// playVideoInPlace,
		// searchableField,
		// showByline,
		// showDate,
		// showDescription,
		// showHeadline,
		showImage,
		// showOverline,
		// shrinkToFit,
		// viewportPercentage,
	} = props;

	const BLOCK_CLASS_NAME = "b-large-promo";

	// show the override url over the content image if it's present
	// get the image from content if no override
	const targetImage = imageOverrideURL || getImageFromANS(content);

	return (
		<HeadingSection>
			<Grid as="article" className={BLOCK_CLASS_NAME}>
				{showImage ? <Image src={targetImage} /> : null}
			</Grid>
		</HeadingSection>
	);
}

export default LargePromoPresentation;
