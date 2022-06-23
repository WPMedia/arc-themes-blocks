import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useEditableContent } from "fusion:content";
import { useComponentContext, useFusionContext } from "fusion:context";
import {
	formatURL,
	Heading,
	HeadingSection,
	Image,
	isServerSide,
	Link,
	MediaItem,
	Grid,
} from "@wpmedia/arc-themes-components";
import { LazyLoad } from "@wpmedia/engine-theme-sdk";

const BLOCK_CLASS_NAME = "b-small-manual-promo";

const SmallManualPromo = ({ customFields }) => {
	const { headline, imagePosition, imageURL, lazyLoad, linkURL, newTab, showHeadline, showImage } =
		customFields;
	const { registerSuccessEvent } = useComponentContext();
	const { isAdmin } = useFusionContext();
	const shouldLazyLoad = lazyLoad && !isAdmin;

	if (shouldLazyLoad && isServerSide()) {
		return null;
	}

	const PromoImage = () => {
		const { searchableField } = useEditableContent();

		return showImage ? (
			<MediaItem {...searchableField("imageURL")} suppressContentEditableWarning>
				<Image alt={headline} src={imageURL} searchableField />
			</MediaItem>
		) : null;
	};

	const PromoHeading = () =>
		showHeadline ? (
			<Heading>
				{linkURL ? (
					<Link href={formatURL(linkURL)} openInNewTab={newTab} onClick={registerSuccessEvent}>
						{headline}
					</Link>
				) : (
					headline
				)}
			</Heading>
		) : null;

	return (
		<LazyLoad enabled={shouldLazyLoad}>
			<HeadingSection>
				<Grid
					role="article"
					className={`${BLOCK_CLASS_NAME} ${BLOCK_CLASS_NAME}--${imagePosition}`}
				>
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
				</Grid>
			</HeadingSection>
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
		imageRatio: PropTypes.oneOf(["16:9", "3:2", "4:3"]).tag({
			defaultValue: "3:2",
			label: "Image ratio",
			group: "Art",
		}),
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
