import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-details";

const Details = ({
	children,
	childrenHTML,
	className,
	icon,
	iconPlacement,
	open,
	summary,
	...rest
}) => {
	const classNames = [COMPONENT_CLASS_NAME, icon && `${COMPONENT_CLASS_NAME}--with-icon`, className]
		.filter((classString) => classString)
		.join(" ");

	const IconOutput = <span className={`${COMPONENT_CLASS_NAME}__summary-icon`}>{icon}</span>;
	return (
		<details {...rest} className={classNames} open={open}>
			<summary>
				{iconPlacement === "left" && IconOutput}
				<span className={`${COMPONENT_CLASS_NAME}__summary-text`}>{summary}</span>
				{iconPlacement === "right" && IconOutput}
			</summary>
			{childrenHTML ? (
				<div
					className={`${COMPONENT_CLASS_NAME}__content`}
					dangerouslySetInnerHTML={{ __html: children }}
				/>
			) : (
				children
			)}
		</details>
	);
};

Details.defaultProps = {
	childrenHTML: false,
	iconPlacement: "right",
	open: false,
};

Details.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node,
	/** Flag to denote if the children should be rendered as HTML using dangerouslySetInnerHTML */
	childrenHTML: PropTypes.bool,
	/** Icon to be used instead of default CSS behaviour for summary */
	icon: PropTypes.node,
	/** Denote the Icon placement in the summary, left or right */
	iconPlacement: PropTypes.oneOf(["left", "right"]),
	/** Flag to indicate whether or not the contents are shown by default */
	open: PropTypes.bool,
	/** The title/summary text */
	summary: PropTypes.string.isRequired,
};

export default Details;
