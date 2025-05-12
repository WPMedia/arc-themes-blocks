import PropTypes from "prop-types";
import additionalSVGProps from "./icons/Helpers";

import * as Icons from "./icons";

const COMPONENT_CLASS_NAME = "c-icon";

const Icon = ({
	className,
	context,
	description,
	fill,
	height,
	name,
	title,
	width,
	viewBox,
	...rest
}) => {
	const IconName = Icons[name];

	return (
		<svg
			{...rest}
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
			width={width}
			height={height}
			xmlns="http://www.w3.org/2000/svg"
			viewBox={viewBox || "0 0 512 512"}
			fill={fill}
			{...additionalSVGProps(context)}
		>
			{context === "image" ? (
				<>
					<title>{title}</title>
					{description ? <desc>{description}</desc> : null}
				</>
			) : null}
			<IconName />
		</svg>
	);
};

Icon.defaultProps = {
	context: "presentational",
	fill: "currentColor",
	height: 48,
	width: 48,
};

Icon.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** Context control how an Icon is to be rendered. By default icons are
	 * "presentational" meaning they are removed from the accessibility tree.
	 * If an icon should be treated as an image set the context to be "image"
	 * and ensure at minimum a title is also provided
	 */
	context: PropTypes.oneOf(["presentational", "image"]),
	/** Additional text that can be used when using the image context to
	 * proivde a description to the icon
	 */
	description: PropTypes.string,
	/** By passing in a color value the icon would be filled in with the color value */
	fill: PropTypes.string,
	/** Control the heigt of the Icon output */
	height: PropTypes.number,
	/** Name of the Icon to render */
	name: PropTypes.oneOf([
		"Amex",
		"Apple",
		"ApplePay",
		"ArrowLeft",
		"ArrowRight",
		"Backward",
		"Bell",
		"Calendar",
		"Camera",
		"Chart",
		"Check",
		"ChevronDown",
		"ChevronLeft",
		"ChevronRight",
		"ChevronUp",
		"Close",
		"ClosedCaptioning",
		"Cog",
		"Comments",
		"Delete",
		"Diners",
		"Discover",
		"Download",
		"Edit",
		"EllipsisHorizontal",
		"EllipsisVertical",
		"Envelope",
		"EnvelopeOpen",
		"ExternalLink",
		"Facebook",
		"FacebookAlt",
		"Filter",
		"Forward",
		"Fullscreen",
		"Gift",
		"Google",
		"GoogleColor",
		"GooglePay",
		"Grid",
		"GripVertical",
		"HamburgerMenu",
		"Headphones",
		"Home",
		"Instagram",
		"Jcb",
		"Link",
		"LinkedIn",
		"LinkedInAlt",
		"Mastercard",
		"Lock",
		"Medium",
		"Next",
		"Page",
		"Pause",
		"PauseCircle",
		"PayPal",
		"Phone",
		"Pinterest",
		"PinterestAlt",
		"Play",
		"PlayCircle",
		"Previous",
		"Print",
		"Reddit",
		"Rss",
		"Search",
		"Share",
		"Snapchat",
		"SoundCloud",
		"SoundOff",
		"SoundOn",
		"Star",
		"StarHalf",
		"TikTok",
		"TikTokColor",
		"Tumblr",
		"Twitch",
		"Twitter",
		"TwitterAlt",
		"Unionpay",
		"User",
		"Visa",
		"WhatsApp",
		"Youtube",
		"YoutubeAlt",
		"ZoomIn",
		"ZoomOut",
	]).isRequired,
	/** An accessible label for the icon, used with the "context" property
	 */
	title: PropTypes.string,
	/** Control the width of the Icon output */
	width: PropTypes.number,
};

export default Icon;
