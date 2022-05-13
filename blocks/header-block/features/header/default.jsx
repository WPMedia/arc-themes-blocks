import React from "react";
import PropTypes from "prop-types";
import { Heading } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-header";

function Header(props) {
	const { customFields: { size, text } = {} } = props;
	let blockModifier = "";

	if (size === "Extra Large") {
		blockModifier = `${BLOCK_CLASS_NAME}--extra-large`;
	} else if (size === "Large") {
		blockModifier = `${BLOCK_CLASS_NAME}--large`;
	} else if (size === "Small") {
		blockModifier = `${BLOCK_CLASS_NAME}--small`;
	} else {
		// if medium or empty then use medium
		blockModifier = `${BLOCK_CLASS_NAME}--medium`;
	}

	return <Heading className={`${BLOCK_CLASS_NAME} ${blockModifier}`}>{text}</Heading>;
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
