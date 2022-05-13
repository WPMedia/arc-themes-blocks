import React from "react";
import PropTypes from "prop-types";
import { Heading } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-header";

function Header(props) {
	const { customFields: { size, text } = {} } = props;
	switch (size) {
		case "Extra Large":
			return (
				<Heading className={`${BLOCK_CLASS_NAME} ${BLOCK_CLASS_NAME}--extra-large`}>{text}</Heading>
			);
		case "Large":
			return <Heading className={`${BLOCK_CLASS_NAME} ${BLOCK_CLASS_NAME}--large`}>{text}</Heading>;
		case "Small":
			return (
				<Heading as="h5" className={`${BLOCK_CLASS_NAME} ${BLOCK_CLASS_NAME}--small`}>
					{text}
				</Heading>
			);
		case "Medium":
		default:
			return (
				<Heading className={`${BLOCK_CLASS_NAME} ${BLOCK_CLASS_NAME}--medium`}>{text}</Heading>
			);
	}
}

Header.propTypes = {
	customFields: PropTypes.shape({
		text: PropTypes.string,
		size: PropTypes.oneOf(["Extra Large", "Large", "Medium", "Small"]),
	}),
};

Header.label = "Header – Arc Block";

Header.icon = "arc-headline";

export default Header;
