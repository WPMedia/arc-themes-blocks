import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-grid";

const Grid = ({ as, children, className, ...rest }) => {
	const Element = `${as}`;
	return (
		<Element
			{...rest}
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
		>
			{children}
		</Element>
	);
};

Grid.defaultProps = {
	as: "div",
};

Grid.propTypes = {
	/** Specify the HTML Element to use to render as */
	as: PropTypes.string,
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
};

export default Grid;
