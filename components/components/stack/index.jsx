import React from "react";
import PropTypes from "prop-types";

const Stack = ({
	as,
	className,
	alignment,
	children,
	direction,
	divider,
	inline,
	justification,
	gap,
	wrap,
	...rest
}) => {
	const childCount = React.Children.count(children);
	const Element = `${as}`;
	return (
		<Element
			{...rest}
			className={className ? `c-stack ${className}` : "c-stack"}
			data-style-direction={direction}
			data-style-justification={justification}
			data-style-alignment={alignment}
			data-style-inline={inline}
			data-style-wrap={wrap}
			style={{ "--c-stack-gap": gap }}
		>
			{React.Children.map(children, (child, index) => (
				<>
					{child}
					{divider && index !== childCount - 1 ? <hr aria-hidden="true" /> : null}
				</>
			))}
		</Element>
	);
};

Stack.defaultProps = {
	as: "div",
	className: "",
	alignment: "unset",
	direction: "vertical",
	divider: false,
	inline: false,
	justification: "start",
	wrap: "nowrap",
};

Stack.propTypes = {
	/** Specify the HTML Element to use to render as */
	as: PropTypes.string,
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The alignment of the elements within the component.
	 Relates to CSS Flex's `align-items`
	 Note: When using the divider in a horizontal configuration, alignment should be set to 'unset' */
	alignment: PropTypes.oneOf(["unset", "start", "center", "end"]),
	/** Elements that will be displayed within the component. */
	children: PropTypes.any.isRequired,
	/** The flow of the elements within the component */
	direction: PropTypes.oneOf(["vertical", "horizontal"]),
	/** Display a divider between elements within the component.
	    Note: adding a divider acts as an additional element in the stack
	 	and effectively doubles the gap applied. Dividers are hidden from screen readers.
	 	See alignment property when deciding to use the divider. */
	divider: PropTypes.bool,
	/** The container type. */
	inline: PropTypes.bool,
	/** The justification of the elements within the component.
	    Relates to CSS Flex's `justify-content` */
	justification: PropTypes.oneOf(["start", "center", "end", "space-between"]),
	/** The gap (or gutter) spacing of the elements within the component
	    Example: `'5px'`,  `'1.5rem'`, etc. */
	gap: PropTypes.string,
	/** Wrapping of the elements within the component */
	wrap: PropTypes.oneOf(["nowrap", "wrap", "reverse"]),
};

export default Stack;
