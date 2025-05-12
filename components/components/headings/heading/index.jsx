import PropTypes from "prop-types";
import LevelContext from "../context";

const COMPONENT_CLASS_NAME = "c-heading";

const Heading = ({ className, children, truncationLines, ...rest }) => (
	<LevelContext.Consumer>
		{(level) => {
			// max heading level is 6
			const HeadingTag = `h${Math.min(level, 6)}`;

			return (
				<HeadingTag
					{...rest}
					style={{ "--heading-truncation": truncationLines > 0 ? truncationLines : null }}
					className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
				>
					{children}
				</HeadingTag>
			);
		}}
	</LevelContext.Consumer>
);

Heading.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
	/** Number of lines to show before being truncated and augmented with ellipses.
	 	Default value is `0` and results in no truncation of content.
	 */
	truncationLines: PropTypes.number,
};

export default Heading;
