import React from "react";
import { useEditableContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "@arc-fusion/prop-types";
import {
	Conditional,
	Heading,
	HeadingSection,
	Image,
	isServerSide,
	Link,
	MediaItem,
	Overline,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";
import { LazyLoad } from "@wpmedia/engine-theme-sdk";

const BLOCK_CLASS_NAME = "b-xl-manual-promo";

const PromoHeadline = ({ children, href, openInNewTab }) => (
	<HeadingSection>
		<Heading>
			<Conditional component={Link} condition={href} href={href} openInNewTab={openInNewTab}>
				{children}
			</Conditional>
		</Heading>
	</HeadingSection>
);

const PromoImage = ({ alt, href, imageRatio, openInNewTab, src }) => {
	const { searchableField } = useEditableContent();

	return (
		<MediaItem {...searchableField("imageURL")} suppressContentEditableWarning>
			<Conditional component={Link} condition={href} href={href} openInNewTab={openInNewTab}>
				<Image
					alt={alt}
					src={src}
					searchableField
					data-aspect-ratio={imageRatio?.replace(":", "/")}
				/>
			</Conditional>
		</MediaItem>
	);
};

const ExtraLargeManualPromo = ({ customFields }) => {
	const { arcSite, isAdmin } = useFusionContext();
	const { fallbackImage } = getProperties(arcSite);
	const {
		description,
		headline,
		imageRatio,
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
	if (shouldLazyLoad && isServerSide()) {
		return null;
	}

	const availableDescription = showDescription ? description : null;
	const availableHeadline = showHeadline ? headline : null;
	const availableImageURL = showImage ? imageURL || fallbackImage : null;
	const availableOverline = showOverline ? overline : null;

	return availableOverline || availableHeadline || availableImageURL || availableDescription ? (
		<LazyLoad enabled={shouldLazyLoad}>
			<article className={BLOCK_CLASS_NAME}>
				{availableOverline ? <Overline href={overlineURL}>{availableOverline}</Overline> : null}
				{availableHeadline || availableImageURL || availableDescription ? (
					<Stack>
						{availableHeadline ? (
							<PromoHeadline href={linkURL} openInNewTab={newTab}>
								{availableHeadline}
							</PromoHeadline>
						) : null}
						{availableImageURL ? (
							<PromoImage
								alt={headline}
								href={linkURL}
								imageRatio={imageRatio}
								openInNewTab={newTab}
								src={availableImageURL}
							/>
						) : null}
						{availableDescription ? <Paragraph>{availableDescription}</Paragraph> : null}
					</Stack>
				) : null}
			</article>
		</LazyLoad>
	) : null;
};

ExtraLargeManualPromo.propTypes = {
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

ExtraLargeManualPromo.label = "Extra Large Manual Promo – Arc Block";

ExtraLargeManualPromo.icon = "paragraph-bullets";

export default ExtraLargeManualPromo;
