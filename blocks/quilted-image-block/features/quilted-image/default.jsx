import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { RESIZER_APP_VERSION } from "fusion:environment";
import { useFusionContext } from "fusion:context";
import { useContent, useEditableContent } from "fusion:content";
// Arc Themes Components - Base set of components used to compose blocks
// https://github.com/WPMedia/arc-themes-components/
import {
	Heading,
	HeadingSection,
	Image,
	Link,
	Button,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-quilted-image";
const ASPECT_RATIO_MAP = ["16:9", "4:3"];
const OVERLAY_TEXT_VARIANTS = ["dark", "light"];
const BUTTON_VARIANTS = ["primary", "secondary"];

function QuiltedImage({ customFields }) {
	const {
		headline,
		fullWidthImage,
		image1URL,
		image1AspectRatio,
		image1Auth,
		image1Id,
		image1Alt,
		overlay1Text,
		overlay1TextVariant,
		button1Text,
		item1Action,
		button1Variant,
		image2URL,
		image2AspectRatio,
		image2Auth,
		image2Id,
		image2Alt,
		overlay2Text,
		overlay2TextVariant,
		button2Text,
		item2Action,
		button2Variant,
		image3URL,
		image3AspectRatio,
		image3Auth,
		image3Id,
		image3Alt,
		overlay3Text,
		overlay3TextVariant,
		button3Text,
		item3Action,
		button3Variant,
	} = customFields;

	console.log(customFields);

	const { isAdmin } = useFusionContext();
	const { searchableField } = useEditableContent();

	const sharedImageParams = {
		resizedOptions: {
			smart: true,
		},
		responsiveImages: [200, 400, 600, 800, 1000],
		width: 600,
	};

	const image1AuthToken = useContent(
		!image1Auth && image1Id
			? {
					source: "signing-service",
					query: { id: image1Id },
			  }
			: {}
	);

	const image1AuthTokenObj = {};
	if (image1AuthToken?.hash) {
		image1AuthTokenObj[RESIZER_APP_VERSION] = image1AuthToken.hash;
	}

	const image1Params =
		image1Id && image1URL
			? {
					ansImage: {
						_id: image1Id,
						url: image1URL,
						auth: image1Auth ? JSON.parse(image1Auth) : image1AuthTokenObj,
					},
					alt: image1Alt,
					aspectRatio: image1AspectRatio,
					...sharedImageParams,
			  }
			: {};

	const image2AuthToken = useContent(
		!image2Auth && image2Id
			? {
					source: "signing-service",
					query: { id: image2Id },
			  }
			: {}
	);

	const image2AuthTokenObj = {};
	if (image2AuthToken?.hash) {
		image2AuthTokenObj[RESIZER_APP_VERSION] = image2AuthToken.hash;
	}

	const image2Params =
		image2Id && image2URL
			? {
					ansImage: {
						_id: image2Id,
						url: image2URL,
						auth: image2Auth ? JSON.parse(image2Auth) : image2AuthTokenObj,
					},
					alt: image2Alt,
					aspectRatio: image2AspectRatio,
					...sharedImageParams,
			  }
			: {};

	const image3AuthToken = useContent(
		!image3Auth && image3Id
			? {
					source: "signing-service",
					query: { id: image3Id },
			  }
			: {}
	);

	const image3AuthTokenObj = {};
	if (image3AuthToken?.hash) {
		image3AuthTokenObj[RESIZER_APP_VERSION] = image3AuthToken.hash;
	}

	const image3Params =
		image3Id && image3URL
			? {
					ansImage: {
						_id: image3Id,
						url: image3URL,
						auth: image3Auth ? JSON.parse(image3Auth) : image3AuthTokenObj,
					},
					alt: image3Alt,
					aspectRatio: image3AspectRatio,
					...sharedImageParams,
			  }
			: {};

	const adminDivStyles = {
		position: "relative",
		flexBasis: "33%",
	};

	return (
		<div className={BLOCK_CLASS_NAME}>
			{isAdmin && (
				<div style={{ display: "flex", marginTop: "1rem" }}>
					Admin Only:
					<div style={adminDivStyles}>
						<div
							{...searchableField({
								image1URL: "url",
								image1Id: "_id",
								image1Auth: "auth",
								image1Alt: "alt_text",
							})}
							suppressContentEditableWarning
						>
							Select Image 1
						</div>
					</div>
					<div style={adminDivStyles}>
						<div
							{...searchableField({
								image2URL: "url",
								image2Id: "_id",
								image2Auth: "auth",
								image2Alt: "alt_text",
							})}
							suppressContentEditableWarning
						>
							Select Image 2
						</div>
					</div>
					<div style={adminDivStyles}>
						<div
							{...searchableField({
								image3URL: "url",
								image3Id: "_id",
								image3Auth: "auth",
								image3Alt: "alt_text",
							})}
							suppressContentEditableWarning
						>
							Select Image 3
						</div>
					</div>
				</div>
			)}
			<HeadingSection>
				{headline ? <Heading>{headline}</Heading> : null}
				<div className={`${BLOCK_CLASS_NAME}__wrapper`}>
					{image1URL && item1Action && overlay1Text && button1Text ? (
						<Link
							href={item1Action}
							className={`${BLOCK_CLASS_NAME}__media-panel  ${
								fullWidthImage === "top" ? `${BLOCK_CLASS_NAME}__wrapper-top` : ""
							}`}
						>
							<Image {...image1Params} />
							<Stack className={`${BLOCK_CLASS_NAME}__overlay`} inline>
								<Paragraph className={`${BLOCK_CLASS_NAME}__overlay-text--${overlay1TextVariant}`}>
									{overlay1Text}
								</Paragraph>
								<Button variant={button1Variant} size="small" assistiveHidden>
									{button1Text}
								</Button>
							</Stack>
						</Link>
					) : null}
					{image2URL && item2Action && overlay2Text && button2Text ? (
						<Link href={item2Action} className={`${BLOCK_CLASS_NAME}__media-panel`}>
							<Image {...image2Params} />
							<Stack className={`${BLOCK_CLASS_NAME}__overlay`} inline>
								<Paragraph className={`${BLOCK_CLASS_NAME}__overlay-text--${overlay2TextVariant}`}>
									{overlay2Text}
								</Paragraph>
								<Button variant={button2Variant} size="small" assistiveHidden>
									{button2Text}
								</Button>
							</Stack>
						</Link>
					) : null}
					{image3URL && item3Action && overlay3Text && button3Text ? (
						<Link
							href={item3Action}
							className={`${BLOCK_CLASS_NAME}__media-panel ${
								fullWidthImage === "bottom" ? `${BLOCK_CLASS_NAME}__wrapper-bottom` : ""
							}`}
						>
							<Image {...image3Params} />
							<Stack className={`${BLOCK_CLASS_NAME}__overlay`} inline>
								<Paragraph className={`${BLOCK_CLASS_NAME}__overlay-text--${overlay3TextVariant}`}>
									{overlay3Text}
								</Paragraph>
								<Button variant={button3Variant} size="small" assistiveHidden>
									{button3Text}
								</Button>
							</Stack>
						</Link>
					) : null}
				</div>
			</HeadingSection>
		</div>
	);
}

QuiltedImage.label = "Quilted Image - Arc Block";

QuiltedImage.icon = "picture-polaroid-album-1";

QuiltedImage.propTypes = {
	customFields: PropTypes.shape({
		headline: PropTypes.string.tag({
			label: "Headline",
			defaultValue: "",
			description: "Headline text describing all images",
		}),
		fullWidthImage: PropTypes.oneOf(["top", "bottom"]).tag({
			label: "Full Width Image Location",
			defaultValue: "bottom",
		}),
		image1URL: PropTypes.string.tag({
			label: "Image URL",
			searchable: "image",
			description: "URL of first image, displayed at 4:3 aspect ratio.",
			group: "Image 1",
		}).isRequired,
		image1AspectRatio: PropTypes.oneOf(ASPECT_RATIO_MAP).tag({
			labels: ASPECT_RATIO_MAP,
			defaultValue: "4:3",
			hidden: true,
			group: "Image 1",
		}),
		image1Auth: PropTypes.string.tag({
			hidden: true,
		}),
		image1Id: PropTypes.string.tag({
			hidden: true,
		}),
		image1Alt: PropTypes.string.tag({
			hidden: true,
		}),
		overlay1Text: PropTypes.string.tag({
			label: "Overlay Text",
			description: "Overlay text appearing within the image.",
			defaultValue: "",
			group: "Image 1",
		}).isRequired,
		overlay1TextVariant: PropTypes.oneOf(OVERLAY_TEXT_VARIANTS).tag({
			label: "Overlay Text Color",
			defaultValue: "dark",
			group: "Image 1",
		}),
		button1Text: PropTypes.string.tag({
			label: "Button Text",
			description: "Text appearing on image's button.",
			group: "Image 1",
		}).isRequired,
		item1Action: PropTypes.string.tag({
			label: "Button Click URL",
			description: "Destination URL when image's button is clicked.",
			defaultValue: "",
			group: "Image 1",
		}).isRequired,
		button1Variant: PropTypes.oneOf(BUTTON_VARIANTS).tag({
			label: "Button Color",
			defaultValue: "primary",
			group: "Image 1",
		}),
		image2URL: PropTypes.string.tag({
			label: "Image URL",
			searchable: "image",
			description: "URL of first image, displayed at 4:3 aspect ratio on desktop displays.",
			group: "Image 2",
		}).isRequired,
		image2AspectRatio: PropTypes.oneOf(ASPECT_RATIO_MAP).tag({
			labels: ASPECT_RATIO_MAP,
			defaultValue: "4:3",
			hidden: true,
			group: "Image 2",
		}),
		image2Auth: PropTypes.string.tag({
			hidden: true,
		}),
		image2Id: PropTypes.string.tag({
			hidden: true,
		}),
		image2Alt: PropTypes.string.tag({
			hidden: true,
		}),
		overlay2Text: PropTypes.string.tag({
			label: "Overlay Text",
			description: "Overlay text appearing within the image.",
			defaultValue: "",
			group: "Image 2",
		}).isRequired,
		overlay2TextVariant: PropTypes.oneOf(OVERLAY_TEXT_VARIANTS).tag({
			label: "Overlay Text Color",
			defaultValue: "dark",
			group: "Image 2",
		}),
		button2Text: PropTypes.string.tag({
			label: "Button Text",
			description: "Text appearing on image button.",
			group: "Image 2",
		}).isRequired,
		item2Action: PropTypes.string.tag({
			label: "Button Click URL",
			description: "Destination URL when image button is clicked.",
			defaultValue: "",
			group: "Image 2",
		}).isRequired,
		button2Variant: PropTypes.oneOf(BUTTON_VARIANTS).tag({
			label: "Button Color",
			defaultValue: "primary",
			group: "Image 2",
		}),
		image3URL: PropTypes.string.tag({
			label: "Image URL",
			searchable: "image",
			description: "URL of first image, displayed at 4:3 aspect ratio on desktop displays.",
			group: "Image 3",
		}).isRequired,
		image3AspectRatio: PropTypes.oneOf(ASPECT_RATIO_MAP).tag({
			labels: ASPECT_RATIO_MAP,
			defaultValue: "16:9",
			hidden: true,
			group: "Image 3",
		}),
		image3Auth: PropTypes.string.tag({
			hidden: true,
		}),
		image3Id: PropTypes.string.tag({
			hidden: true,
		}),
		image3Alt: PropTypes.string.tag({
			hidden: true,
		}),
		overlay3Text: PropTypes.string.tag({
			label: "Overlay Text",
			description: "Overlay text appearing within the image.",
			defaultValue: "",
			group: "Image 3",
		}).isRequired,
		overlay3TextVariant: PropTypes.oneOf(OVERLAY_TEXT_VARIANTS).tag({
			label: "Overlay Text Color",
			defaultValue: "dark",
			group: "Image 3",
		}),
		button3Text: PropTypes.string.tag({
			label: "Button Text",
			description: "Text appearing on image button.",
			group: "Image 3",
		}).isRequired,
		item3Action: PropTypes.string.tag({
			label: "Button Click URL",
			description: "Destination URL when image button is clicked.",
			defaultValue: "",
			group: "Image 3",
		}).isRequired,
		button3Variant: PropTypes.oneOf(BUTTON_VARIANTS).tag({
			label: "Button Color",
			defaultValue: "primary",
			group: "Image 3",
		}),
	}),
};

export default QuiltedImage;
