import { RESIZER_TOKEN_VERSION, ENVIRONMENT } from "fusion:environment";
import getProperties from "fusion:properties";
import { imageANSToImageSrc } from "@wpmedia/arc-themes-components";

const getResizeParamsFromANSImage = (
	ansImageItem,
	arcSite,
	defaultWidth,
	responsiveWidths = []
) => {
	const { resizerURL, resizerURLs } = getProperties(arcSite);
	const resizerURLtoUse = resizerURLs?.[ENVIRONMENT] || resizerURL;
	return {
		height: Math.floor((ansImageItem.height / ansImageItem.width) * defaultWidth),
		resizerURL: resizerURLtoUse,
		resizedOptions: { auth: ansImageItem.auth[RESIZER_TOKEN_VERSION] },
		...(responsiveWidths.length ? { responsiveImages: responsiveWidths } : {}),
		src: imageANSToImageSrc(ansImageItem),
		width: defaultWidth,
	};
};

export default getResizeParamsFromANSImage;
