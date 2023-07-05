import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import { useContent, useEditableContent } from "fusion:content";
import { useComponentContext, useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import {
	Conditional,
	formatURL,
	Heading,
	HeadingSection,
	Image,
	isServerSide,
	LazyLoad,
	Link,
	MediaItem,
	Paragraph,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-medium-manual-promo";

const MediumManualPromo = ({ customFields }) => {
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
		showDescription,
		showHeadline,
		showImage,
	} = customFields;
	const { registerSuccessEvent } = useComponentContext();
	const { arcSite, isAdmin } = useFusionContext();
	const { searchableField } = useEditableContent();
	const { fallbackImage } = getProperties(arcSite);
	const shouldLazyLoad = lazyLoad && !isAdmin;

	const resizedImage = imageId && imageAuth && imageAuth !== "{}" && imageURL?.includes(imageId);

	let resizedAuth = useContent(
		resizedImage || !imageURL
			? {}
			: {
					source: "signing-service",
					query: { id: imageURL },
			  }
	);
	if (imageAuth && !resizedAuth) {
		resizedAuth = JSON.parse(imageAuth);
	}
	if (resizedAuth?.hash && !resizedAuth[RESIZER_TOKEN_VERSION]) {
		resizedAuth[RESIZER_TOKEN_VERSION] = resizedAuth.hash;
	}

	if (shouldLazyLoad && isServerSide()) {
		return null;
	}

	const alt = headline || description || null;
	const imageParams =
		imageURL && resizedAuth
			? {
					ansImage: {
						_id: resizedImage ? imageId : "",
						url: imageURL,
						auth: resizedAuth,
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

	return (
		<LazyLoad enabled={shouldLazyLoad}>
			<HeadingSection>
				<article
					className={`${BLOCK_CLASS_NAME}${showImage ? ` ${BLOCK_CLASS_NAME}--show-image` : ""}`}
				>
					{showImage ? (
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
								<Image
									className={`${linkURL ? `${BLOCK_CLASS_NAME}__imgWithLink` : ""}`}
									{...imageParams}
								/>
							</Conditional>
						</MediaItem>
					) : null}

					{showHeadline && headline ? (
						<Heading className={`${BLOCK_CLASS_NAME}__headline`}>
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
					{showDescription ? <Paragraph>{description}</Paragraph> : null}
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
