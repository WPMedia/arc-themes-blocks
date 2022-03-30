/* eslint-disable no-param-reassign, camelcase */
import getProperties from "fusion:properties";
import { resizerKey as RESIZER_SECRET_KEY } from "fusion:environment";
import { focalPointFromPromo } from "./resolveFocalPoint";

export { default as ratiosFor } from "./ratiosFor";
export { default as imageRatioCustomField } from "./imageRatioCustomField";
export { default as extractImageFromStory } from "./extractImageFromStory";

/**
 * generate the filter for focal point
 *
 * give a focal point X and Y, will expand it to a block of 5x5
 * and return the thumbor focal filter contruct.
 *
 * docs: https://thumbor.readthedocs.io/en/latest/focal.html
 */
const focalPointFilter = (focalPoint) => {
	const { x, y } = focalPoint;
	const rect = [x - 5, y - 5, x + 5, y + 5];
	return `focal(${rect[0]}x${rect[1]}:${rect[2]}x${rect[3]})`;
};

const getResizerParam = (
	originalUrl,
	breakpoint,
	format,
	filterQuality = 70,
	respectAspectRatio = false,
	resizerURL,
	focalPoint
) => {
	if (typeof window === "undefined") {
		const Thumbor = require("thumbor-lite");
		// this is height and width of the target image
		const { height, width } = breakpoint;

		if (!height && !width) throw new Error("Height and Width required");
		const thumbor = new Thumbor(RESIZER_SECRET_KEY, resizerURL);

		let thumborParam = "";
		if (respectAspectRatio) {
			// https://thumbor.readthedocs.io/en/latest/filling.html?highlight=fill#filling
			// fitIn will respect the aspect ratio of the photo and fit it into dsipaly
			// fitin https://thumbor.readthedocs.io/en/latest/usage.html?highlight=fit#fit-in
			thumborParam = thumbor
				.setImagePath(originalUrl.replace(/(^\w+:|^)\/\//, ""))
				/* have to keep png for transparency effect */
				.filter(`quality(${filterQuality})`)
				.filter("fill(white)")
				/* todo: enable background color in angler fish resizer api */
				.filter("background_color(white)");

			if (focalPoint) {
				thumborParam = thumborParam.filter(focalPointFilter(focalPoint));
			}

			thumborParam = thumborParam.fitIn(width, height).buildUrl();
			const urlSuffix = originalUrl.replace("https://", "").replace("http://", "");

			return thumborParam.replace(resizerURL, "").replace(urlSuffix, "");
		}

		const formatFileType = originalUrl.endsWith(".png") ? "png" : format;

		thumborParam = thumbor
			.setImagePath(originalUrl.replace(/(^\w+:|^)\/\//, ""))
			.filter(`format(${formatFileType})`)
			.filter(`quality(${filterQuality})`);

		if (focalPoint) {
			thumborParam = thumborParam.filter(focalPointFilter(focalPoint));
		}
		thumborParam = thumborParam.resize(width, height).buildUrl();

		// supports http and https
		const urlSuffix = originalUrl.replace("https://", "").replace("http://", "");

		const breakpointName = `${width}x${height}`;
		return thumborParam
			.replace(resizerURL, "")
			.replace(urlSuffix, "")
			.replace(`/${breakpointName}/`, "");
	}
	return undefined;
};

const getImageDimensionsForAspectRatios = (onlyImageWidths = []) => {
	// consider adding window.devicePixelRatio for * scale
	const siteProperties = getProperties();
	const { aspectRatios, imageWidths } = siteProperties;
	const imageDimensionsToGenerate = onlyImageWidths.length ? onlyImageWidths : imageWidths;
	return aspectRatios.reduce((availableDimensions, aspectRatio) => {
		const aspectRatioDimensions = aspectRatio.split(":");
		// get width by splitting the 400x400 string
		const widthDivisor = aspectRatioDimensions[0];
		const heightDivisor = aspectRatioDimensions[1];
		return availableDimensions.concat(
			imageDimensionsToGenerate.map((width) => {
				const scaledHeight = Math.round((width / widthDivisor) * heightDivisor);
				const dimension = `${width}x${scaledHeight}`;
				return dimension;
			})
		);
	}, []);
};

// input: original url
// if only [420] (int) and ['1:1'], aspect ratio
// output: array of strings for ['420x420']
export const getResizerParams = (
	originalUrl,
	respectAspectRatio = false,
	resizerURL,
	onlyImageWidths = [],
	focalPoint,
	compressedParams
) => {
	const output = {};
	if (!originalUrl) {
		return undefined;
	}
	const getParamsByFormat = (format, previousOutput) => {
		// where we get image widths
		const imageDimensionsAspectRatios = getImageDimensionsForAspectRatios(onlyImageWidths);
		imageDimensionsAspectRatios.forEach((aspectRatioValue) => {
			const dimensions = aspectRatioValue;
			const [aspectRatioWidth, aspectRatioHeight] = dimensions.split("x");

			previousOutput[aspectRatioValue] = getResizerParam(
				originalUrl,
				{
					width: aspectRatioWidth,
					height: aspectRatioHeight,
				},
				format,
				70,
				respectAspectRatio,
				resizerURL,
				focalPoint
			);
		});
		return previousOutput;
	};
	// todo: use webp for next gen images spike
	// getParamsByFormat('webp', output);
	getParamsByFormat("jpg", output);
	/*  Going to clean the data by stripping off leading slash
  and compressing format and quality notation
  Since this code is only supporting jpg and filterQuality of 70,
  we will just assume as much for now.
  also going to add a param (cm=t), letting src/components/Image/thumbor-image-url.ts in engine-sdk
  know that this url has been compressed.
  */
	Object.keys(output).forEach((key) => {
		if (output[key]) {
			output[key] = output[key].replace(/\//, "");

			if (compressedParams) {
				output[key] = output[key].replace(":format(jpg):quality(70)", ":cm=t");
			}
		}
	});
	return output;
};

const resizeImage = (image, resizerURL, focalPoint, compressedParams) => {
	if ((image.type && image.type !== "image") || !image.url) {
		throw new Error("Not a valid image object");
	}

	// todo: support fitIn respect aspect logic
	return getResizerParams(image.url, false, resizerURL, [], focalPoint, compressedParams);
};

const resizePromoItems = (promoItems, resizerURL, compressedParams) => {
	const focalPoint = focalPointFromPromo(promoItems);
	return Object.keys(promoItems).reduce((promoItemWithResizedImages, key) => {
		const promoItem = promoItems[key];
		if ((key === "type" && promoItem === "image" && promoItems.url) || key === "url") {
			promoItemWithResizedImages.resized_params = resizeImage(
				promoItems,
				resizerURL,
				focalPoint,
				compressedParams
			);
			promoItemWithResizedImages.url = promoItems.url;
			promoItemWithResizedImages.type = "image";
		} else {
			promoItemWithResizedImages[key] = promoItem;
		}
		return promoItemWithResizedImages;
	}, {});
};

const resizeAuthorCredits = (authorCredits, resizerURL, compressedParams) =>
	authorCredits.map((creditObject) => ({
		...creditObject,
		resized_params: creditObject?.image?.url
			? getResizerParams(creditObject.image.url, false, resizerURL, [], undefined, compressedParams)
			: {},
	}));

const getResizedImageParams = (data, options) => {
	if (!options.resizerSecret || !options.resizerURL) {
		throw new Error("Not a valid image object");
	}

	const generateParams = (sourceData, resizerURL, onlyImageWidths = []) => {
		if (sourceData && sourceData.content_elements) {
			sourceData.content_elements = sourceData.content_elements.map((contentElement) => {
				if (contentElement.type === "image") {
					const focalPoint = focalPointFromPromo(contentElement);
					contentElement.resized_params = getResizerParams(
						contentElement.url,
						false,
						resizerURL,
						onlyImageWidths,
						focalPoint,
						options?.compressedParams
					);
				}
				// recursively resize if gallery with speicifc resized sizes
				if (contentElement.type === "gallery") {
					const galleryImageWidths = [400, 600, 800, 1600];
					return generateParams(contentElement, resizerURL, galleryImageWidths);
				}
				// recursively resize if story or video
				if (contentElement.type === "story" || contentElement.type === "video") {
					return generateParams(contentElement, resizerURL);
				}

				return contentElement;
			});
		}
		if (sourceData && sourceData.promo_items && sourceData.promo_items.basic) {
			sourceData.promo_items.basic = resizePromoItems(
				sourceData.promo_items.basic,
				resizerURL,
				options?.compressedParams
			);
		}

		if (sourceData && sourceData.promo_items && sourceData.promo_items.lead_art) {
			sourceData.promo_items.lead_art = resizePromoItems(
				sourceData.promo_items.lead_art,
				resizerURL,
				options?.compressedParams
			);
		}

		if (sourceData?.promo_items?.lead_art?.content_elements) {
			// recursive if I find content elements
			// find content elements
			generateParams(sourceData.promo_items.lead_art, resizerURL);
		}

		if (sourceData?.promo_items?.lead_art?.promo_items?.basic) {
			sourceData.promo_items.lead_art.promo_items.basic.resized_params = getResizerParams(
				sourceData.promo_items.lead_art.promo_items.basic.url,
				false,
				resizerURL,
				[],
				focalPointFromPromo(sourceData.promo_items.lead_art.promo_items.basic),
				options?.compressedParams
			);
		}

		// checking if by is array with a length
		if (sourceData && sourceData.credits && sourceData.credits.by && sourceData.credits.by.length) {
			sourceData.credits.by = resizeAuthorCredits(
				sourceData.credits.by,
				resizerURL,
				options?.compressedParams
			);
		}
		return sourceData;
	};

	if (data && data.count > 0) {
		data.content_elements.forEach((element) =>
			generateParams(element, options.resizerURL, options.imageWidths)
		);
	} else if (data && data.length && data.length > 0) {
		// to test, like for search-api, that will have array of content elements
		data.forEach((dataElement) =>
			generateParams(dataElement, options.resizerURL, options.imageWidths)
		);
	} else {
		generateParams(data, options.resizerURL);
	}

	return data;
};

export const extractResizedParams = (storyObject) =>
	storyObject?.promo_items?.basic?.resized_params ||
	storyObject?.promo_items?.lead_art?.promo_items?.basic?.resized_params ||
	[];

// top level for transforming data
// takes in content source story data via ans
// see mock data for example
// optional filter quality for reducing quality of pics
// exporting for test while we figure out a helper fix
/**
 * @param respectAspectRatio if true, then will use fitIn rather than resize via thumbor
 */
const getResizedImageData = (
	data,
	// underscore added to mean it is unused
	_filterQuality,
	onlyUrl = false,
	respectAspectRatio = false,
	arcSite,
	imageWidths = getProperties(arcSite).imageWidths
) => {
	// resizer url is only arcSite specific option
	const { aspectRatios, resizerURL, shouldCompressImageParams = false } = getProperties(arcSite);

	const resizerKey = RESIZER_SECRET_KEY;

	// ensure that necessary env variables available
	if (
		typeof resizerKey === "undefined" ||
		typeof resizerURL === "undefined" ||
		typeof imageWidths === "undefined" ||
		typeof aspectRatios === "undefined"
	) {
		return data;
	}

	if (onlyUrl) {
		return !data
			? null
			: getResizerParams(
					data,
					respectAspectRatio,
					resizerURL,
					[],
					undefined,
					shouldCompressImageParams
			  );
	}

	return getResizedImageParams(data, {
		resizerSecret: resizerKey,
		resizerURL,
		imageWidths,
		compressedParams: shouldCompressImageParams,
		// filterQuality should be moved to the options object and other functions to make use of option
	});
};

export default getResizedImageData;
