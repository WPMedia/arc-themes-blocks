import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";

// Arc Themes Components - Base set of components used to compose blocks
// https://github.com/WPMedia/arc-themes-components/
import {
	Heading,
	HeadingSection,
	Image,
	Link,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-quilted-image";
function QuiltedImage({ customFields }) {
	const {
		headline,
		variant = "dark",
		image1URL,
		overlayText1,
		link1Text,
		// NOTE : Link href properties currently need a default or "startsWith of undefined" error is raised.
		// https://github.com/WPMedia/arc-themes-components/blob/arc-themes-release-version-2.00/src/components/link/index.jsx#L22
		link1Action = "",
		image2URL,
		overlayText2,
		link2Text,
		link2Action = "",
		image3URL,
		overlayText3,
		link3Text,
		link3Action = "",
	} = customFields;

	// get properties from context for using translations in intl.json
	// See document for more info https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2538275032/Lokalise+and+Theme+Blocks
	// const { arcSite } = useFusionContext();
	// const { locale } = getProperties(arcSite);
	// const phrases = getTranslatedPhrases(locale);

	const cssClasses = [
		BLOCK_CLASS_NAME,
		variant === "dark" ? `${BLOCK_CLASS_NAME}--dark` : `${BLOCK_CLASS_NAME}--light`,
	].join(" ");

	return (
		<div className={cssClasses}>
			<HeadingSection>
				{headline ? <Heading>{headline}</Heading> : null}
				<Stack direction="horizontal">
					<div>
						{/*
              TODO : Determine if other data should be used for image alt text or if image
              title or description needs to be brought in via searchable hooks, e.g. searchableField.
              https://corecomponents.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/api/react-hooks.md?version=3.1
            */}
						<Image src={image1URL} alt={overlayText1} />
						<Stack>
							<Paragraph>{overlayText1}</Paragraph>
							<Link href={link1Action}>{link1Text}</Link>
						</Stack>
					</div>
					<div>
						<Image src={image2URL} alt={overlayText2} />
						<Stack>
							<Paragraph>{overlayText2}</Paragraph>
							<Link href={link2Action}>{link2Text}</Link>
						</Stack>
					</div>
				</Stack>
				<div>
					<Image src={image3URL} alt={overlayText3} />
					<Stack>
						<Paragraph>{overlayText3}</Paragraph>
						<Link href={link3Action}>{link3Text}</Link>
					</Stack>
				</div>
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
		variant: PropTypes.oneOf(["dark", "light"]).tag({
			defaultValue: "dark",
			label: "Content Style",
		}),
		image1URL: PropTypes.string.tag({
			label: "Image URL",
			searchable: "image",
			description: "URL of first image, displayed at 4:3 aspect ratio.",
			group: "Image 1",
		}).isRequired,
		overlayText1: PropTypes.string.tag({
			label: "Overlay Text",
			description: "Overlay text appearing within the image.",
			group: "Image 1",
		}).isRequired,
		link1Text: PropTypes.string.tag({
			label: "Button Text",
			description: "Text appearing on image's button.",
			group: "Image 1",
		}).isRequired,
		link1Action: PropTypes.string.tag({
			label: "Button Click URL",
			description: "Destination URL when image's button is clicked.",
			group: "Image 1",
		}).isRequired,
		image2URL: PropTypes.string.tag({
			label: "Image URL",
			searchable: "image",
			description: "URL of first image, displayed at 4:3 aspect ratio on desktop displays.",
			group: "Image 2",
		}).isRequired,
		overlayText2: PropTypes.string.tag({
			label: "Overlay Text",
			description: "Overlay text appearing within the image.",
			group: "Image 2",
		}).isRequired,
		link2Text: PropTypes.string.tag({
			label: "Button Text",
			description: "Text appearing on image button.",
			group: "Image 2",
		}).isRequired,
		link2Action: PropTypes.string.tag({
			label: "Button Click URL",
			description: "Destination URL when image button is clicked.",
			group: "Image 2",
		}).isRequired,
		image3URL: PropTypes.string.tag({
			label: "Image URL",
			searchable: "image",
			description: "URL of first image, displayed at 4:3 aspect ratio on desktop displays.",
			group: "Image 3",
		}).isRequired,
		overlayText3: PropTypes.string.tag({
			label: "Overlay Text",
			description: "Overlay text appearing within the image.",
			group: "Image 3",
		}).isRequired,
		link3Text: PropTypes.string.tag({
			label: "Button Text",
			description: "Text appearing on image button.",
			group: "Image 3",
		}).isRequired,
		link3Action: PropTypes.string.tag({
			label: "Button Click URL",
			description: "Destination URL when image button is clicked.",
			group: "Image 3",
		}).isRequired,
	}),
};

export default QuiltedImage;
