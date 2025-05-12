import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-media-item";

const MediaItem = ({ caption, children, className, credit, title, ...rest }) => (
	<figure
		{...rest}
		className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
	>
		{children}
		{title || caption || credit ? (
			<figcaption className={`${COMPONENT_CLASS_NAME}__fig-caption`}>
				{title ? (
					<span
						dangerouslySetInnerHTML={{ __html: `${title} ` }}
						className={`${COMPONENT_CLASS_NAME}__title`}
					/>
				) : null}
				{caption ? (
					<span
						dangerouslySetInnerHTML={{ __html: `${caption} ` }}
						className={`${COMPONENT_CLASS_NAME}__caption`}
					/>
				) : null}
				{credit ? (
					<span
						dangerouslySetInnerHTML={{ __html: `${credit} ` }}
						className={`${COMPONENT_CLASS_NAME}__credit`}
					/>
				) : null}
			</figcaption>
		) : null}
	</figure>
);

MediaItem.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** Title is the first area in the component, if present */
	title: PropTypes.node,
	/** Caption is the second area in the component, if present */
	caption: PropTypes.node,
	/** Credit is the third area in the component, if present */
	credit: PropTypes.node,
	/** The image, video, audio component or any node that will be displayed within the component */
	children: PropTypes.node,
};

export default MediaItem;
