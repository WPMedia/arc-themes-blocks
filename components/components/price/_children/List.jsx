import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-price__list";

const List = ({ children, className, ...rest }) => (
	<div
		{...rest}
		className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
	>
		{children}
	</div>
);

List.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
};

export default List;
