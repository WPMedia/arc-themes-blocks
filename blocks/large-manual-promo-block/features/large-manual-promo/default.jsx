import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useComponentContext, useFusionContext } from "fusion:context";
import { useEditableContent } from "fusion:content";
import getProperties from "fusion:properties";
import { LazyLoad } from "@wpmedia/engine-theme-sdk";
import {
	Conditional,
	Image,
	isServerSide,
	formatURL,
	Grid,
	Heading,
	HeadingSection,
	Link,
	MediaItem,
	Overline,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-large-manual-promo";

const LargeManualPromo = ({ customFields }) => {
	const { isAdmin } = useFusionContext();
	const {
		description,
		headline,
		imageURL,
		lazyLoad,
		linkURL,
		newTab,
		overline,
		overlineURL,
		showDescription,
		showHeadline,
		showImage,
		showOverline,
	} = customFields;
	const shouldLazyLoad = lazyLoad && !isAdmin;
	const { arcSite } = useFusionContext();
	const { fallbackImage } = getProperties(arcSite);
	const { registerSuccessEvent } = useComponentContext();

	if (shouldLazyLoad && isServerSide()) {
		// On Server
		return null;
	}

	const PromoImage = () => {
		const { searchableField } = useEditableContent();

		return showImage ? (
			<MediaItem {...searchableField("imageURL")} suppressContentEditableWarning>
				<Conditional
					component={Link}
					condition={linkURL}
					href={formatURL(linkURL)}
					openInNewTab={newTab}
					onClick={registerSuccessEvent}
				>
					<Image alt={headline} src={imageURL || fallbackImage} searchableField />
				</Conditional>
			</MediaItem>
		) : null;
	};

	const PromoHeading = () => {
		if (showHeadline) {
			return (
				<Heading>
					<Conditional
						component={Link}
						condition={linkURL}
						href={formatURL(linkURL)}
						openInNewTab={newTab}
						onClick={registerSuccessEvent}
					>
						{headline}
					</Conditional>
				</Heading>
			);
		}
		return null;
	};

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
				<Grid as="article" className={BLOCK_CLASS_NAME}>
					<PromoImage />
					<Grid className={`${BLOCK_CLASS_NAME}__text`}>
						<PromoOverline />
						<Stack>
							<PromoHeading />
							<PromoDescription />
						</Stack>
					</Grid>
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
		imageRatio: PropTypes.oneOf(["16:9", "3:2", "4:3"]).tag({
			defaultValue: "4:3",
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

LargeManualPromo.label = "Large Manual Promo – Arc Block";

LargeManualPromo.icon = "paragraph-bullets";

export default LargeManualPromo;
