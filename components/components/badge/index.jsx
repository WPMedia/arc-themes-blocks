import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-badge";

const Badge = ({ children, className, variant, ...rest }) => (
	<span
		{...rest}
		className={[COMPONENT_CLASS_NAME, variant && `${COMPONENT_CLASS_NAME}--${variant}`, className]
			.filter((i) => i)
			.join(" ")}
	>
		{children}
	</span>
);

Badge.defaultProps = {
	variant: "default",
};

Badge.propTypes = {
	/** Class name(s) that get appended to default class name of the component. */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component. */
	children: PropTypes.node.isRequired,
	/** Variant style of button that matches styling of the theme in use. */
	variant: PropTypes.oneOf(["default", "light", "primary", "danger", "warning", "success"]),
};

export default Badge;
