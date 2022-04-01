import React from "react";
import PropTypes from "@arc-fusion/prop-types";

// Arc Themes Components - Base set of components used to compose blocks
// https://github.com/WPMedia/arc-themes-components/
import { Button, Heading, HeadingSection, Paragraph, Stack } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-hero";

function Hero({ customFields }) {
	const {
		layout = "overlay",
		alignment = "center",
		description,
		headline,
		imageURLDesktop,
		imageURLMobile,
		desktopMediaBreakpoint,
		imageAltText,
		link1Action,
		link1Text,
		link1Type,
		link2Action,
		link2Text,
		link2Type,
		subHeadline,
		variant = "dark",
	} = customFields;

	const classes = [
		BLOCK_CLASS_NAME,
		variant === "dark" ? `${BLOCK_CLASS_NAME}--dark` : `${BLOCK_CLASS_NAME}--light`,
	].join(" ");

	return (
		<div className={classes}>
			<picture>
				<source srcSet={imageURLDesktop} media={`(${desktopMediaBreakpoint})`} />
				<img
					className={
						layout === "stacked"
							? `${BLOCK_CLASS_NAME}--image-stacked`
							: `${BLOCK_CLASS_NAME}--image`
					}
					src={imageURLMobile}
					alt={imageAltText}
				/>
			</picture>

			<Stack
				alignment={alignment}
				className={`${BLOCK_CLASS_NAME}--text ${BLOCK_CLASS_NAME}--${layout} ${
					alignment === "left" ? `${BLOCK_CLASS_NAME}--left` : `${BLOCK_CLASS_NAME}--center`
				}`}
			>
				<HeadingSection>
					{headline ? <Heading>{headline}</Heading> : null}
					{subHeadline ? (
						<HeadingSection>
							<Heading className={`${BLOCK_CLASS_NAME}--subheadline`}>{subHeadline}</Heading>
						</HeadingSection>
					) : null}
					{description ? <Paragraph>{description}</Paragraph> : null}

					{(link1Action && link1Text) || (link2Action && link2Text) ? (
						<Stack
							className={`${BLOCK_CLASS_NAME}--buttonrow`}
							direction="horizontal"
							justification={alignment === "center" ? "center" : "start"}
						>
							{link1Action && link1Text && (
								<Button href={link1Action} variant={link1Type}>
									{link1Text}
								</Button>
							)}
							{link2Action && link2Text && (
								<Button href={link2Action} variant={link2Type}>
									{link2Text}
								</Button>
							)}
						</Stack>
					) : null}
				</HeadingSection>
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
			label:
				"Layout configuration. Overlay is text on top of the image and stacked is the text under the image.",
		}),
		alignment: PropTypes.oneOf(["center", "left"]).tag({
			defaultValue: "center",
			label: "Content Alignment over the image. Applies to overlay layout only. ",
		}),
		variant: PropTypes.oneOf(["dark", "light"]).tag({
			defaultValue: "dark",
			label: "Content Style",
		}),
		imageURLDesktop: PropTypes.string.tag({
			label: "Image URL for Desktop",
			searchable: "image",
		}),
		desktopMediaBreakpoint: PropTypes.oneOf([
			"min-width: 800px",
			"min-width: 700px",
			"min-width: 600px",
			"min-width: 500px",
		]).tag({
			defaultValue: "min-width: 800px",
			label:
				"Image Breakpoint: Enter the media query that will determine when the desktop picture is shown over the mobile version.",
		}),
		imageURLMobile: PropTypes.string.tag({
			label: "Image URL for Mobile",
			searchable: "image",
		}),
		imageAltText: PropTypes.string.tag({
			defaultValue: "",
			label: "Alt text for both the mobile and desktop image",
		}),
		headline: PropTypes.string,
		subHeadline: PropTypes.string,
		description: PropTypes.string,
		link1Action: PropTypes.string.tag({
			group: "Button 1",
			label: "Button Link href",
		}),
		link1Text: PropTypes.string.tag({
			group: "Button 1",
			label: "Button Link Text",
		}),
		link1Type: PropTypes.oneOf(["primary", "secondary"]).tag({
			group: "Button 1",
			defaultValue: "secondary",
			label: "Type of link Button",
		}),
		link2Action: PropTypes.string.tag({
			group: "Button 2",
			label: "Button Link href",
		}),
		link2Text: PropTypes.string.tag({
			group: "Button 2",
			label: "Button Link Text",
		}),
		link2Type: PropTypes.oneOf(["primary", "secondary"]).tag({
			group: "Button 2",
			defaultValue: "secondary",
			label: "Type of link Button",
		}),
	}),
};

export default Hero;