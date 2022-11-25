import React from "react";
import { useFusionContext } from "fusion:context";

import {
	Divider,
	formatURL,
	Heading,
	HeadingSection,
	Image,
	Link,
	MediaItem,
	Grid,
	getImageFromANS,
	Conditional,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-top-table-list-small";

const Small = (props) => {
	const {
		element,
		customFields: {
			imagePositionSM: imagePosition = "right",
			showHeadlineSM,
			showImageSM,
			showBottomBorderSM,
			imageRatioSM = "3:2",
		},
		fallbackImage,
	} = props;

	const { arcSite } = useFusionContext();

	const showBottomBorder = typeof showBottomBorderSM === "undefined" ? true : showBottomBorderSM;

	const linkURL = element?.websites?.[arcSite]?.website_url;
	const ANSImage = getImageFromANS(element);
	const headline = element?.headlines?.basic;

	const imageParams = ANSImage
		? {
				ansImage: ANSImage,
				aspectRatio: imageRatioSM,
				resizedOptions: {
					smart: true,
				},
				responsiveImages: [400, 600, 800, 1200],
				width: 800,
		  }
		: {
				src: fallbackImage,
		  };

	const containerClassNames = [
		BLOCK_CLASS_NAME,
		!showImageSM || !showHeadlineSM ? null : `${BLOCK_CLASS_NAME}--${imagePosition}`,
	]
		.filter((classString) => classString)
		.join(" ");

	const PromoImage = () =>
		showImageSM ? (
			<Conditional component={Link} condition={linkURL} href={formatURL(linkURL)} assistiveHidden>
				<MediaItem>
					<Image {...imageParams} />
				</MediaItem>
			</Conditional>
		) : null;

	const PromoHeading = () =>
		showHeadlineSM && headline ? (
			<Heading>
				<Conditional component={Link} condition={linkURL} href={formatURL(linkURL)}>
					{headline}
				</Conditional>
			</Heading>
		) : null;

	return (
		<HeadingSection>
			<Grid as="article" className={containerClassNames}>
				{["below", "right"].includes(imagePosition) ? (
					<>
						<PromoHeading />
						<PromoImage />
					</>
				) : (
					<>
						<PromoImage />
						<PromoHeading />
					</>
				)}
				{showBottomBorder ? <Divider /> : null}
			</Grid>
		</HeadingSection>
	);
};
export default Small;
