import React from "react";
import PropTypes from "@arc-fusion/prop-types";

// Arc Themes Components - Base set of components used to compose blocks
// https://github.com/WPMedia/arc-themes-components/
import {
	Button,
	Heading,
	HeadingSection,
	Image,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-quilted-image";
/*
function QuiltedImage({ customFields }) {
	const {
		headline,
		image1URL,
		link1Action,
		link1Text,
		link1Type,
		link2Action,
		link2Text,
		link2Type,
		subHeadline,
		variant = "dark",
*/

function QuiltedImage({ customFields }) {
	// get properties from context for using translations in intl.json
	// See document for more info https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2538275032/Lokalise+and+Theme+Blocks
	const { arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	return (
		<div className={`${BLOCK_CLASS_NAME}`}>
			{showHeading ? <Heading>{phrases.t("quilted-image-block.hello-text")}</Heading> : null}
		</div>
	);
}

QuiltedImage.label = "Quilted Image - Arc Block";

// find matching icon in https://redirector.arcpublishing.com/pagebuilder/block-icon-library
QuiltedImage.icon = "picture-polaroid-album-1";

QuiltedImage.propTypes = {
	customFields: PropTypes.shape({
		headline: PropTypes.boolean.string.tag({
			name: "Headline",
			defaultValue: "",
			description: "Headline text describing all images",
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
			group: "Image 1",
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
		linkText3: PropTypes.string.tag({
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
