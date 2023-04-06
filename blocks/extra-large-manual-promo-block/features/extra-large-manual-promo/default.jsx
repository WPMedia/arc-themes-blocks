import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import { useComponentContext, useFusionContext } from "fusion:context";
import { useContent, useEditableContent } from "fusion:content";
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
	Overline,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";
import { LazyLoad } from "@wpmedia/engine-theme-sdk";

const BLOCK_CLASS_NAME = "b-xl-manual-promo";

const ExtraLargeManualPromo = ({ customFields }) => {
	const {
		description,
		headline,
		imageAuth,
		imageURL,
		imageId,
		imageRatio,
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
	const { arcSite, isAdmin } = useFusionContext();
	const { fallbackImage } = getProperties(arcSite);
	const { registerSuccessEvent } = useComponentContext();
	const { searchableField } = useEditableContent();
	const shouldLazyLoad = lazyLoad && !isAdmin;

	const imageAuthToken = useContent(
		!imageAuth && imageId
			? {
					source: "signing-service",
					query: { id: imageId },
			  }
			: {}
	);

	if (shouldLazyLoad && isServerSide()) {
		return null;
	}

	const imageAuthTokenObj = {};
	if (imageAuthToken?.hash) {
		imageAuthToken[RESIZER_TOKEN_VERSION] = imageAuthToken.hash;
	}

	const alt = headline || description || null;
	const imageParams =
		imageId && imageURL
			? {
					ansImage: {
						_id: imageId,
						url: imageURL,
						auth: imageAuth ? JSON.parse(imageAuth) : imageAuthTokenObj,
					},
					alt,
					aspectRatio: imageRatio,
					resizedOptions: {
						smart: true,
					},
					responsiveImages: [200, 400, 600, 800, 1200],
					width: 600,
			  }
			: {
					src: fallbackImage,
					alt,
			  };

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
							<HeadingSection>
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
							</HeadingSection>
						) : null}
						{availableImageURL ? (
							<MediaItem
								{...searchableField({
									imageURL: "url",
									imageId: "_id",
									imageAuth: "auth",
								})}
								suppressContentEditableWarning
							>
								<Conditional
									component={Link}
									condition={linkURL}
									href={formatURL(linkURL)}
									openInNewTab={newTab}
									onClick={registerSuccessEvent}
									assistiveHidden={showHeadline && showDescription}
								>
									<Image {...imageParams} />
								</Conditional>
							</MediaItem>
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
		imageAuth: PropTypes.string.tag({
			hidden: true,
		}),
		imageId: PropTypes.string.tag({
			hidden: true,
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
