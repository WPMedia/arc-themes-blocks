import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useEditableContent } from "fusion:content";
import { useComponentContext, useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import {
	Conditional,
	formatURL,
	Heading,
	HeadingSection,
	Image,
	isServerSide,
	Link,
	MediaItem,
	Paragraph,
} from "@wpmedia/arc-themes-components";
import { LazyLoad } from "@wpmedia/engine-theme-sdk";

const BLOCK_CLASS_NAME = "b-medium-manual-promo";

const MediumManualPromo = ({ customFields }) => {
	const {
		description,
		headline,
		imageURL,
		lazyLoad,
		linkURL,
		newTab,
		showDescription,
		showHeadline,
		showImage,
	} = customFields;
	const { registerSuccessEvent } = useComponentContext();
	const { arcSite, isAdmin } = useFusionContext();
	const { searchableField } = useEditableContent();
	const { fallbackImage } = getProperties(arcSite);
	const shouldLazyLoad = lazyLoad && !isAdmin;

	if (shouldLazyLoad && isServerSide()) {
		return null;
	}

	const availableImageURL = showImage ? imageURL || fallbackImage : null;
	const headlineText = showHeadline ? headline : null;
	const descriptionText = showDescription ? description : null;

	return (
		<LazyLoad enabled={shouldLazyLoad}>
			<HeadingSection>
				<article
					className={`${BLOCK_CLASS_NAME}${
						availableImageURL ? ` ${BLOCK_CLASS_NAME}--show-image` : ""
					}`}
				>
					{availableImageURL ? (
						<MediaItem {...searchableField("imageURL")} suppressContentEditableWarning>
							<Conditional
								component={Link}
								condition={linkURL}
								href={formatURL(linkURL)}
								openInNewTab={newTab}
								onClick={registerSuccessEvent}
							>
								<Image alt={headline} src={availableImageURL} searchableField />
							</Conditional>
						</MediaItem>
					) : null}

					{headlineText ? (
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
					) : null}
					{descriptionText ? <Paragraph>{description}</Paragraph> : null}
				</article>
			</HeadingSection>
		</LazyLoad>
	);
};

MediumManualPromo.propTypes = {
	customFields: PropTypes.shape({
		headline: PropTypes.string.tag({
			label: "Headline",
			group: "Configure Content",
		}),
		description: PropTypes.string.tag({
			label: "Description",
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

MediumManualPromo.label = "Medium Manual Promo – Arc Block";

MediumManualPromo.icon = "paragraph-bullets";

export default MediumManualPromo;
