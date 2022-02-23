import React from "react";
import PropTypes from "@arc-fusion/prop-types";

import "./styles.scss";

const GridList = ({ children }) => {
	const childCount = React.Children.count(children);
	const additionalClass = childCount ? `xpmedia-subscription-grid-list--${childCount}` : "";

	if (!children) {
		return null;
	}

	return <div className={`xpmedia-subscription-grid-list ${additionalClass}`}>{children}</div>;
};

GridList.propTypes = {
	children: PropTypes.any,
};

export default GridList;
