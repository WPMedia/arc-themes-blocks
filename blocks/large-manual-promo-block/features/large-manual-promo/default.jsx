import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import { useComponentContext, useFusionContext } from "fusion:context";
import { useContent, useEditableContent } from "fusion:content";
import getProperties from "fusion:properties";
import {
	Conditional,
	Image,
	isServerSide,
	formatURL,
	Grid,
	Heading,
	HeadingSection,
	LazyLoad,
	Link,
	MediaItem,
	Overline,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-large-manual-promo";

const LargeManualPromo = ({ customFields }) => {
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

	const PromoOverline = () => {
		if (showOverline && overline) {
			if (overlineURL) {
				return (
					<Overline className={`${BLOCK_CLASS_NAME}__overline`} href={overlineURL}>
						{overline}
					</Overline>
				);
			}
			return <Overline className={`${BLOCK_CLASS_NAME}__overline`}>{overline}</Overline>;
		}
		return null;
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
							})}
							suppressContentEditableWarning
						>
							<Conditional
								className={`${linkURL ? `${BLOCK_CLASS_NAME}__imgWithLink` : ""}`}
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
						<PromoOverline />
						{showDescription || showHeadline ? (
							<Stack>
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
