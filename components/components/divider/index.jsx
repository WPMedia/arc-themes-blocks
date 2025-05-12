import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-divider";

const Divider = ({ className, assistiveHidden }) => {
	const ariaProp = {};
	if (assistiveHidden) {
		ariaProp["aria-hidden"] = "true";
	}
	return (
		<hr
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
			{...ariaProp}
		/>
	);
};

Divider.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The assistive prop, to remove the divider element from the accessibility API. */
	assistiveHidden: PropTypes.bool,
};

export default Divider;
