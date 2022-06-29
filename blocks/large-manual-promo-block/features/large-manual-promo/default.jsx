import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useComponentContext, useFusionContext } from "fusion:context";
import { useEditableContent } from "fusion:content";
import { LazyLoad } from "@wpmedia/engine-theme-sdk";
import {
	formatURL,
	isServerSide,
	Overline,
	MediaItem,
	Grid,
	Link,
	Heading,
	HeadingSection,
	Image,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";
import { imageRatioCustomField } from "@wpmedia/resizer-image-block";

const BLOCK_CLASS_NAME = "b-large-manual-promo";

const LargeManualPromo = ({ customFields }) => {
	const { isAdmin } = useFusionContext();
	const {
		headline,
		imagePosition,
		imageURL,
		lazyLoad,
		caption,
		credits,
		subtitle,
		linkURL,
		newTab,
		showHeadline,
		showImage,
		description,
		overline,
		showOverline,
		showDescription,
		overlineURL,
		hideImageCaption,
		hideImageCredits,
		hideImageTitle,
	} = customFields;
	const shouldLazyLoad = lazyLoad && !isAdmin;
	const { registerSuccessEvent } = useComponentContext();

	if (shouldLazyLoad && isServerSide()) {
		// On Server
		return null;
	}

	const PromoImage = () => {
		const { searchableField } = useEditableContent();

		return showImage ? (
			<MediaItem
				caption={!hideImageCaption ? caption : null}
				credit={!hideImageCredits ? credits : null}
				title={!hideImageTitle ? subtitle : null}
				{...searchableField("imageURL")}
				suppressContentEditableWarning
			>
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

	const PromoOverline = () => {
		if (showOverline) {
			if (overlineURL) {
				return <Overline href={overlineURL}>{overline}</Overline>;
			}
			return <Overline>{overline}</Overline>;
		}
		return null;
	};

	const PromoDescription = () => (showDescription ? <Paragraph>{description}</Paragraph> : null);

	return (
		<LazyLoad enabled={shouldLazyLoad}>
			<HeadingSection>
				<Grid
					role="article"
					className={`${BLOCK_CLASS_NAME} ${BLOCK_CLASS_NAME}__${imagePosition}`}
				>
					<PromoImage />
					<Stack className={`${BLOCK_CLASS_NAME}__info`}>
						<PromoOverline />
						<PromoHeading />
						<PromoDescription />
					</Stack>
				</Grid>
			</HeadingSection>
		</LazyLoad>
	);
};

LargeManualPromo.propTypes = {
	customFields: PropTypes.shape({
		headline: PropTypes.string.tag({
			label: "Headline",
			group: "Configure Content",
		}),
		description: PropTypes.string.tag({
			label: "Description",
			group: "Configure Content",
		}),
		overline: PropTypes.string.tag({
			label: "Overline",
			group: "Configure Content",
		}),
		overlineURL: PropTypes.string.tag({
			label: "Overline URL",
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
		dateString: PropTypes.string.tag({
			label: "dateString",
			group: "Configure Content",
		}),
		showOverline: PropTypes.bool.tag({
			label: "Show overline",
			defaultValue: true,
			group: "Show promo elements",
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
		showDescription: PropTypes.bool.tag({
			label: "Show description",
			defaultValue: true,
			group: "Show promo elements",
		}),
		...imageRatioCustomField("imageRatio", "Art", "4:3"),
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
	}),
};

LargeManualPromo.label = "Large Manual Promo – Arc Block";

LargeManualPromo.icon = "paragraph-bullets";

export default LargeManualPromo;
