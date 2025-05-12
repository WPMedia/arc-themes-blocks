import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Join = ({ children, separator: Separator }) => {
	const addSeparator = (child, index) => (
		<Fragment key={`separated_key_${index}`}>
			{index > 0 && <Separator />}
			{child}
		</Fragment>
	);
	return React.Children.toArray(children).map(addSeparator);
};
Join.propTypes = {
	/** The children components */
	children: PropTypes.node.isRequired,
	/** The component placed between each of the children components */
	separator: PropTypes.elementType.isRequired,
};

export default Join;
