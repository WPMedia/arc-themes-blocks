/* eslint-disable react/button-has-type */
/*
	Disabled ESLint rule as the type attribute is using oneOf propType with a default
	value - which ESLint is unable to parse as acceptable when in the use case below
	is valid as there is a default and the use of oneOf PropType validation
*/
import { Children, forwardRef } from "react";
import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-button";

const Button = forwardRef((props, ref) => {
	const {
		accessibilityLabel,
		assistiveHidden,
		children,
		className,
		disabled,
		fullWidth,
		href,
		iconLeft,
		iconRight,
		size,
		type,
		variant,
		...rest
	} = props;

	const defaultProps = {
		...rest,
		ref,
		"aria-label": accessibilityLabel,
		"aria-hidden": assistiveHidden ? "true" : undefined,
		tabIndex: assistiveHidden ? "-1" : undefined,
		className: [
			COMPONENT_CLASS_NAME,
			href && `${COMPONENT_CLASS_NAME}--link`,
			fullWidth && `${COMPONENT_CLASS_NAME}--full-width`,
			size && `${COMPONENT_CLASS_NAME}--${size}`,
			variant && `${COMPONENT_CLASS_NAME}--${variant}`,
			className,
		]
			.filter((i) => i)
			.join(" "),
	};

	const buttonContents = (
		<>
			{iconLeft}
			{Children.count(children) ? <span>{children}</span> : null}
			{iconRight}
		</>
	);

	if (href) {
		return (
			<a {...defaultProps} href={href}>
				{buttonContents}
			</a>
		);
	}
	return (
		<button {...defaultProps} type={type} aria-disabled={disabled}>
			{buttonContents}
		</button>
	);
});

Button.defaultProps = {
	fullWidth: false,
	size: "medium",
	type: "button",
	variant: "default",
};

Button.propTypes = {
	/** Provide an accessible name to the button - use only when the button itself does not have meaningful text content */
	accessibilityLabel: PropTypes.string,
	/** Remove the button from the accessibility tree with aria-hidden, tabindex=-1 */
	assistiveHidden: PropTypes.bool,
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node,
	/** Disable the button */
	disabled: PropTypes.bool,
	/** Flag to indicate a button should be full width of it's parent container */
	fullWidth: PropTypes.bool,
	/** A button with a href will be rendered as an `a` link */
	href: PropTypes.string,
	/** Icon to be placed on the left side */
	iconLeft: PropTypes.node,
	/** Icon to be placed on the right side */
	iconRight: PropTypes.node,
	/** Ability to have three different size buttons, allowing control via styles */
	size: PropTypes.oneOf(["small", "medium", "large"]),
	/** Variant style of button that matches with the styling set up within your theme */
	variant: PropTypes.oneOf([
		"primary",
		"primary-reverse",
		"secondary",
		"secondary-reverse",
		"default",
	]),
	/** Button type, used to change the behavior of a button */
	type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
