import React from "react";
import PropTypes from "@arc-fusion/prop-types";

const GridList = ({ children, className }) => {
	const childCount = React.Children.count(children);
	const additionalClass = childCount ? `${className}__grid-list--${childCount}` : "";

	if (!children) {
		return null;
	}

	return <div className={`${className}__grid-list ${additionalClass}`}>{children}</div>;
};

GridList.propTypes = {
	children: PropTypes.any,
};

export default GridList;
