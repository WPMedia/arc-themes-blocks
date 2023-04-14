import React from "react";
import PropTypes from "prop-types";

import LevelContext from "../context";

import PrimaryFont from "../../primary-font";
import SecondaryFont from "../../secondary-font";
import "./styles.scss";

const FONT = "Secondary";

const Heading = (props) => (
	<LevelContext.Consumer>
		{(level) => {
			const headingTag = `h${Math.min(level, 6)}`;
			const { font } = props;
			const FontType = font === FONT ? SecondaryFont : PrimaryFont;
			return <FontType as={headingTag} {...props} />;
		}}
	</LevelContext.Consumer>
);

Heading.defaultProps = {
	font: "Primary",
};

Heading.propTypes = {
	font: PropTypes.oneOf(["Primary", "Secondary"]),
};

export default Heading;
