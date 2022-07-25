import React from "react";
import PropTypes from "prop-types";

import LevelContext from "../context";

const HeadingSection = ({ children }) => (
	<LevelContext.Consumer>
		{(level) => <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>}
	</LevelContext.Consumer>
);

HeadingSection.propTypes = {
	children: PropTypes.any,
};

export default HeadingSection;
