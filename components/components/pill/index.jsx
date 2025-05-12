import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-pill";

const Pill = ({ children, className, href, ...rest }) =>
	href ? (
		<a
			{...rest}
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
			href={href}
		>
			{children}
		</a>
	) : (
		<span
			{...rest}
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
		>
			{children}
		</span>
	);

Pill.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
	/** The destination of the link */
	href: PropTypes.string,
};

export default Pill;
