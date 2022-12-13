import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent, useEditableContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import { RESIZER_APP_VERSION } from "fusion:environment";
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
const ASPECT_RATIO_MAP = {
	"16/9": "16:9",
	"4/3": "4:3",
};
const OVERLAY_TEXT_VARIANTS = ["dark", "light"];
const BUTTON_VARIANTS = ["primary", "secondary"];

const ImageComponent = ({
	imageAlt,
	imageAspectRatio,
	imageAuth,
	imageId,
	imageURL,
	overlayText,
}) => {
	const image1AuthToken = useContent(
		!imageAuth && imageId
			? {
					source: "signing-service",
					query: { id: imageId },
			  }
			: {}
	);

	const image1AuthTokenObj = {};
	if (image1AuthToken?.hash) {
		image1AuthTokenObj[RESIZER_APP_VERSION] = image1AuthToken.hash;
	}

	const imageParams =
		imageId && imageURL
			? {
					ansImage: {
						_id: imageId,
						url: imageURL,
						auth: imageAuth ? JSON.parse(imageAuth) : image1AuthTokenObj,
					},
					alt: imageAlt,
					aspectRatio: ASPECT_RATIO_MAP[imageAspectRatio],
					resizedOptions: {
						smart: true,
					},
					responsiveImages: [200, 400, 600, 800, 1000],
					width: 600,
			  }
			: {
					src: imageURL,
					alt: overlayText,
			  };

	return <Image {...imageParams} />;
};

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

	const { isAdmin } = useFusionContext();
	const { searchableField } = useEditableContent();

	return (
		<div className={BLOCK_CLASS_NAME}>
			<HeadingSection>
				{headline ? <Heading>{headline}</Heading> : null}
				<div className={`${BLOCK_CLASS_NAME}__wrapper`}>
					{(image1URL && item1Action && overlay1Text && button1Text) || isAdmin ? (
						<Link
							href={item1Action}
							className={`${BLOCK_CLASS_NAME}__media-panel  ${
								fullWidthImage === "top" ? `${BLOCK_CLASS_NAME}__wrapper-top` : ""
							}`}
						>
							<ImageComponent
								imageAlt={image1Alt}
								imageAspectRatio={image1AspectRatio}
								imageAuth={image1Auth}
								imageId={image1Id}
								imageURL={image1URL}
								overlayText={overlay1Text}
							/>
							<Stack
								className={`${BLOCK_CLASS_NAME}__overlay`}
								inline
								{...searchableField({
									image1URL: "url",
									image1Id: "_id",
									image1Auth: "auth",
									image1Alt: "alt_text",
								})}
								suppressContentEditableWarning
							>
								<Paragraph className={`${BLOCK_CLASS_NAME}__overlay-text--${overlay1TextVariant}`}>
									{overlay1Text}
								</Paragraph>
								<Button variant={button1Variant} size="small" assistiveHidden>
									{button1Text}
								</Button>
							</Stack>
						</Link>
					) : null}
					{(image2URL && item2Action && overlay2Text && button2Text) || isAdmin ? (
						<Link href={item2Action} className={`${BLOCK_CLASS_NAME}__media-panel`}>
							<ImageComponent
								imageAlt={image2Alt}
								imageAspectRatio={image2AspectRatio}
								imageAuth={image2Auth}
								imageId={image2Id}
								imageURL={image2URL}
								overlayText={overlay2Text}
							/>
							<Stack
								className={`${BLOCK_CLASS_NAME}__overlay`}
								inline
								{...searchableField({
									image2URL: "url",
									image2Id: "_id",
									image2Auth: "auth",
									image2Alt: "alt_text",
								})}
								suppressContentEditableWarning
							>
								<Paragraph className={`${BLOCK_CLASS_NAME}__overlay-text--${overlay2TextVariant}`}>
									{overlay2Text}
								</Paragraph>
								<Button variant={button2Variant} size="small" assistiveHidden>
									{button2Text}
								</Button>
							</Stack>
						</Link>
					) : null}
					{(image3URL && item3Action && overlay3Text && button3Text) || isAdmin ? (
						<Link
							href={item3Action}
							className={`${BLOCK_CLASS_NAME}__media-panel ${
								fullWidthImage === "bottom" ? `${BLOCK_CLASS_NAME}__wrapper-bottom` : ""
							}`}
						>
							<ImageComponent
								imageAlt={image3Alt}
								imageAspectRatio={image3AspectRatio}
								imageAuth={image3Auth}
								imageId={image3Id}
								imageURL={image3URL}
								overlayText={overlay3Text}
							/>
							<Stack
								className={`${BLOCK_CLASS_NAME}__overlay`}
								inline
								{...searchableField({
									image3URL: "url",
									image3Id: "_id",
									image3Auth: "auth",
									image3Alt: "alt_text",
								})}
								suppressContentEditableWarning
							>
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
		image1AspectRatio: PropTypes.oneOf(Object.keys(ASPECT_RATIO_MAP)).tag({
			labels: ASPECT_RATIO_MAP,
			defaultValue: "4/3",
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
		image2AspectRatio: PropTypes.oneOf(Object.keys(ASPECT_RATIO_MAP)).tag({
			labels: ASPECT_RATIO_MAP,
			defaultValue: "4/3",
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
		image3AspectRatio: PropTypes.oneOf(Object.keys(ASPECT_RATIO_MAP)).tag({
			labels: ASPECT_RATIO_MAP,
			defaultValue: "16/9",
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
