import PropTypes from "prop-types";
import { Children } from "react";
import Source from "./_children/source";
import Image from "../image";

const COMPONENT_CLASS_NAME = "c-picture";
const Picture = ({ children, className, ...rest }) => (
	<picture
		{...rest}
		className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
	>
		{/* `Image` and `Source` are the only two supported Children of `Picture` */}
		{Children.toArray(children).filter((child) => [Image, Source].includes(child.type))}
	</picture>
);

Picture.Source = Source;
Picture.Image = Image;

Picture.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component - Only Picture.Source and Image children items are allowed */
	children: PropTypes.node.isRequired,
};

export default Picture;
