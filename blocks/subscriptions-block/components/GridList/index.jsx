import React from "react";
import PropTypes from "@arc-fusion/prop-types";

const GridList = ({ children, className }) => {
	if (!children) {
		return null;
	}

	return <div className={`${className}__grid-list`}>{children}</div>;
};

GridList.propTypes = {
	children: PropTypes.any,
};

export default GridList;
