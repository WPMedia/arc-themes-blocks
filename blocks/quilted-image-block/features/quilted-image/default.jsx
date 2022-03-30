import React from "react";
import PropTypes from "@arc-fusion/prop-types";

// Arc Themes Components - Base set of components used to compose blocks
// https://github.com/WPMedia/arc-themes-components/
import {
	Heading,
	HeadingSection,
	Image,
	Button,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-quilted-image";
function QuiltedImage({ customFields }) {
	const {
		headline,
		image1URL,
		overlay1Text,
		overlay1TextVariant = "dark",
		button1Text,
		// NOTE : Link href properties currently need a default or "startsWith of undefined" error is raised.
		// https://github.com/WPMedia/arc-themes-components/blob/arc-themes-release-version-2.00/src/components/link/index.jsx#L22
		button1Action = "",
		button1Variant = "dark",
		image2URL,
		overlay2Text,
		overlay2TextVariant = "dark",
		button2Text,
		button2Action = "",
		button2Variant = "dark",
		image3URL,
		overlay3Text,
		overlay3TextVariant = "dark",
		button3Text,
		button3Action = "",
		button3Variant = "dark",
	} = customFields;

	// Translate user-facing variant name into values component is expecting.
	const getButtonVariant = (value) => (value === "dark" ? "primary" : "secondary");

	// get properties from context for using translations in intl.json
	// See document for more info https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2538275032/Lokalise+and+Theme+Blocks
	// const { arcSite } = useFusionContext();
	// const { locale } = getProperties(arcSite);
	// const phrases = getTranslatedPhrases(locale);

	// Account for "dark" or "light" variants y
	/*
  const cssClasses = [
		BLOCK_CLASS_NAME,
		variant === "dark" ? `${BLOCK_CLASS_NAME}--dark` : `${BLOCK_CLASS_NAME}--light`,
	].join(" ");
  */

	return (
		<div className={`${BLOCK_CLASS_NAME}`}>
			<HeadingSection>
				{headline ? <Heading>{headline}</Heading> : null}
				<Stack>
					<Stack direction="horizontal">
						<div className="b-quilted-image--media-panel">
							{/*
              TODO : Determine if other data should be used for image alt text or if image
              title or description needs to be brought in via searchable hooks, e.g. searchableField.
              https://corecomponents.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/api/react-hooks.md?version=3.1
            */}
							<Image src={image1URL} alt={overlay1Text} />
							<Stack className="b-quilted-image--overlay" inline>
								<Paragraph className={`b-quilted-image--overlay-text-${overlay1TextVariant}`}>
									{overlay1Text}
								</Paragraph>
								{/* TODO : Change button names as per https://github.com/WPMedia/arc-themes-components/blob/arc-themes-release-version-2.00/src/components/button/index.jsx  */}
								<Button
									variant={getButtonVariant(button1Variant)}
									size="small"
									href={button1Action}
								>
									{button1Text}
								</Button>
							</Stack>
						</div>
						<div className="b-quilted-image--media-panel">
							<Image src={image2URL} alt={overlay2Text} />
							<Stack className="b-quilted-image--overlay" inline>
								<Paragraph className={`b-quilted-image--overlay-text-${overlay2TextVariant}`}>
									{overlay2Text}
								</Paragraph>
								<Button
									variant={getButtonVariant(button2Variant)}
									size="small"
									href={button2Action}
								>
									{button2Text}
								</Button>
							</Stack>
						</div>
					</Stack>
					<div className="b-quilted-image--media-panel">
						<Image src={image3URL} alt={overlay3Text} />
						<Stack className="b-quilted-image--overlay" inline>
							<Paragraph className={`b-quilted-image--overlay-text-${overlay3TextVariant}`}>
								{overlay3Text}
							</Paragraph>
							<Button variant={getButtonVariant(button3Variant)} size="small" href={button3Action}>
								{button3Text}
							</Button>
						</Stack>
					</div>
				</Stack>
			</HeadingSection>
		</div>
	);
}

QuiltedImage.label = "Quilted Image - Arc Block";

// find matching icon in https://redirector.arcpublishing.com/pagebuilder/block-icon-library
QuiltedImage.icon = "picture-polaroid-album-1";

QuiltedImage.propTypes = {
	customFields: PropTypes.shape({
		headline: PropTypes.string.tag({
			label: "Headline",
			defaultValue: "",
			description: "Headline text describing all images",
		}),
		image1URL: PropTypes.string.tag({
			label: "Image URL",
			searchable: "image",
			description: "URL of first image, displayed at 4:3 aspect ratio.",
			group: "Image 1",
		}).isRequired,
		overlay1Text: PropTypes.string.tag({
			label: "Overlay Text",
			description: "Overlay text appearing within the image.",
			group: "Image 1",
		}).isRequired,
		overlay1TextVariant: PropTypes.oneOf(["dark", "light"]).tag({
			label: "Overlay Text Color",
			defaultValue: "dark",
			group: "Image 1",
		}),
		button1Text: PropTypes.string.tag({
			label: "Button Text",
			description: "Text appearing on image's button.",
			group: "Image 1",
		}).isRequired,
		button1Action: PropTypes.string.tag({
			label: "Button Click URL",
			description: "Destination URL when image's button is clicked.",
			group: "Image 1",
		}).isRequired,
		button1Variant: PropTypes.oneOf(["dark", "light"]).tag({
			label: "Button Color",
			defaultValue: "dark",
			group: "Image 1",
		}),
		image2URL: PropTypes.string.tag({
			label: "Image URL",
			searchable: "image",
			description: "URL of first image, displayed at 4:3 aspect ratio on desktop displays.",
			group: "Image 2",
		}).isRequired,
		overlay2Text: PropTypes.string.tag({
			label: "Overlay Text",
			description: "Overlay text appearing within the image.",
			group: "Image 2",
		}).isRequired,
		overlay2TextVariant: PropTypes.oneOf(["dark", "light"]).tag({
			label: "Overlay Text Color",
			defaultValue: "dark",
			group: "Image 2",
		}),
		button2Text: PropTypes.string.tag({
			label: "Button Text",
			description: "Text appearing on image button.",
			group: "Image 2",
		}).isRequired,
		button2Action: PropTypes.string.tag({
			label: "Button Click URL",
			description: "Destination URL when image button is clicked.",
			group: "Image 2",
		}).isRequired,
		button2Variant: PropTypes.oneOf(["dark", "light"]).tag({
			label: "Button Color",
			defaultValue: "dark",
			group: "Image 2",
		}),
		image3URL: PropTypes.string.tag({
			label: "Image URL",
			searchable: "image",
			description: "URL of first image, displayed at 4:3 aspect ratio on desktop displays.",
			group: "Image 3",
		}).isRequired,
		overlay3Text: PropTypes.string.tag({
			label: "Overlay Text",
			description: "Overlay text appearing within the image.",
			group: "Image 3",
		}).isRequired,
		overlay3TextVariant: PropTypes.oneOf(["dark", "light"]).tag({
			label: "Overlay Text Color",
			defaultValue: "dark",
			group: "Image 3",
		}),
		button3Text: PropTypes.string.tag({
			label: "Button Text",
			description: "Text appearing on image button.",
			group: "Image 3",
		}).isRequired,
		button3Action: PropTypes.string.tag({
			label: "Button Click URL",
			description: "Destination URL when image button is clicked.",
			group: "Image 3",
		}).isRequired,
		button3Variant: PropTypes.oneOf(["dark", "light"]).tag({
			label: "Button Color",
			defaultValue: "dark",
			group: "Image 3",
		}),
	}),
};

export default QuiltedImage;
