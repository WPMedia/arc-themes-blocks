import PropTypes from "prop-types";
import formatSrc from "../../../utils/format-image-resizer-src";

const Source = ({ height, media, resizedOptions, resizerURL, src, width, ...rest }) => {
	if (media && src) {
		return (
			<source
				{...rest}
				height={height}
				media={media}
				srcSet={
					resizedOptions?.auth && resizerURL
						? formatSrc(resizerURL.concat(src), resizedOptions, width, height)
						: src
				}
				width={width}
			/>
		);
	}
	return null;
};

Source.defaultProps = {
	resizedOptions: {},
	resizerURL: "",
};

Source.propTypes = {
	/** The intrinsic height of the image in pixels */
	height: PropTypes.number,
	/** Media query used for the tag's `media` attribute */
	media: PropTypes.string.isRequired,
	/** Options to pass into v2 resizer. */
	resizedOptions: PropTypes.object,
	/** The URL of the resizer service. Should have a trailing slash */
	resizerURL: PropTypes.string,
	/** The URL to an image to load and display. Should not have a leading slash */
	src: PropTypes.string.isRequired,
	/** The intrinsic width of the image in pixels */
	width: PropTypes.number,
};

export default Source;
