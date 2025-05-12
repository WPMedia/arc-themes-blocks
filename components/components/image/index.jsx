import PropTypes from "prop-types";
import { useFusionContext } from "fusion:context";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import getProperties from "fusion:properties";
import formatSrc from "../../utils/format-image-resizer-src";
import imageANSToImageSrc from "../../utils/image-ans-to-image-src";
import calculateWidthAndHeight from "./calculate-width-height";

const COMPONENT_CLASS_NAME = "c-image";

const Image = ({
	alt,
	ansImage,
	aspectRatio,
	className,
	loading,
	src,
	resizedOptions,
	resizerURL,
	responsiveImages,
	width,
	height,
	sizes,
	...rest
}) => {
	const auth = ansImage ? ansImage.auth[RESIZER_TOKEN_VERSION] : resizedOptions?.auth;
	const formattedSrc = ansImage ? imageANSToImageSrc(ansImage) : src;
	const { arcSite } = useFusionContext();
	const { resizerURL: defaultResizerURL } = getProperties(arcSite);
	const resizerURLToUse = resizerURL || defaultResizerURL;
	const componentClassNames = className
		? `${COMPONENT_CLASS_NAME} ${className}`
		: COMPONENT_CLASS_NAME;
	if (!auth) {
		// eslint-disable-next-line no-console
		console.error("No auth token provided for resizer");

		return (
			<img alt={alt} className={componentClassNames} src={src} width={width} height={height} />
		);
	}

	const imageWidthAndHeight = calculateWidthAndHeight({ aspectRatio, width, height, ansImage });
	const imageAspectRatio = imageWidthAndHeight.width / imageWidthAndHeight.height;

	const defaultSrc = formatSrc(
		resizerURLToUse.concat(formattedSrc),
		{ ...resizedOptions, auth },
		imageWidthAndHeight.width,
		imageWidthAndHeight.height,
	);

	const responsiveSrcSet =
		responsiveImages
			.filter(
				(responsiveImageWidth) =>
					Number.isInteger(responsiveImageWidth) && responsiveImageWidth > 0,
			)
			.map((responsiveImageWidth) =>
				formatSrc(
					resizerURLToUse.concat(formattedSrc),
					{ ...resizedOptions, auth },
					responsiveImageWidth,
					imageAspectRatio !== 0 ? responsiveImageWidth / imageAspectRatio : undefined,
				).concat(` ${responsiveImageWidth}w`),
			)
			.join(", ") || null;

	const responsiveSizes =
		sizes && sizes.length
			? sizes
					.filter(({ isDefault }) => !isDefault)
					.map(({ mediaCondition, sourceSizeValue }) => `${mediaCondition} ${sourceSizeValue}`)
					.concat(
						sizes.find((currentSizeObject) => currentSizeObject.isDefault)?.sourceSizeValue || [],
					)
					.join(", ")
			: null;

	console.log(`Formatted Source: ${JSON.stringify(formattedSrc, null, 2)}`);
	console.log(`Responsive Sizes: ${JSON.stringify(responsiveSizes, null, 2)}`);
	console.log(`Responsive Source Set: ${JSON.stringify(responsiveSrcSet, null, 2)}`);

	return (
		<img
			{...rest}
			data-chromatic="ignore"
			alt={alt}
			className={componentClassNames}
			loading={loading}
			src={defaultSrc}
			srcSet={responsiveSrcSet}
			sizes={responsiveSizes}
			{...imageWidthAndHeight}
		/>
	);
};

Image.defaultProps = {
	alt: "",
	loading: "lazy",
	resizedOptions: {},
	responsiveImages: [],
	sizes: [],
};

Image.propTypes = {
	/** Alt text for the image - if not set the image will be treated as decorative */
	alt: PropTypes.string,
	/** ANS Image object that has at minimum, _id, url and auth object to allow the component to handle building the img src attribute */
	ansImage: PropTypes.shape({
		_id: PropTypes.string,
		url: PropTypes.string,
		auth: PropTypes.object,
	}),
	/** The aspect ratio in which to display the image */
	aspectRatio: PropTypes.string,
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The intrinsic height of the image in pixels */
	height: PropTypes.number,
	/** Indication of how the browser should load the image, using the native loading attribute of an <img /> tag */
	loading: PropTypes.oneOf(["lazy", "eager"]),
	/** Options to pass into v2 resizer */
	resizedOptions: PropTypes.object,
	/** The URL of the resizer service. Should have a trailing slash */
	resizerURL: PropTypes.string,
	/** Array of widths to use as sizes for the image */
	responsiveImages: PropTypes.arrayOf(PropTypes.number),
	/** The options relating to each of the available srcset options of the image */
	sizes: PropTypes.arrayOf(
		PropTypes.shape({
			/** Whether it's the default last size available */
			isDefault: PropTypes.bool,
			/** The intrinsic width of the image in pixels or responsive units */
			sourceSizeValue: PropTypes.string,
			/** Media condition to render the corresponding source size value */
			mediaCondition: PropTypes.string,
		}),
	),
	/** The intrinsic width of the image in pixels */
	width: PropTypes.number,
	/** The URL to an image to load and display. Should not have a leading slash */
	src: PropTypes.string,
};

export default Image;
