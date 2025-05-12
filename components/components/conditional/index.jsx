import PropTypes from "prop-types";

const Conditional = ({ children, component, condition, ...rest }) => {
	const OutputComponent = component;

	return condition ? <OutputComponent {...rest}>{children}</OutputComponent> : children;
};

Conditional.propTypes = {
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
	/** The Component that should be used to render if condition is a truthy value */
	component: PropTypes.func.isRequired,
	/** The condition to use as the truthy value to denote the render logic */
	condition: PropTypes.any,
};

export default Conditional;
