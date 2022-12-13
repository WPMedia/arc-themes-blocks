import React, { Fragment } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { RESIZER_APP_VERSION } from "fusion:environment";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";

// Arc Themes Components - Base set of components used to compose blocks
// https://github.com/WPMedia/arc-themes-components/
import {
	Button,
	Heading,
	HeadingSection,
	Paragraph,
	Picture,
	Stack,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-hero";

function Hero({ customFields }) {
	const {
		layout = "overlay",
		alignment = "center",
		description,
		headline,
		imageId,
		imageAuth,
		mobileImageAuth,
		imageURLDesktop,
		mobileImageId,
		imageURLMobile,
		link1Action,
		link1Text,
		link1Type,
		link2Action,
		link2Text,
		link2Type,
		subHeadline,
		// targetFallbackImage,
		variant = "dark",
	} = customFields;
	const { arcSite } = useFusionContext();
	const { fallbackImage, resizerURL } = getProperties(arcSite);
	const classes = [
		BLOCK_CLASS_NAME,
		`${BLOCK_CLASS_NAME}--${layout}`,
		variant === "dark" ? `${BLOCK_CLASS_NAME}--dark` : `${BLOCK_CLASS_NAME}--light`,
	].join(" ");
	const alt = headline || description || null;
	const imageAuthToken = useContent(
		!imageAuth && imageId
			? {
					source: "signing-service",
					query: { id: imageId },
			  }
			: {}
	);
	const mobileImageAuthToken = useContent(
		!mobileImageAuth && mobileImageId
			? {
					source: "signing-service",
					query: { id: mobileImageId },
			  }
			: {}
	);
	const imageAuthTokenObj = {};
	if (imageAuthToken?.hash) {
		imageAuthToken[RESIZER_APP_VERSION] = imageAuthToken.hash;
	}
	const mobileImageAuthTokenObj = {};
	if (mobileImageAuthToken?.hash) {
		mobileImageAuthToken[RESIZER_APP_VERSION] = mobileImageAuthToken.hash;
	}
	const desktopImageParams =
		imageId && imageURLDesktop
			? {
					ansImage: {
						_id: imageId,
						url: imageURLDesktop,
						auth: imageAuth ? JSON.parse(imageAuth) : imageAuthTokenObj,
					},
					src: imageURLDesktop,
					alt,
					resizedOptions: {
						smart: true,
					},
					responsiveImages: [600, 800, 1200, 1600, 1800],
					width: 600,
					resizerURL,
			  }
			: {
					src: fallbackImage,
					alt,
			  };

	const mobileImageParams =
		mobileImageId && imageURLMobile
			? {
					ansImage: {
						_id: mobileImageId,
						url: imageURLMobile,
						auth: mobileImageAuth ? JSON.parse(mobileImageAuth) : mobileImageAuthTokenObj,
					},
					alt,
					resizedOptions: {
						smart: true,
					},
					responsiveImages: [200, 400, 600, 800, 1200],
					width: 600,
					resizerURL,
			  }
			: {
					src: fallbackImage,
					alt,
			  };
	const HeadingWrapper = headline ? HeadingSection : Fragment;
	return (
		<div className={classes}>
			<Picture>
				<Picture.Source {...{ media: "(min-width:600px)", ...desktopImageParams }} />
				<Picture.Image {...mobileImageParams} />
			</Picture>

			<Stack
				className={`${BLOCK_CLASS_NAME}__text--${layout} ${
					alignment === "left"
						? `${BLOCK_CLASS_NAME}__text--left`
						: `${BLOCK_CLASS_NAME}__text--center`
				}`}
			>
				<HeadingWrapper>
					{headline ? <Heading>{headline}</Heading> : null}
					{subHeadline ? (
						<HeadingSection>
							<Heading className={`${BLOCK_CLASS_NAME}__subheadline`}>{subHeadline}</Heading>
						</HeadingSection>
					) : null}
					{description ? <Paragraph>{description}</Paragraph> : null}

					{(link1Action && link1Text) || (link2Action && link2Text) ? (
						<Stack
							className={`${BLOCK_CLASS_NAME}__buttonrow`}
							direction="horizontal"
							justification={alignment === "center" ? "center" : "start"}
						>
							{link1Action && link1Text ? (
								<Button href={link1Action} variant={link1Type} size="large">
									{link1Text}
								</Button>
							) : null}
							{link2Action && link2Text ? (
								<Button href={link2Action} variant={link2Type} size="large">
									{link2Text}
								</Button>
							) : null}
						</Stack>
					) : null}
				</HeadingWrapper>
			</Stack>
		</div>
	);
}

Hero.label = "Hero – Arc Block";

Hero.icon = "picture-double-shapes";

Hero.propTypes = {
	customFields: PropTypes.shape({
		layout: PropTypes.oneOf(["overlay", "stacked"]).tag({
			defaultValue: "overlay",
			description: "Overlay is text on top of the image and stacked is the text under the image.",
			label: "Layout configuration",
		}),
		alignment: PropTypes.oneOf(["center", "left"]).tag({
			defaultValue: "center",
			description:
				"How the content should be aligned over the image. Applies to overlay layout only.",
			label: "Content Alignment",
		}),
		variant: PropTypes.oneOf(["dark", "light"]).tag({
			defaultValue: "dark",
			label: "Content Style",
			description: "Select a light or dark theme for the content area.",
		}),
		imageURLDesktop: PropTypes.string.tag({
			label: "Image URL for Desktop",
			description: "Select an image appropriate for desktop sized screens.",
			searchable: "image",
		}),
		imageURLMobile: PropTypes.string.tag({
			label: "Image URL for Mobile",
			description: "Select an image appropriate for mobile sized screens.",
			searchable: "image",
		}),
		imageAltText: PropTypes.string.tag({
			defaultValue: "",
			description: "The alt text that will be applied for both the mobile and desktop image.",
			label: "Image alt text",
		}),
		headline: PropTypes.string.tag({
			label: "Headline Text",
			description: "The headline for the text area of the hero block.",
			required: true,
		}),
		subHeadline: PropTypes.string.tag({
			label: "Sub-Headline Text",
			description: "The sub-headline for the text area of the hero block.",
		}),
		description: PropTypes.string.tag({
			label: "Description Text",
			description: "The description for the text area of the hero block.",
		}),
		link1Action: PropTypes.string.tag({
			group: "Button 1",
			label: "Button #1 Link Url",
			description: "The url this button links to.",
			required: true,
		}),
		link1Text: PropTypes.string.tag({
			group: "Button 1",
			label: "Button #1 Text",
			description: "The text displayed on the button.",
			required: true,
		}),
		link1Type: PropTypes.oneOf(["primary", "secondary"]).tag({
			group: "Button 1",
			defaultValue: "secondary",
			label: "Button #1 Type",
			required: true,
			description: "Select a style for this button.",
		}),
		link2Action: PropTypes.string.tag({
			group: "Button 2",
			label: "Button #2 Link Url",
			description: "The url this button links to.",
		}),
		link2Text: PropTypes.string.tag({
			group: "Button 2",
			label: "Button #2 Text",
			description: "The text displayed on the button.",
		}),
		link2Type: PropTypes.oneOf(["primary", "secondary"]).tag({
			group: "Button 2",
			defaultValue: "secondary",
			label: "Button #2 Type",
			description: "Select a style for this button.",
		}),
	}),
};

export default Hero;
