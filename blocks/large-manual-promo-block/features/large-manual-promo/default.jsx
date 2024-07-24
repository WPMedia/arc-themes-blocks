import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import { useComponentContext, useFusionContext } from "fusion:context";
import { useContent, useEditableContent } from "fusion:content";
import getProperties from "fusion:properties";
import {
	Conditional,
	formatURL,
	getFocalFromANS,
	getManualImageID,
	Grid,
	Heading,
	HeadingSection,
	Image,
	isServerSide,
	LazyLoad,
	Link,
	MediaItem,
	Overline,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-large-manual-promo";

const PromoOverline = ({ showOverline, overline, overlineURL }) => {
	if (showOverline && overline) {
		if (overlineURL) {
			return <Overline href={overlineURL}>{overline}</Overline>;
		}
		return <Overline>{overline}</Overline>;
	}
	return null;
};

const LargeManualPromo = ({ customFields }) => {
	const {
		description,
		headline,
		imageAuth,
		imageURL,
		imageId,
		imageFocalPoint,
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

	const resizedImage = imageId && imageAuth && imageAuth !== "{}" && imageURL?.includes(imageId);
	const manualImageId = getManualImageID(imageURL, resizedImage);
	let resizedAuth = useContent(
		resizedImage || !imageURL
			? {}
			: {
					source: "signing-service",
					query: { id: manualImageId || imageURL },
				},
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
	const ansImage = {
		_id: resizedImage ? imageId : manualImageId,
		url: imageURL,
		auth: resizedAuth,
		focal_point: imageFocalPoint ? JSON.parse(imageFocalPoint) : undefined,
	};

	const alt = headline || description || null;
	const imageParams =
		imageURL && resizedAuth
			? {
				ansImage,
				alt,
				aspectRatio: imageRatio,
					resizedOptions: getFocalFromANS(ansImage),
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
				<Grid as="article" className={BLOCK_CLASS_NAME}>
					{showImage ? (
						<MediaItem
							{...searchableField({
								imageURL: "url",
								imageId: "_id",
								imageAuth: "auth",
								imageFocalPoint: "focal_point",
							})}
							suppressContentEditableWarning
						>
							<Conditional
								className={`${BLOCK_CLASS_NAME}__img`}
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
					<Stack className={`${BLOCK_CLASS_NAME}__text`}>
						<PromoOverline
							showOverline={showOverline}
							overline={overline}
							overlineURL={overlineURL}
						/>
						{showDescription || showHeadline ? (
							<Stack>
								{showHeadline && headline ? (
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
								{showDescription && description ? <Paragraph>{description}</Paragraph> : null}
							</Stack>
						) : null}
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
		imageAuth: PropTypes.string.tag({
			hidden: true,
		}),
		imageId: PropTypes.string.tag({
			hidden: true,
		}),
		imageFocalPoint: PropTypes.string.tag({
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
