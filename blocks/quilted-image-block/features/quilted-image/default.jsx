import React from "react";
import PropTypes from "@arc-fusion/prop-types";

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

function QuiltedImage({ customFields }) {
	const {
		headline,
		fullWidthImage,
		image1URL,
		image1AspectRatio,
		overlay1Text,
		overlay1TextVariant,
		button1Text,
		item1Action,
		button1Variant,
		image2URL,
		image2AspectRatio,
		overlay2Text,
		overlay2TextVariant,
		button2Text,
		item2Action,
		button2Variant,
		image3URL,
		image3AspectRatio,
		overlay3Text,
		overlay3TextVariant,
		button3Text,
		item3Action,
		button3Variant,
	} = customFields;

	return (
		<div className={BLOCK_CLASS_NAME}>
			<HeadingSection>
				{headline ? <Heading>{headline}</Heading> : null}
				<div className={`${BLOCK_CLASS_NAME}__wrapper`}>
					<Link
						href={item1Action || "#"}
						className={`${BLOCK_CLASS_NAME}__media-panel  ${
							fullWidthImage === "top" ? `${BLOCK_CLASS_NAME}__wrapper-top` : ""
						}`}
					>
						<Image src={image1URL} style={{ aspectRatio: image1AspectRatio }} />
						<Stack className={`${BLOCK_CLASS_NAME}__overlay`} inline>
							{overlay1Text ? (
								<Paragraph className={`${BLOCK_CLASS_NAME}__overlay-text--${overlay1TextVariant}`}>
									{overlay1Text}
								</Paragraph>
							) : null}
							{button1Text ? (
								<Button variant={button1Variant} size="small" assistiveHidden>
									{button1Text}
								</Button>
							) : null}
						</Stack>
					</Link>
					<Link href={item2Action || "#"} className={`${BLOCK_CLASS_NAME}__media-panel`}>
						<Image src={image2URL} style={{ aspectRatio: image2AspectRatio }} />
						<Stack className={`${BLOCK_CLASS_NAME}__overlay`} inline>
							{overlay2Text ? (
								<Paragraph className={`${BLOCK_CLASS_NAME}__overlay-text--${overlay2TextVariant}`}>
									{overlay2Text}
								</Paragraph>
							) : null}
							{button2Text ? (
								<Button variant={button2Variant} size="small" assistiveHidden>
									{button2Text}
								</Button>
							) : null}
						</Stack>
					</Link>
					<Link
						href={item3Action || "#"}
						className={`${BLOCK_CLASS_NAME}__media-panel ${
							fullWidthImage === "bottom" ? `${BLOCK_CLASS_NAME}__wrapper-bottom` : ""
						}`}
					>
						<Image src={image3URL} style={{ aspectRatio: image3AspectRatio }} />
						<Stack className={`${BLOCK_CLASS_NAME}__overlay`} inline>
							{overlay3Text ? (
								<Paragraph className={`${BLOCK_CLASS_NAME}__overlay-text--${overlay3TextVariant}`}>
									{overlay3Text}
								</Paragraph>
							) : null}
							{button3Text ? (
								<Button variant={button3Variant} size="small" assistiveHidden>
									{button3Text}
								</Button>
							) : null}
						</Stack>
					</Link>
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