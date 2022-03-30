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

const BLOCK_CLASS_NAME = "b-hero";

function Hero({ customFields }) {
	const {
		alignment = "center",
		description,
		headline,
		imageURL,
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
			<Image className="b-hero--image" src={imageURL} alt="" />
			<Stack
				alignment={alignment}
				className={`${BLOCK_CLASS_NAME}--text ${
					alignment === "left" ? `${BLOCK_CLASS_NAME}--left` : `${BLOCK_CLASS_NAME}--center`
				}`}
			>
				<HeadingSection>
					{headline ? <Heading className="b-hero--headline">{headline}</Heading> : null}
					{subHeadline ? (
						<HeadingSection>
							<Heading className="b-hero--subheadline">{subHeadline}</Heading>
						</HeadingSection>
					) : null}
					{description ? <Paragraph className="b-hero--paragraph">{description}</Paragraph> : null}

					{(link1Action && link1Text) || (link2Action && link2Text) ? (
						<Stack
							className="b-hero--buttonrow"
							direction="horizontal"
							justification={alignment === "center" ? "center" : "start"}
						>
							<Button href={link1Action} variant={link1Type}>
								{link1Text}
							</Button>
							<Button href={link2Action} variant={link2Type}>
								{link2Text}
							</Button>
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
		alignment: PropTypes.oneOf(["center", "left"]).tag({
			defaultValue: "center",
			label: "Content Alignment over the image",
		}),
		variant: PropTypes.oneOf(["dark", "light"]).tag({
			defaultValue: "dark",
			label: "Content Style",
		}),
		imageURL: PropTypes.string.tag({
			label: "Image URL",
			searchable: "image",
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
